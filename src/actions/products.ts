"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadProductImage } from "@/lib/supabase/upload";
import { productSchema } from "@/lib/validations/product";

export type ProductActionState = {
  ok: boolean;
  message: string;
};

const productPaths = ["/admin/dashboard", "/admin/products"];

function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    stock_quantity: formData.get("stock_quantity"),
    description: formData.get("description"),
    image_url: formData.get("image_url"),
    is_available: formData.get("is_available") === "on",
  });
}

function getImageFile(formData: FormData) {
  const image = formData.get("product_image");

  if (!(image instanceof File) || image.size === 0) {
    return null;
  }

  return image;
}

function getFirstValidationMessage(result: ReturnType<typeof parseProductForm>) {
  if (result.success) {
    return "";
  }

  return result.error.issues[0]?.message ?? "Check the product details and try again.";
}

function normalizeProductPayload(data: ReturnType<typeof productSchema.parse>) {
  return {
    ...data,
    description: data.description?.trim() || null,
    image_url: data.image_url?.trim() || null,
  };
}

function revalidateProductPages(id?: string) {
  productPaths.forEach((path) => revalidatePath(path));
  revalidatePath("/admin/analytics");
  revalidatePath("/accessories");
  revalidatePath("/repair-tools");
  revalidatePath("/spare-parts");

  if (id) {
    revalidatePath(`/admin/products/${id}/edit`);
    revalidatePath(`/products/${id}`);
  }
}

export async function createProduct(
  _previousState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const imageFile = getImageFile(formData);
  let imageUrl = "";

  if (imageFile) {
    try {
      imageUrl = await uploadProductImage(imageFile);
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Image upload failed.",
      };
    }
  }

  formData.set("image_url", imageUrl);
  const result = parseProductForm(formData);

  if (!result.success) {
    return {
      ok: false,
      message: getFirstValidationMessage(result),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("products").insert(normalizeProductPayload(result.data));

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  revalidateProductPages();
  redirect("/admin/products?created=1");
}

export async function updateProduct(
  id: string,
  _previousState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const imageFile = getImageFile(formData);
  let imageUrl = String(formData.get("old_image_url") ?? "");

  if (imageFile) {
    try {
      imageUrl = await uploadProductImage(imageFile);
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Image upload failed.",
      };
    }
  }

  formData.set("image_url", imageUrl);
  const result = parseProductForm(formData);

  if (!result.success) {
    return {
      ok: false,
      message: getFirstValidationMessage(result),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .update({
      ...normalizeProductPayload(result.data),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  revalidateProductPages(id);
  redirect("/admin/products?updated=1");
}

export async function deleteProduct(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (!error) {
    revalidateProductPages(id);
  }

  redirect(error ? "/admin/products?error=delete" : "/admin/products?deleted=1");
}

export async function incrementStock(productId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("stock_quantity")
    .eq("id", productId)
    .single<{ stock_quantity: number }>();

  if (fetchError || !product) {
    redirect("/admin/products?error=stock");
  }

  const { error } = await supabase
    .from("products")
    .update({
      stock_quantity: product.stock_quantity + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  revalidateProductPages(productId);
  redirect(error ? "/admin/products?error=stock" : "/admin/products?stock=1");
}

export async function decrementStock(productId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("stock_quantity")
    .eq("id", productId)
    .single<{ stock_quantity: number }>();

  if (fetchError || !product) {
    redirect("/admin/products?error=stock");
  }

  const nextStock = Math.max(0, product.stock_quantity - 1);
  const { error } = await supabase
    .from("products")
    .update({
      stock_quantity: nextStock,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  revalidateProductPages(productId);
  redirect(error ? "/admin/products?error=stock" : "/admin/products?stock=1");
}

export async function toggleProductAvailability(productId: string, isAvailable: boolean) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .update({
      is_available: isAvailable,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  revalidateProductPages(productId);
  redirect(error ? "/admin/products?error=availability" : "/admin/products?availability=1");
}
