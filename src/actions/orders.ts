"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SubmittedCartItem = {
  id: string;
  quantity: number;
};

type OrderProduct = {
  id: string;
  name: string;
  price: number | string;
};

export type CheckoutActionState = {
  ok: boolean;
  message: string;
};

function parseCartItems(value: FormDataEntryValue | null): SubmittedCartItem[] {
  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        id: typeof item.id === "string" ? item.id : "",
        quantity: Number(item.quantity),
      }))
      .filter((item) => item.id && Number.isInteger(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
}

function formatOrderLine(product: OrderProduct, quantity: number) {
  const price = Number(product.price);
  const safePrice = Number.isFinite(price) ? price : 0;
  const lineTotal = safePrice * quantity;

  return `${product.name} (${product.id}) x ${quantity} - NGN ${lineTotal.toLocaleString("en-NG")}`;
}

export async function createCheckoutOrder(
  _previousState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const cartItems = parseCartItems(formData.get("cart_items"));

  if (name.length < 2 || phone.length < 7 || address.length < 5) {
    return {
      ok: false,
      message: "Enter your name, phone number, and delivery address.",
    };
  }

  if (cartItems.length === 0) {
    return {
      ok: false,
      message: "Your cart is empty.",
    };
  }

  const productIds = cartItems.map((item) => item.id);
  const supabase = await createSupabaseServerClient();
  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id,name,price")
    .in("id", productIds)
    .eq("is_available", true)
    .returns<OrderProduct[]>();

  if (productError || !products || products.length !== productIds.length) {
    return {
      ok: false,
      message: productError?.message ?? "One or more cart items are no longer available.",
    };
  }

  const productsById = new Map(products.map((product) => [product.id, product]));
  const total = cartItems.reduce((sum, item) => {
    const product = productsById.get(item.id);
    const price = Number(product?.price ?? 0);
    return sum + (Number.isFinite(price) ? price : 0) * item.quantity;
  }, 0);
  const orderId = crypto.randomUUID();
  const orderLines = cartItems.map((item) => {
    const product = productsById.get(item.id);
    return product ? formatOrderLine(product, item.quantity) : "";
  });
  const message = [
    `Checkout order: ${orderId}`,
    `Delivery address: ${address}`,
    `Order total: NGN ${total.toLocaleString("en-NG")}`,
    "Items:",
    ...orderLines,
    note ? `Customer note: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const { error: orderError } = await supabase.from("enquiries").insert({
    name,
    phone,
    message,
    source: "website_checkout",
    status: "new",
  });

  if (orderError) {
    return {
      ok: false,
      message: orderError.message,
    };
  }

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/analytics");

  const query = new URLSearchParams({
    order: orderId,
    total: String(total),
    ids: productIds.join(","),
  });

  redirect(`/checkout/confirmation?${query.toString()}`);
}
