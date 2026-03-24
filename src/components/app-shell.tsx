import Link from "next/link";
import { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8">
      <header className="mb-6 flex h-12 items-center justify-between bg-blue-950 px-6 text-white">
        <Link href="/" className="text-sm font-semibold tracking-[0.3em]">
          DEV
        </Link>
        <span className="text-xs">⚙</span>
      </header>
      {children}
    </div>
  );
}
