# Production Test Checklist

Use this checklist before deploying or after deploying the YJM BOY website to production.

## 1. Public Website

- [ ] Home page loads
- [ ] All navbar links work
- [ ] `/accessories` product page loads
- [ ] `/repair-tools` product page loads
- [ ] `/spare-parts` product page loads
- [ ] Product detail page works
- [ ] WhatsApp buttons open the correct number
- [ ] WhatsApp product messages include product name, category, and price
- [ ] Contact form submits enquiry successfully
- [ ] Contact form shows validation/error message when required fields are missing

## 2. Admin

- [ ] Admin login works
- [ ] Dashboard loads
- [ ] Products can be added
- [ ] Products can be edited
- [ ] Product image upload works
- [ ] Stock can be increased by 1
- [ ] Stock can be decreased by 1
- [ ] Stock cannot go below 0
- [ ] Product can be hidden
- [ ] Product can be unhidden
- [ ] Product can be deleted
- [ ] Enquiries can be viewed
- [ ] Enquiry status can be updated
- [ ] Enquiry can be deleted
- [ ] Logout works

## 3. Mobile Testing

- [ ] Homepage looks good on mobile
- [ ] Product pages look good on mobile
- [ ] Product detail page looks good on mobile
- [ ] Admin dashboard works on mobile
- [ ] Product forms work on mobile
- [ ] Enquiries page works on mobile
- [ ] Admin sidebar/mobile menu works correctly

## 4. Security Checks

- [ ] Unauthenticated user cannot access `/admin/dashboard`
- [ ] Unauthenticated user cannot access `/admin/products`
- [ ] Unauthenticated user cannot access `/admin/products/new`
- [ ] Unauthenticated user cannot access `/admin/enquiries`
- [ ] Unauthenticated user cannot access `/admin/analytics`
- [ ] Public users cannot create products
- [ ] Public users cannot edit products
- [ ] Public users cannot delete products
- [ ] Public users can only submit enquiries

## 5. Final Sign-Off

Tested by:

Date:

Issues found:

Fixed status:
