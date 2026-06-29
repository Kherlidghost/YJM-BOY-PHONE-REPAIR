import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CatalogProduct = {
  id: string;
  name: string;
  price: number | string;
  stock_quantity: number;
  description: string | null;
  image_url: string | null;
};

const csvColumns = [
  "id",
  "title",
  "description",
  "availability",
  "condition",
  "price",
  "link",
  "image_link",
  "brand",
];

export const dynamic = "force-dynamic";

function csvValue(value: string | number) {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function formatCatalogPrice(value: number | string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "NGN 0";
  }

  return `NGN ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    useGrouping: false,
  }).format(amount)}`;
}

function getProductLink(request: NextRequest, productId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : request.nextUrl.origin;

  return new URL(`/products/${productId}`, baseUrl).toString();
}

function buildCatalogCsv(products: CatalogProduct[], request: NextRequest) {
  const rows = products.map((product) => [
    product.id,
    product.name,
    product.description?.trim() || product.name,
    product.stock_quantity > 0 ? "in stock" : "out of stock",
    "new",
    formatCatalogPrice(product.price),
    getProductLink(request, product.id),
    product.image_url ?? "",
    "YJM BOY",
  ]);

  return [csvColumns, ...rows].map((row) => row.map(csvValue).join(",")).join("\n");
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("id,name,price,stock_quantity,description,image_url")
      .eq("is_available", true)
      .not("image_url", "is", null)
      .gt("price", 0)
      .order("created_at", { ascending: false })
      .returns<CatalogProduct[]>();

    if (error) {
      return NextResponse.json(
        { error: "Unable to generate Meta catalog feed.", detail: error.message },
        { status: 502 },
      );
    }

    const csv = buildCatalogCsv(data ?? [], request);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Content-Disposition": 'inline; filename="yjm-boy-meta-catalog.csv"',
        "Content-Type": "text/csv; charset=utf-8",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to generate Meta catalog feed.",
        detail: error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}
