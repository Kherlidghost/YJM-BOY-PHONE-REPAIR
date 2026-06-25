import {
  BatteryCharging,
  Cable,
  Droplets,
  Headphones,
  Microscope,
  PackageCheck,
  Power,
  Shield,
  Smartphone,
  Unplug,
  Watch,
  Wrench,
  Zap,
} from "lucide-react";

export const contactInfo = {
  businessName: "YJM BOY PHONE REPAIR AND ACCESSORIES",
  displayName: "YJM BOY Phone Repair and Accessories",
  shortName: "YJM Boy",
  address: "No. 2 Market Road, Biu, Borno State, Nigeria",
  phones: ["07062849832", "07039853484", "09118988152"],
  whatsapp: "2347062849832",
  websiteUrl: "https://yjm-boy-phone-repair.vercel.app",
};

export const heroStats = [
  { value: "1000+", label: "Repairs Completed" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "Same-Day", label: "Repairs" },
  { value: "Free", label: "Diagnosis" },
];

export const services = [
  {
    title: "Screen Replacement",
    description: "Clean display replacement for cracked, faulty, or unresponsive screens.",
    href: "/phone-repair",
    icon: Smartphone,
  },
  {
    title: "Battery Replacement",
    description: "Restore daily power with careful battery checks and replacement support.",
    href: "/phone-repair",
    icon: BatteryCharging,
  },
  {
    title: "Charging Port Repair",
    description: "Fix loose, damaged, or non-charging ports with proper diagnosis.",
    href: "/phone-repair",
    icon: Unplug,
  },
  {
    title: "Water Damage Repair",
    description: "Inspection and cleaning support for water-exposed mobile devices.",
    href: "/phone-repair",
    icon: Droplets,
  },
  {
    title: "Accessories",
    description: "Reliable chargers, protection, audio, power, and phone essentials.",
    href: "/accessories",
    icon: Shield,
  },
  {
    title: "Repair Tools",
    description: "Professional tools and consumables for technicians and repair shops.",
    href: "/repair-tools",
    icon: Wrench,
  },
];

export const phoneRepairServices = [
  "Screen Replacement",
  "Battery Replacement",
  "Charging Port Repair",
  "Down Panel Repair",
  "Water Damage Repair",
  "Data Transfer",
  "Motherboard Diagnosis",
];

export const accessories = [
  { name: "Chargers", description: "Fast and reliable chargers for daily use.", icon: Power },
  { name: "USB Cables", description: "Durable cables for charging and data transfer.", icon: Cable },
  { name: "Earbuds", description: "Clear audio accessories for music and calls.", icon: Headphones },
  { name: "Bluetooth Speakers", description: "Portable audio products for music and calls.", icon: PackageCheck },
  { name: "Smart Watches", description: "Modern wearable accessories for connected users.", icon: Watch },
  { name: "Power Banks", description: "Portable backup power for work, travel, and school.", icon: BatteryCharging },
  { name: "Phone Cases", description: "Protective cases with clean everyday style.", icon: Shield },
  { name: "Screen Protectors", description: "Tempered protection for safer phone screens.", icon: Smartphone },
  { name: "Memory Cards", description: "Storage options for files, music, photos, and video.", icon: PackageCheck },
];

export const repairTools = [
  { name: "Soldering Stations", description: "Reliable heat control for board-level repair.", icon: Zap },
  { name: "Screwdriver Kits", description: "Precision kits for careful mobile disassembly.", icon: Wrench },
  { name: "Microscope", description: "Inspection support for small components and boards.", icon: Microscope },
  { name: "BGA Tools", description: "Tools for advanced chip and motherboard repair work.", icon: PackageCheck },
  { name: "DC Power Supply", description: "Power testing support for diagnosis and repair.", icon: Power },
  { name: "Battery Activation Board", description: "Useful battery service tools for technicians.", icon: BatteryCharging },
  { name: "Tool Organizers", description: "Keep parts, tools, and repair benches neatly arranged.", icon: PackageCheck },
  { name: "Flux & Solder Wire", description: "Repair consumables for neat soldering work.", icon: Cable },
];

export const testimonials = [
  {
    name: "Aisha Mohammed",
    review: "My phone screen was replaced neatly and the service was fast. The shop explained everything before starting.",
  },
  {
    name: "Musa Ibrahim",
    review: "I bought a charger and power bank here. Good quality and the staff helped me pick the right one.",
  },
  {
    name: "Fatima Ali",
    review: "They checked my phone for free and fixed the charging problem the same day. Very professional.",
  },
  {
    name: "Usman Bello",
    review: "As a technician, I like their repair tools. The screwdriver kit and soldering items are useful.",
  },
  {
    name: "Maryam Yakubu",
    review: "Clean shop, good advice, and quick WhatsApp response. I recommend YJM Boy in Biu.",
  },
  {
    name: "Sani Abdullahi",
    review: "They transferred my data safely and helped me set up my new phone. Excellent customer care.",
  },
];

export const faqItems = [
  {
    question: "How long does phone repair take?",
    answer: "Many common repairs can be handled the same day after diagnosis. Complex faults may need extra inspection time.",
  },
  {
    question: "Do repairs come with warranty?",
    answer: "Warranty depends on the repair type and part used. The shop will explain available warranty details before work starts.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "Customers can confirm available cash and transfer options directly at the shop or through WhatsApp before visiting.",
  },
  {
    question: "Do you use original parts?",
    answer: "YJM Boy helps customers choose the best available part option based on device model, budget, and availability.",
  },
  {
    question: "Is my data safe during repair?",
    answer: "The repair process is handled carefully. Customers should mention sensitive data needs before repair begins.",
  },
  {
    question: "Do you sell accessories too?",
    answer: "Yes. Chargers, cables, earbuds, watches, power banks, cases, screen protectors, and memory cards are available.",
  },
];

export const whyChooseUs = [
  "Fast and careful phone repair service",
  "Quality accessories for everyday use",
  "Professional repair tools for technicians",
  "Trusted local shop in Biu Market Road",
];
