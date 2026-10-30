"use client";

import { useState, useTransition } from "react";
import { saveContent } from "./actions";

interface ContentEditorProps {
  contentKey: string;
  initialJson: string;
}

export default function ContentEditor({
  contentKey,
  initialJson,
}: ContentEditorProps) {
  const [text, setText] = useState(initialJson);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const [pending, startTransition] = useTransition();

  const onSave = () => {
    startTransition(async () => {
      setStatus(await saveContent(contentKey, text));
    });
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="h-[65vh] w-full rounded-xl border border-stone-300 bg-white p-4 font-mono text-sm outline-none focus:border-stone-700"
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-lg bg-stone-900 px-6 py-2.5 text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save changes"}
        </button>
        {status && (
          <p
            role="status"
            className={status.ok ? "text-green-700" : "text-red-600"}
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}
