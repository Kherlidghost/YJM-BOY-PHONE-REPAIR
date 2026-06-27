"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Search, Trash2 } from "lucide-react";
import { deleteEnquiry, updateEnquiryStatus } from "@/actions/enquiries";
import { formatDateTime, type Enquiry } from "@/lib/enquiries";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/validations/enquiry";

type EnquiriesManagerProps = {
  enquiries: Enquiry[];
};

const statusFilters = ["all", ...enquiryStatuses] as const;
const sortOptions = ["Newest first", "Oldest first"] as const;

type StatusFilter = (typeof statusFilters)[number];
type SortOption = (typeof sortOptions)[number];

function statusClass(status: string) {
  if (status === "closed") {
    return "text-slate-400";
  }

  if (status === "contacted") {
    return "text-cyan-200";
  }

  return "text-yellow-200";
}

function getWhatsAppPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `234${digits.slice(1)}`;
  }

  return digits;
}

function StatusButton({
  id,
  status,
  label,
}: {
  id: string;
  status: EnquiryStatus;
  label: string;
}) {
  return (
    <form action={updateEnquiryStatus.bind(null, id)}>
      <input type="hidden" name="status" value={status} />
      <button type="submit" className="btn-secondary w-full px-4 py-2 text-sm">
        {label}
      </button>
    </form>
  );
}

export function EnquiriesManager({ enquiries }: EnquiriesManagerProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOption>("Newest first");

  const filteredEnquiries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...enquiries]
      .filter((enquiry) => {
        const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
        const searchableText = `${enquiry.name} ${enquiry.phone} ${enquiry.message}`.toLowerCase();

        return matchesStatus && searchableText.includes(normalizedQuery);
      })
      .sort((a, b) => {
        const aTime = new Date(a.created_at).getTime();
        const bTime = new Date(b.created_at).getTime();

        return sort === "Newest first" ? bTime - aTime : aTime - bTime;
      });
  }, [enquiries, query, sort, statusFilter]);

  if (enquiries.length === 0) {
    return (
      <div className="premium-card p-8 text-center">
        <p className="text-xl font-black text-white">No enquiries yet</p>
        <p className="mt-3 text-slate-400">New messages from the public contact form will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="premium-card grid gap-4 p-4 lg:grid-cols-[1fr_180px_170px]">
        <label className="relative">
          <span className="sr-only">Search enquiries</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, phone, or message"
            className="w-full rounded-md border border-white/10 bg-[#07101a] py-3 pl-11 pr-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </label>

        <label>
          <span className="sr-only">Filter by enquiry status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="w-full rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold capitalize text-white outline-none transition focus:border-cyan-300"
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All" : status}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Sort enquiries</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="w-full rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredEnquiries.length === 0 ? (
        <div className="premium-card p-8 text-center">
          <p className="text-xl font-black text-white">No matching enquiries</p>
          <p className="mt-3 text-slate-400">Try another search, status filter, or sorting option.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredEnquiries.map((enquiry) => (
            <article key={enquiry.id} className="premium-card p-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_230px] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-black text-white">{enquiry.name}</p>
                    <span className={`text-sm font-black uppercase tracking-[0.14em] ${statusClass(enquiry.status)}`}>
                      {enquiry.status}
                    </span>
                  </div>
                  <a href={`tel:${enquiry.phone}`} className="mt-1 inline-flex text-sm font-bold text-cyan-200 hover:text-white">
                    {enquiry.phone}
                  </a>
                  <p className="mt-3 leading-7 text-slate-200">{enquiry.message}</p>
                  <p className="mt-3 text-sm text-slate-400">{formatDateTime(enquiry.created_at)}</p>
                </div>

                <div className="grid gap-3">
                  <a
                    href={`https://wa.me/${getWhatsAppPhone(enquiry.phone)}?text=${encodeURIComponent(`Hello ${enquiry.name}, this is YJM BOY Phone Repair and Accessories. We received your enquiry and we are ready to assist you.`)}`}
                    className="btn-primary justify-center px-4 py-2 text-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Open WhatsApp
                  </a>

                  <StatusButton id={enquiry.id} status="contacted" label="Mark as contacted" />
                  <StatusButton id={enquiry.id} status="closed" label="Mark as closed" />

                  <form
                    action={deleteEnquiry.bind(null, enquiry.id)}
                    onSubmit={(event) => {
                      if (!window.confirm(`Delete enquiry from ${enquiry.name}?`)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-yellow-300/30 px-4 py-2 text-sm font-black text-yellow-100 transition hover:border-yellow-200 hover:text-white"
                      aria-label={`Delete enquiry from ${enquiry.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Delete enquiry
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
