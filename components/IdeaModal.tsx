"use client";

import { useState } from "react";
import { FORMATS, PLATFORMS, STATUSES, type Idea, type Platform } from "@/lib/types";

interface Props {
  idea: Idea | null; // null = nova ideia
  onSave: (idea: Idea) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

const empty = (): Idea => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  platforms: [],
  format: "post",
  status: "ideia",
  tags: [],
  createdAt: new Date().toISOString(),
});

export function IdeaModal({ idea, onSave, onDelete, onClose }: Props) {
  const [form, setForm] = useState<Idea>(idea ?? empty());
  const [tagsText, setTagsText] = useState(form.tags.join(", "));

  const set = <K extends keyof Idea>(key: K, value: Idea[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const togglePlatform = (p: Platform) =>
    set(
      "platforms",
      form.platforms.includes(p) ? form.platforms.filter((x) => x !== p) : [...form.platforms, p],
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...form,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      scheduledFor: form.scheduledFor || undefined,
    });
  };

  const input =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold">{idea ? "Editar ideia" : "Nova ideia"}</h2>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Título</span>
          <input autoFocus className={input} value={form.title} onChange={(e) => set("title", e.target.value)} />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Descrição</span>
          <textarea
            rows={3}
            className={input}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </label>

        <div className="space-y-1">
          <span className="text-sm font-medium">Plataformas</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const active = form.platforms.includes(p.value);
              return (
                <button
                  type="button"
                  key={p.value}
                  onClick={() => togglePlatform(p.value)}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Formato</span>
            <select className={input} value={form.format} onChange={(e) => set("format", e.target.value as Idea["format"])}>
              {FORMATS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Status</span>
            <select className={input} value={form.status} onChange={(e) => set("status", e.target.value as Idea["status"])}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Data</span>
            <input
              type="date"
              className={input}
              value={form.scheduledFor ?? ""}
              onChange={(e) => set("scheduledFor", e.target.value)}
            />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Tags (separadas por vírgula)</span>
          <input className={input} value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
        </label>

        <div className="flex items-center justify-between pt-2">
          {idea && onDelete ? (
            <button type="button" onClick={() => onDelete(idea.id)} className="text-sm text-red-600 hover:underline">
              Excluir
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm hover:bg-neutral-100">
              Cancelar
            </button>
            <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-700">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
