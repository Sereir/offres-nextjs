import Link from "next/link";

type TagChipProps = {
  tag: string;
};

export function TagChip({ tag }: TagChipProps) {
  const slug = encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"));

  return (
    <Link
      href={`/tags/${slug}`}
      className="inline-flex border border-slate-300 bg-white px-2 py-1 text-[10px] text-blue-600"
    >
      {tag}
    </Link>
  );
}
