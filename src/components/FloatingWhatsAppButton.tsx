import { contactInfo } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsAppButton() {
  const message = encodeURIComponent(
    "Hello YJM Boy, I need help with phone repair or accessories.",
  );

  return (
    <a
      href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#25d366] px-5 py-3 text-sm font-black text-[#041008] shadow-2xl shadow-[#25d366]/25 ring-4 ring-[#25d366]/10 transition hover:-translate-y-1 hover:scale-105"
      aria-label="Chat with YJM Boy on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      WhatsApp
    </a>
  );
}
