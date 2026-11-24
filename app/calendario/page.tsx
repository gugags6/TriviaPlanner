"use client";

import { useState } from "react";
import { IdeaModal } from "@/components/IdeaModal";
import type { Idea } from "@/lib/types";
import { useIdeas } from "@/lib/useIdeas";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const firstOfMonth = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);

export default function CalendarPage() {
  const { ideas, save, remove } = useIdeas();
  const [month, setMonth] = useState(() => firstOfMonth());
  const [editing, setEditing] = useState<Idea | undefined>();

  // Grade de 6 semanas começando no domingo anterior ao dia 1
  const start = new Date(month);
  start.setDate(1 - month.getDay());
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
  const todayKey = toKey(new Date());
  const unscheduled = ideas.filter((i) => !i.scheduledFor && i.status !== "publicado");
  const navBtn = "rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="mr-auto text-2xl font-semibold capitalize">
            {month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </h1>
          <button onClick={() => shift(-1)} className={navBtn}>←</button>
          <button onClick={() => setMonth(firstOfMonth())} className={navBtn}>Hoje</button>
          <button onClick={() => shift(1)} className={navBtn}>→</button>
        </div>

        <div className="grid grid-cols-7 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="border-b border-neutral-200 bg-neutral-50 py-2 text-center text-xs font-medium text-neutral-500"
            >
              {w}
            </div>
          ))}
          {days.map((d) => {
            const key = toKey(d);
            const dayIdeas = ideas.filter((i) => i.scheduledFor === key);
            const outside = d.getMonth() !== month.getMonth();
            return (
              <div
                key={key}
                className={`min-h-24 border-b border-r border-neutral-100 p-1.5 ${
                  outside ? "bg-neutral-50 text-neutral-400" : ""
                }`}
              >
                <div className={`mb-1 text-xs ${key === todayKey ? "font-bold text-neutral-900" : ""}`}>
                  {d.getDate()}
                </div>
                <div className="space-y-1">
                  {dayIdeas.map((i) => (
                    <button
                      key={i.id}
                      onClick={() => setEditing(i)}
                      className="block w-full truncate rounded bg-neutral-900 px-1.5 py-0.5 text-left text-xs text-white"
                    >
                      {i.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="space-y-3">
        <h2 className="text-sm font-semibold text-neutral-700">Sem data ({unscheduled.length})</h2>
        {unscheduled.map((i) => (
          <button
            key={i.id}
            onClick={() => setEditing(i)}
            className="block w-full rounded-lg border border-neutral-200 bg-white p-2 text-left text-sm hover:border-neutral-300"
          >
            {i.title}
          </button>
        ))}
      </aside>

      {editing && (
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
