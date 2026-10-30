import { logoutAction } from "@/app/admin/login/actions";
import { getSession } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function Guard({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-serif text-xl">
            RAW Weddings <span className="text-sm text-stone-500">Admin</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View site
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-stone-300 px-3 py-1.5 hover:bg-stone-100"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="p-6 text-stone-500">Loading...</div>}>
      <Guard>{children}</Guard>
    </Suspense>
  );
}
