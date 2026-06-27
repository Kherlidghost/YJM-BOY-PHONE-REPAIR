import type { EnquiryStatus } from "@/lib/validations/enquiry";

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  message: string;
  source: string | null;
  status: EnquiryStatus;
  created_at: string;
};

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
