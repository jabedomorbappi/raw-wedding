import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentEditor from "./ContentEditor";

interface PageProps {
  params: Promise<{ key: string }>;
}

export default async function EditContentPage({ params }: PageProps) {
  const { key } = await params;
  const row = await prisma.siteContent.findUnique({ where: { key } });
  if (!row) notFound();

  return (
    <div className="space-y-5">
      <Link href="/admin" className="text-sm text-stone-600 hover:underline">
        &larr; Back to dashboard
      </Link>
      <h1 className="font-serif text-3xl">Edit: {key}</h1>
      <p className="text-sm text-stone-600">
        Change text, prices, image links (<code>src</code>) and YouTube links (
        <code>youtubeUrl</code>). Keep the quotes and commas as they are.
      </p>
      <ContentEditor
        contentKey={key}
        initialJson={JSON.stringify(row.data, null, 2)}
      />
    </div>
  );
}
