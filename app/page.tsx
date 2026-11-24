"use client";

import { useMemo, useState } from "react";
import { IdeaCard } from "@/components/IdeaCard";
import { IdeaModal } from "@/components/IdeaModal";
import { PLATFORMS, STATUSES, type Idea, type Platform, type Status } from "@/lib/types";
import { useIdeas } from "@/lib/useIdeas";

export default function BoardPage() {
  const { ideas, loaded, save, remove, update } = useIdeas();
  const [editing, setEditing] = useState<Idea | null | undefined>(undefined); // undefined = fechado, null = nova
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<Platform | "all">("all");

  const filtered = useMemo(
    () =>
      ideas.filter((i) => {
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q));
        const matchesPlatform = platform === "all" || i.platforms.includes(platform);
        return matchesSearch && matchesPlatform;
      }),
    [ideas, search, platform],
  );

  const onDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) update(id, { status });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="mr-auto text-2xl font-semibold">Quadro de ideias</h1>
        <input
          placeholder="Buscar por título, descrição ou tag…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform | "all")}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">Todas as plataformas</option>
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setEditing(null)}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          + Nova ideia
        </button>
      </div>

      {!loaded ? (
        <p className="text-sm text-neutral-500">Carregando…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATUSES.map((s) => {
            const column = filtered.filter((i) => i.status === s.value);
            return (
              <section
                key={s.value}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, s.value)}
                className="flex min-h-64 flex-col gap-3 rounded-xl bg-neutral-100 p-3"
              >
                <header className="flex items-center justify-between px-1">
                  <h2 className="text-sm font-semibold text-neutral-700">{s.label}</h2>
                  <span className="text-xs text-neutral-500">{column.length}</span>
                </header>
                {column.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} onClick={() => setEditing(idea)} />
                ))}
                {column.length === 0 && (
                  <p className="px-1 text-xs text-neutral-400">Arraste ideias para cá</p>
                )}
              </section>
            );
          })}
        </div>
      )}

      {editing !== undefined && (
        <IdeaModal
          idea={editing}
          onClose={() => setEditing(undefined)}
          onSave={(idea) => {
            save(idea);
            setEditing(undefined);
          }}
          onDelete={(id) => {
            remove(id);
            setEditing(undefined);
          }}
        />
      )}
    </div>
  );
}
