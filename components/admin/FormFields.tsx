"use client";

import { ArrowDown, ArrowUp, ImageOff, Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const isObject = (v: Json | undefined): v is JsonObject =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const isImageObject = (v: Json | undefined): v is JsonObject =>
  isObject(v) && typeof v.src === "string" && typeof v.alt === "string";

const FIELD_LABELS: Record<string, string> = {
  priceBdt: "Price (BDT)",
  youtubeUrl: "YouTube link",
  src: "Image link",
  alt: "Image description",
  href: "Link",
  thumbnail: "Thumbnail image link",
  feature: "Feature",
};

function humanize(key: string): string {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  const spaced = key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

// An empty copy with the same shape, used by the "Add" button.
function blankLike(sample: Json | undefined): Json {
  if (sample === undefined || sample === null) return "";
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  const out: JsonObject = {};
  for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
  return out;
}

function itemTitle(item: Json, index: number): string {
  if (isObject(item)) {
    for (const k of ["name", "title", "label", "caption"]) {
      const v = item[k];
      if (typeof v === "string" && v.trim()) return v;
    }
    if (
      isImageObject(item) &&
      typeof item.alt === "string" &&
      item.alt.trim()
    ) {
      return item.alt;
    }
  }
  return `Item ${index + 1}`;
}

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-stone-800 focus:ring-2 focus:ring-stone-200";

function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
        {text}
      </span>
      {children}
    </label>
  );
}

function IconButton({
  title,
  onClick,
  disabled,
  danger,
  children,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-stone-600 hover:bg-stone-200"
      }`}
    >
      {children}
    </button>
  );
}

function Preview({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-400">
        <ImageOff size={22} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="h-24 w-24 shrink-0 rounded-lg object-cover"
    />
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: JsonObject;
  onChange: (next: JsonObject) => void;
}) {
  const src = String(value.src ?? "");
  const alt = String(value.alt ?? "");
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold">{label}</p>
      <div className="flex gap-4">
        <Preview key={src} src={src} />
        <div className="min-w-0 flex-1 space-y-3">
          <Label text="Image link">
            <input
              type="url"
              value={src}
              onChange={(e) => onChange({ ...value, src: e.target.value })}
              placeholder="https://..."
              className={inputClass}
            />
          </Label>
          <Label text="Image description">
            <input
              type="text"
              value={alt}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              className={inputClass}
            />
          </Label>
        </div>
      </div>
    </div>
  );
}

function UrlImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4">
      <Preview key={value} src={value} />
      <div className="min-w-0 flex-1">
        <Label text={label}>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Label>
      </div>
    </div>
  );
}

export function FieldRenderer({
  name,
  value,
  onChange,
  hideLabel,
}: {
  name: string;
  value: Json;
  onChange: (next: Json) => void;
  hideLabel?: boolean;
}) {
  const label = humanize(name);

  if (typeof value === "string") {
    if (name === "src" || name === "thumbnail") {
      return <UrlImageField label={label} value={value} onChange={onChange} />;
    }
    const isLink = name.endsWith("Url") || name === "href";
    const isLong = value.length > 70 || value.includes("\n");
    const control = isLong ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(8, Math.max(3, Math.ceil(value.length / 80)))}
        className={inputClass}
      />
    ) : (
      <input
        type={isLink ? "url" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isLink ? "https://..." : undefined}
        className={inputClass}
      />
    );
    return hideLabel ? control : <Label text={label}>{control}</Label>;
  }

  if (typeof value === "number") {
    const control = (
      <div className="flex items-center gap-2">
        {name === "priceBdt" && (
          <span className="text-sm text-stone-500">BDT</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(e.target.value === "" ? 0 : Number(e.target.value))
          }
          className={inputClass}
        />
      </div>
    );
    return hideLabel ? control : <Label text={label}>{control}</Label>;
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
        {label}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return <ArrayField label={label} items={value} onChange={onChange} />;
  }

  if (isImageObject(value)) {
    return <ImageField label={label} value={value} onChange={onChange} />;
  }

  if (isObject(value)) {
    return (
      <fieldset className="rounded-xl border border-stone-200 bg-white p-4">
        <legend className="px-2 text-sm font-semibold">{label}</legend>
        <ObjectFields value={value} onChange={onChange} />
      </fieldset>
    );
  }

  return null;
}

function ObjectFields({
  value,
  onChange,
}: {
  value: JsonObject;
  onChange: (next: JsonObject) => void;
}) {
  return (
    <div className="space-y-4">
      {Object.entries(value).map(([key, child]) => (
        <FieldRenderer
          key={key}
          name={key}
          value={child}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </div>
  );
}

function ArrayField({
  label,
  items,
  onChange,
}: {
  label: string;
  items: Json[];
  onChange: (next: Json[]) => void;
}) {
  const update = (i: number, v: Json) =>
    onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...items, blankLike(items[items.length - 1])]);

  const controls = (i: number) => (
    <span className="flex shrink-0 items-center">
      <IconButton
        title="Move up"
        onClick={() => move(i, -1)}
        disabled={i === 0}
      >
        <ArrowUp size={16} />
      </IconButton>
      <IconButton
        title="Move down"
        onClick={() => move(i, 1)}
        disabled={i === items.length - 1}
      >
        <ArrowDown size={16} />
      </IconButton>
      <IconButton title="Remove" onClick={() => remove(i)} danger>
        <Trash2 size={16} />
      </IconButton>
    </span>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          {label}{" "}
          <span className="font-normal text-stone-500">({items.length})</span>
        </p>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm transition-colors hover:bg-stone-100"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-stone-500">Nothing here yet.</p>
      )}

      {items.map((item, i) => {
        const isPrimitive = typeof item !== "object" || item === null;
        if (isPrimitive) {
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1">
                <FieldRenderer
                  name={label}
                  value={item}
                  hideLabel
                  onChange={(v) => update(i, v)}
                />
              </div>
              {controls(i)}
            </div>
          );
        }
        return (
          <details
            key={i}
            open={items.length <= 4}
            className="rounded-xl border border-stone-200 bg-stone-50"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3">
              <span className="truncate text-sm font-medium">
                {itemTitle(item, i)}
              </span>
              {controls(i)}
            </summary>
            <div className="border-t border-stone-200 p-4">
              {Array.isArray(item) ? (
                <ArrayField
                  label={`Group ${i + 1}`}
                  items={item}
                  onChange={(v) => update(i, v)}
                />
              ) : isImageObject(item) ? (
                <ImageField
                  label="Photo"
                  value={item}
                  onChange={(v) => update(i, v)}
                />
              ) : (
                <ObjectFields value={item} onChange={(v) => update(i, v)} />
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

// The entry point used by the section editor page.
export function RootEditor({
  value,
  onChange,
}: {
  value: Json;
  onChange: (next: Json) => void;
}) {
  if (Array.isArray(value)) {
    return <ArrayField label="Items" items={value} onChange={onChange} />;
  }
  if (isImageObject(value)) {
    return <ImageField label="Photo" value={value} onChange={onChange} />;
  }
  if (isObject(value)) {
    return <ObjectFields value={value} onChange={onChange} />;
  }
  return <FieldRenderer name="Value" value={value} onChange={onChange} />;
}
