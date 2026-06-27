# YJM BOY Website Handover Guide

## Website Overview

This website is for **YJM BOY PHONE REPAIR AND ACCESSORIES**, located at **No. 2 Market Road, Biu, Borno State, Nigeria**.

It includes a public business website, product catalog, WhatsApp ordering links, customer enquiry form, and a protected admin area for managing products and enquiries.

## Public Pages

- `/` - Homepage
- `/phone-repair` - Phone repair services
- `/accessories` - Phone accessories catalog
- `/repair-tools` - Repair tools catalog
- `/spare-parts` - Spare parts catalog
- `/products/[id]` - Product detail page
- `/about` - Business information
- `/contact` - Address, phone numbers, WhatsApp, and enquiry form

## Admin Pages

- `/admin/login` - Admin login
- `/admin/dashboard` - Product and enquiry overview
- `/admin/products` - Product management
- `/admin/products/new` - Add product
- `/admin/products/[id]/edit` - Edit product
- `/admin/enquiries` - Customer enquiry management
- `/admin/analytics` - Basic business summaries

## How To Login As Admin

1. Go to `/admin/login`.
2. Enter the admin email and password created in Supabase Auth.
3. After login, you will be redirected to `/admin/dashboard`.

## How To Add Product

1. Login to admin.
2. Go to `/admin/products`.
3. Click `Add Product`.
4. Fill in product name, category, price, stock quantity, description, image, and availability.
5. Click `Create Product`.

## How To Edit Product

1. Go to `/admin/products`.
2. Find the product.
3. Click `Edit`.
4. Update the details.
5. Click `Save Product`.

## How To Upload Product Image

1. Open the add or edit product form.
2. Choose a JPG, PNG, or WEBP image.
3. Make sure the file is 2MB or smaller.
4. Preview the image in the form.
5. Save the product.

## How To Update Stock

1. Go to `/admin/products`.
2. Find the product.
3. Use the plus button to increase stock by 1.
4. Use the minus button to decrease stock by 1.
5. Stock cannot go below 0.

## How To Hide Or Unhide Product

1. Go to `/admin/products`.
2. Find the product.
3. Click `Hide` to remove it from the public catalog.
4. Click `Show` to make it visible again.

## How To Check Enquiries

1. Go to `/admin/enquiries`.
2. Use search to find enquiries by customer name, phone number, or message.
3. Filter by `new`, `contacted`, or `closed`.
4. Sort by newest or oldest first.

## How To Reply Through WhatsApp

1. Go to `/admin/enquiries`.
2. Find the customer enquiry.
3. Click `Open WhatsApp`.
4. WhatsApp opens with a prepared reply message.
5. Send or edit the message before sending.

## How To Deploy Updates To Vercel

1. Make code changes locally.
2. Run:

```bash
npm run build
```

3. Commit and push changes to GitHub.
4. Vercel will automatically deploy the latest pushed version.
5. Check the live website after deployment.

## Common Troubleshooting

### Admin Login Fails

- Confirm the admin user exists in Supabase Auth.
- Confirm the email and password are correct.
- Confirm Vercel has the correct Supabase environment variables.

### Products Do Not Show Publicly

- Confirm the product is marked available.
- Confirm stock and category are correct.
- Confirm Supabase database policies are applied.

### Product Image Upload Fails

- Confirm the `product-images` bucket exists.
- Confirm the file is JPG, PNG, or WEBP.
- Confirm the image is 2MB or smaller.
- Confirm storage policies allow authenticated uploads.

### Contact Form Does Not Submit

- Confirm the `enquiries` table exists.
- Confirm RLS policies allow public enquiry inserts.
- Check Supabase project status and environment variables.

### Build Fails

- Run `npm install`.
- Check `.env.local` contains Supabase URL and anon key.
- Run `npm run build` again and read the error message.
