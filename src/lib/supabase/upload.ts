import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 2 * 1024 * 1024;

export async function uploadProductImage(file: File): Promise<string> {
  if (!allowedImageTypes.includes(file.type)) {
    throw new Error("Upload a JPG, PNG, or WEBP image.");
  }

  if (file.size > maxImageSize) {
    throw new Error("Product image must be 2MB or smaller.");
  }

  const supabase = await createSupabaseServerClient();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filePath = `products/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("product-images").upload(filePath, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return data.publicUrl;
}
