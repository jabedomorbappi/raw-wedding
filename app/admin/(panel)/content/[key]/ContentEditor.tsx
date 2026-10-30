"use client";

import { RootEditor, type Json } from "@/components/admin/FormFields";
import { Code2, LayoutList, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { saveContent } from "./actions";

interface ContentEditorProps {
  contentKey: string;
  initialJson: string;
}

type Status = { ok: boolean; message: string } | null;

export default function ContentEditor({
  contentKey,
  initialJson,
}: ContentEditorProps) {
  const [value, setValue] = useState<Json>(
    () => JSON.parse(initialJson) as Json,
  );
  const [snapshot, setSnapshot] = useState<string>(() =>
    JSON.stringify(JSON.parse(initialJson)),
  );
  const [mode, setMode] = useState<"form" | "json">("form");
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [pending, startTransition] = useTransition();

  const dirty = mode === "form" ? JSON.stringify(value) !== snapshot : true;

  const toJson = () => {
    setJsonText(JSON.stringify(value, null, 2));
    setStatus(null);
    setMode("json");
  };

  const toForm = () => {
    try {
      setValue(JSON.parse(jsonText) as Json);
      setStatus(null);
      setMode("form");
    } catch {
      setStatus({
        ok: false,
        message: "The JSON has a mistake. Fix it before going back.",
      });
    }
  };

  const onSave = () => {
    const payload = mode === "json" ? jsonText : JSON.stringify(value);
    startTransition(async () => {
      const result = await saveContent(contentKey, payload);
      setStatus(result);
      if (result.ok) {
        try {
          const parsed = JSON.parse(payload) as Json;
          setValue(parsed);
          setSnapshot(JSON.stringify(parsed));
        } catch {
          // The server already rejected invalid JSON, so this is not expected.
        }
      }
    });
  };

  const tabClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
      active
        ? "bg-stone-900 text-white"
        : "bg-white text-stone-700 hover:bg-stone-200"
    }`;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={toForm}
          className={tabClass(mode === "form")}
        >
          <LayoutList size={16} /> Form
        </button>
        <button
          type="button"
          onClick={toJson}
          className={tabClass(mode === "json")}
        >
          <Code2 size={16} /> Advanced (JSON)
        </button>
      </div>

      {mode === "form" ? (
        <RootEditor value={value} onChange={setValue} />
      ) : (
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          className="h-[60vh] w-full rounded-xl border border-stone-300 bg-white p-4 font-mono text-sm outline-none focus:border-stone-700"
        />
      )}

      <div className="sticky bottom-4 z-10 flex items-center gap-4 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-6 py-2.5 text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          <Save size={16} /> {pending ? "Saving..." : "Save changes"}
        </button>
        {status ? (
          <p
            role="status"
            className={status.ok ? "text-green-700" : "text-red-600"}
          >
            {status.message}
          </p>
        ) : (
          dirty &&
          mode === "form" && (
            <p className="text-sm text-amber-700">Unsaved changes</p>
          )
        )}
      </div>
    </div>
  );
}
