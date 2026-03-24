type SectionTitleProps = {
  title: string;
  meta?: string;
};

export function SectionTitle({ title, meta }: SectionTitleProps) {
  return (
    <div className="mb-4 border-b border-slate-300 pb-2">
      <div className="flex items-end justify-between gap-4">
        <h1 className="inline-block border-b-4 border-blue-600 pb-1 text-3xl font-medium text-slate-900">
          {title}
        </h1>
        {meta ? <span className="text-xs text-blue-600">{meta}</span> : null}
      </div>
    </div>
  );
}
