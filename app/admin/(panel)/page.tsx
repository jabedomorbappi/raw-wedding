import { prisma } from "@/lib/db";
import Link from "next/link";

const labels: Record<string, string> = {
  cover: "Hero cover (title, subtitle, background)",
  portraitSplit: "Portrait with tilted cards",
  alponaTrio: "Alpona circle and three cards",
  filmStrip: "Film-strip gallery",
  slideshow: "Sliding showcase photos",
  portraitStack: "Founder portrait and stacked photos",
  films: "Wedding films (YouTube links)",
  storytelling: "Visual storytelling video and photos",
  standardPackages: "Packages: Kathgolap, Charulata, RAW Signature",
  sanatanPackages: "Sanatan packages: Alpona, Logno Combo",
  sanatanArt: "Sanatan illustration",
  addOns: "Add-ons price list",
  terms: "Terms & Conditions",
  team: "The Crew",
  siteInfo: "Contact details and social links",
  navLinks: "Menu links",
};

export default async function DashboardPage() {
  const [rows, unread] = await Promise.all([
    prisma.siteContent.findMany({ orderBy: { key: "asc" } }),
    prisma.message.count({ where: { read: false } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl">Dashboard</h1>
        <p className="mt-1 text-stone-600">
          Choose a section to edit. Changes appear on the website right away.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Website sections</p>
          <p className="mt-1 text-3xl font-semibold">{rows.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Unread contact messages</p>
          <p className="mt-1 text-3xl font-semibold">{unread}</p>
        </div>
      </div>

      <ul className="divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white shadow-sm">
        {rows.map((row) => (
          <li key={row.key}>
            <Link
              href={`/admin/content/${row.key}`}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-stone-50"
            >
              <span>
                <span className="block font-medium">
                  {labels[row.key] ?? row.key}
                </span>
                <span className="block text-xs text-stone-500">
                  Last changed{" "}
                  {row.updatedAt.toLocaleString("en-GB", {
                    timeZone: "Asia/Dhaka",
                  })}
                </span>
              </span>
              <span className="text-sm text-stone-600">Edit</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
