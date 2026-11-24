"use client";

import { useEffect, useState } from "react";
import type { Idea } from "./types";

const STORAGE_KEY = "trivia-planner:ideas";

const SEED: Idea[] = [
  {
    id: "1",
    title: "5 curiosidades sobre o espaço",
    description: "Carrossel com fatos rápidos e uma pergunta no final para engajar.",
    platforms: ["instagram", "linkedin"],
    format: "carrossel",
    status: "ideia",
    tags: ["ciência", "curiosidades"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Quiz relâmpago: capitais",
    description: "Vídeo curto com 3 perguntas e contagem regressiva.",
    platforms: ["tiktok", "instagram"],
    format: "reels",
    status: "producao",
    tags: ["quiz", "geografia"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Bastidores da criação de perguntas",
    description: "Mostrar o processo de pesquisa e validação das perguntas.",
    platforms: ["youtube"],
    format: "video",
    status: "agendado",
    tags: ["bastidores"],
    scheduledFor: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  },
];

/**
 * Estado das ideias persistido no localStorage.
 * Substituir por chamadas a uma API/banco quando houver backend.
 */
export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setIdeas(raw ? JSON.parse(raw) : SEED);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas, loaded]);

  const save = (idea: Idea) =>
    setIdeas((prev) =>
      prev.some((i) => i.id === idea.id)
        ? prev.map((i) => (i.id === idea.id ? idea : i))
        : [idea, ...prev],
    );

  const remove = (id: string) => setIdeas((prev) => prev.filter((i) => i.id !== id));

  const update = (id: string, patch: Partial<Idea>) =>
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  return { ideas, loaded, save, remove, update };
}
