import type { LucideIcon } from "lucide-react";

type AdminStatCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
};

export function AdminStatCard({ label, value, helper, icon: Icon }: AdminStatCardProps) {
  return (
    <article className="premium-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-300">{label}</p>
          <p className="mt-3 text-3xl font-black text-white">{value}</p>
        </div>
        <span className="icon-tile">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-400">{helper}</p>
    </article>
  );
}
