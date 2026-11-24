"use client";

import { FORMATS, type Idea } from "@/lib/types";
import { PlatformBadge } from "./PlatformBadge";

interface Props {
  idea: Idea;
  onClick: () => void;
}

export function IdeaCard({ idea, onClick }: Props) {
  const format = FORMATS.find((f) => f.value === idea.format)?.label;

  return (
    <button
      onClick={onClick}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", idea.id)}
      className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-left shadow-sm transition hover:border-neutral-300 hover:shadow"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="font-medium leading-snug">{idea.title}</h3>
        <span className="shrink-0 text-xs text-neutral-500">{format}</span>
      </div>
      {idea.description && (
        <p className="mb-2 line-clamp-2 text-sm text-neutral-600">{idea.description}</p>
      )}
      <div className="flex flex-wrap gap-1">
        {idea.platforms.map((p) => (
          <PlatformBadge key={p} platform={p} />
        ))}
      </div>
      {(idea.tags.length > 0 || idea.scheduledFor) && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          {idea.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
          {idea.scheduledFor && (
            <span className="ml-auto">
              📅 {new Date(idea.scheduledFor + "T00:00").toLocaleDateString("pt-BR")}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
