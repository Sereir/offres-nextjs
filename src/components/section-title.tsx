type SectionTitleProps = {
  title: string;
  meta?: string;
};

export function SectionTitle({ title, meta }: SectionTitleProps) {
  return (
    <div className="mb-6 border-b border-slate-300 pb-3">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-4xl font-medium text-slate-900">{title}</h1>
        {meta ? <span className="text-sm text-blue-600">{meta}</span> : null}
      </div>
    </div>
  );
}
