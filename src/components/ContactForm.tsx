"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { createEnquiry, type EnquiryActionState } from "@/actions/enquiries";
import { trackMetaLead } from "@/lib/meta-pixel";

const initialState: EnquiryActionState = {
  ok: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(createEnquiry, initialState);
  const trackedSuccessMessage = useRef("");

  useEffect(() => {
    if (!state.ok || trackedSuccessMessage.current === state.message) {
      return;
    }

    trackedSuccessMessage.current = state.message;
    // Lead is fired only after the public contact form submits successfully.
    trackMetaLead();
  }, [state.message, state.ok]);

  return (
    <form action={formAction} className="mt-8 grid gap-5 md:grid-cols-2">
      {state.message ? (
        <p
          className={
            state.ok
              ? "rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-100 md:col-span-2"
              : "rounded-md border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm font-bold text-yellow-100 md:col-span-2"
          }
        >
          {state.message}
        </p>
      ) : null}

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Full name
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Phone number
        <input
          name="phone"
          type="tel"
          placeholder="Your phone number"
          required
          className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200 md:col-span-2">
        Message
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us what you need"
          required
          className="resize-none rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={isPending}>
          <Send className="h-5 w-5" aria-hidden="true" />
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
