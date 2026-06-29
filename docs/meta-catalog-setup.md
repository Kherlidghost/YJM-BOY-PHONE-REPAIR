# Meta Product Catalog Setup

YJM BOY can use the public product feed for Facebook and Instagram catalog ads.
This does not add checkout, online payment, or repair management. It only gives
Meta a product list for ads.

## Feed URL

Use this feed URL after deployment:

```text
https://YOUR_DOMAIN/api/meta/catalog-feed
```

Replace `YOUR_DOMAIN` with the live website domain.

The feed includes only products that are available, have an image, and have a
price greater than zero.

## Product Requirements

- Product images should be clear square images, preferably 1080x1080.
- Product names and prices must be accurate.
- Each product should have a real product image URL.
- Products without images or prices are excluded from the feed.

## Open Meta Commerce Manager

1. Go to `https://business.facebook.com/commerce_manager`.
2. Log in with the Facebook account that manages the YJM BOY business assets.
3. Select the correct Meta Business portfolio if prompted.

## Create A Catalog

1. In Commerce Manager, choose **Add catalog** or **Create catalog**.
2. Select **Ecommerce** as the catalog type.
3. Choose the business account that owns the Facebook Page and Instagram account.
4. Name the catalog, for example `YJM BOY Product Catalog`.
5. Create the catalog.

## Add The Data Feed

1. Open the new catalog in Commerce Manager.
2. Go to **Data sources**.
3. Choose **Data feed**.
4. Select the option to use a URL or scheduled feed.
5. Enter:

```text
https://YOUR_DOMAIN/api/meta/catalog-feed
```

6. Set the file type to CSV if Meta asks.
7. Save and upload the feed.

## Schedule Automatic Updates

1. In the catalog data source settings, enable scheduled updates.
2. Choose a daily schedule so Meta refreshes products, prices, images, and stock.
3. Pick a time when the website is usually online and product edits are complete.
4. Save the schedule.

After the first import, review Meta's diagnostics. Fix any rejected products by
updating the product name, price, image, or availability in the website admin.

## Run Ads With The Catalog

1. Open Meta Ads Manager.
2. Create a campaign that supports catalog products, such as sales or catalog
   sales depending on the available Meta campaign options.
3. Select the YJM BOY catalog.
4. Choose the product set or use all eligible products.
5. Build the ad creative using catalog product fields.
6. Choose placements for Facebook and Instagram.
7. Publish the campaign after reviewing product previews.

Customers who click product ads should land on the product detail page on the
YJM BOY website. They can then contact the business through the existing website
contact and WhatsApp flows.
