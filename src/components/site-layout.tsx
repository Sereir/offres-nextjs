import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <header className="h-16 w-full bg-[#0F1941] text-white">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-base font-semibold tracking-[0.35em]">
            DEV
          </Link>
          <Link href="/profil" aria-label="Profil" className="inline-flex items-center text-white">
            <AccountCircleOutlinedIcon className="text-[22px]" />
          </Link>
        </div>
      </header>
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-6 pb-8 md:px-6">{children}</div>
      <footer className="border-t border-slate-300">
        <div className="mx-auto flex w-full max-w-[1280px] justify-end px-4 py-4 md:px-6">
          <Link href="/mentions-legales" className="text-xs text-blue-600 hover:underline">
            Mentions légales
          </Link>
        </div>
      </footer>
    </div>
  );
}