// components/portfolio/PortfolioCompilingNotice.tsx
type PortfolioCompilingNoticeProps = {
  title?: string;
  subtitle?: string;
};

export default function PortfolioCompilingNotice({
  title = "Portfolio is compiling",
  subtitle = "Stay tuned — new work is being prepared.",
}: PortfolioCompilingNoticeProps) {
  return (
    <section className="w-full bg-white text-neutral-700">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.2em] text-neutral-500">
            STATUS
          </p>

          <h3 className="mt-2 text-2xl font-light tracking-tight text-neutral-800 sm:text-3xl">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-600 sm:text-base">
            {subtitle}
          </p>

          <div className="mt-6 h-px w-full bg-neutral-200" />

          <p className="mt-4 text-xs tracking-wide text-neutral-500">
            Check back soon.
          </p>
        </div>
      </div>
    </section>
  );
}
