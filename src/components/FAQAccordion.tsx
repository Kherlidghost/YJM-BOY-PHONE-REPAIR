"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="tech-section">
      <div className="section-inner grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers before you visit the shop"
          description="Quick answers about repair duration, warranty, payments, parts, data safety, and accessories."
        />
        <div className="space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="premium-card overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-black text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cyan-200 transition ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-7 text-slate-300">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
