# Product Images Storage

Create a Supabase Storage bucket named `product-images`.

Recommended setup:

- Bucket name: `product-images`
- Visibility: public
- Purpose: product images for accessories, repair tools, and spare parts
- Public read: allowed, so product images can load on the website
- Admin uploads only: authenticated admin users should upload, update, and delete files

Suggested Storage policies:

- Allow public `select` on objects in the `product-images` bucket.
- Allow authenticated users to `insert`, `update`, and `delete` objects in the `product-images` bucket.

Keep product image URLs in the `products.image_url` column.
