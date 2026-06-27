import {
  BarChart3,
  Boxes,
  CircleHelp,
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Wrench,
} from "lucide-react";

export const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/enquiries", label: "Enquiries", icon: CircleHelp },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export const productCategories = [
  "Phone Accessories",
  "Repair Tools",
  "Spare Parts",
] as const;

export const dashboardStats = [
  { label: "Total Products", value: "128", helper: "Across all categories", icon: Package },
  { label: "Low Stock Items", value: "12", helper: "Needs restock review", icon: Boxes },
  { label: "Available Products", value: "103", helper: "Visible to customers", icon: ShoppingBag },
  { label: "Customer Enquiries", value: "24", helper: "Pending follow-up", icon: CircleHelp },
];

export const sampleProducts = [
  {
    id: "1",
    name: "Fast Charger 25W",
    category: "Phone Accessories",
    price: "7500",
    stock_quantity: 34,
    is_available: true,
  },
  {
    id: "2",
    name: "Precision Screwdriver Kit",
    category: "Repair Tools",
    price: "18500",
    stock_quantity: 8,
    is_available: true,
  },
  {
    id: "3",
    name: "iPhone Screen Guard",
    category: "Spare Parts",
    price: "4500",
    stock_quantity: 5,
    is_available: false,
  },
];

export const sampleEnquiries = [
  {
    name: "Aisha Mohammed",
    contact: "07062849832",
    topic: "Power bank availability",
    date: "Today",
    status: "New",
  },
  {
    name: "Musa Ibrahim",
    contact: "07039853484",
    topic: "Wholesale repair tools",
    date: "Yesterday",
    status: "Open",
  },
  {
    name: "Fatima Ali",
    contact: "09118988152",
    topic: "Smart watch enquiry",
    date: "This week",
    status: "Closed",
  },
];

export const analyticsHighlights = [
  { label: "Top Category", value: "Phone Accessories", icon: ShoppingBag },
  { label: "Fastest Moving", value: "Chargers", icon: PlusCircle },
  { label: "Restock Focus", value: "Repair Tools", icon: Wrench },
];
