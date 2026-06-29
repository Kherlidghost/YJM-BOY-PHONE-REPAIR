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

The app uploads files to:

```text
product-images/products/<generated-file-name>
```

If uploads fail with `new row violates row-level security policy`, run the latest
`supabase/schema.sql` in the Supabase SQL Editor. The schema includes this
idempotent storage setup:

```sql
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read product images" on storage.objects;
drop policy if exists "Authenticated users can upload product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;

create policy "Public can read product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
);

create policy "Authenticated users can update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
)
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
);

create policy "Authenticated users can delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
);
```
