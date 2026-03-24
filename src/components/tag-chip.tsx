import Link from "next/link";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

type TagChipProps = {
  tag: string;
};

export function TagChip({ tag }: TagChipProps) {
  const slug = encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"));

  return (
    <Link
      href={`/tags/${slug}`}
      className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 text-sm text-blue-600"
    >
      <SellOutlinedIcon className="text-[15px]" />
      {tag}
    </Link>
  );
}
