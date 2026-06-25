import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

export function Testimonials() {
  return (
    <section className="tech-section-alt">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Customer stories"
          title="Trusted by customers and technicians in Biu"
          description="Realistic feedback that reflects the kind of service experience YJM Boy is built to deliver."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="premium-card p-6 animate-rise"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.28),rgba(250,204,21,0.18))] text-lg font-black text-white">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h3 className="font-black text-white">{testimonial.name}</h3>
                  <div className="mt-1 flex gap-1 text-yellow-200">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 leading-7 text-slate-300">{testimonial.review}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
