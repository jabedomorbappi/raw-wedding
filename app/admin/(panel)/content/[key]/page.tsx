import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ContentEditor from "./ContentEditor";

interface PageProps {
  params: Promise<{ key: string }>;
}

async function EditorData({ params }: PageProps) {
  const { key } = await params;
  const row = await prisma.siteContent.findUnique({ where: { key } });
  if (!row) notFound();

  return (
    <div className="space-y-5">
      <h1 className="font-serif text-3xl">Edit: {key}</h1>
      <p className="text-sm text-stone-600">
        Fill in the boxes and press Save. Photos use an image link for now, and
        upload from your computer comes next. Use <code>**double stars**</code>{" "}
        around words to make them bold.
      </p>
      <ContentEditor
        contentKey={key}
        initialJson={JSON.stringify(row.data, null, 2)}
      />
    </div>
  );
}

export default function EditContentPage({ params }: PageProps) {
  return (
    <div className="space-y-5">
      <Link href="/admin" className="text-sm text-stone-600 hover:underline">
        &larr; Back to dashboard
      </Link>
      <Suspense fallback={<p className="text-stone-500">Loading...</p>}>
        <EditorData params={params} />
      </Suspense>
    </div>
  );
}
