import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product, ProductCategory } from "@/lib/products";

export async function getAvailableProductsByCategory(category: ProductCategory) {
  const supabase = await createSupabaseServerClient();

  return supabase
    .from("products")
    .select("id,name,category,price,stock_quantity,description,image_url,is_available,created_at,updated_at")
    .eq("category", category)
    .eq("is_available", true)
    .order("created_at", { ascending: false })
    .returns<Product[]>();
}

export async function getAvailableProductById(id: string) {
  const supabase = await createSupabaseServerClient();

  return supabase
    .from("products")
    .select("id,name,category,price,stock_quantity,description,image_url,is_available,created_at,updated_at")
    .eq("id", id)
    .eq("is_available", true)
    .single<Product>();
}
