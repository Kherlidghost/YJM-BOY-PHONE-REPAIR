type AdminHeaderProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
          YJM BOY Admin
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">{description}</p>
      </div>
      {action}
    </header>
  );
}
