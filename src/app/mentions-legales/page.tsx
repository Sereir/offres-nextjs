import { AppShell } from "@/components/app-shell";
import { SectionTitle } from "@/components/section-title";

export default function LegalPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <SectionTitle title="Mentions Légales" />

        <section className="space-y-2 text-sm text-slate-700">
          <h2 className="font-semibold text-blue-600">Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>

        <section className="space-y-2 text-sm text-slate-700">
          <h2 className="font-semibold text-blue-600">Lorem Ipsum</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </section>
      </main>
    </AppShell>
  );
}
