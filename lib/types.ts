export type Platform = "instagram" | "tiktok" | "youtube" | "linkedin" | "x";
export type Status = "ideia" | "producao" | "agendado" | "publicado";
export type Format = "post" | "carrossel" | "reels" | "story" | "video" | "thread";

export interface Idea {
  id: string;
  title: string;
  description: string;
  platforms: Platform[];
  format: Format;
  status: Status;
  tags: string[];
  scheduledFor?: string; // ISO date (yyyy-mm-dd)
  createdAt: string;
}

export const PLATFORMS: { value: Platform; label: string; color: string }[] = [
  { value: "instagram", label: "Instagram", color: "bg-pink-100 text-pink-700" },
  { value: "tiktok", label: "TikTok", color: "bg-neutral-200 text-neutral-800" },
  { value: "youtube", label: "YouTube", color: "bg-red-100 text-red-700" },
  { value: "linkedin", label: "LinkedIn", color: "bg-blue-100 text-blue-700" },
  { value: "x", label: "X", color: "bg-slate-200 text-slate-800" },
];

export const STATUSES: { value: Status; label: string }[] = [
  { value: "ideia", label: "Ideias" },
  { value: "producao", label: "Em produção" },
  { value: "agendado", label: "Agendado" },
  { value: "publicado", label: "Publicado" },
];

export const FORMATS: { value: Format; label: string }[] = [
  { value: "post", label: "Post" },
  { value: "carrossel", label: "Carrossel" },
  { value: "reels", label: "Reels" },
  { value: "story", label: "Story" },
  { value: "video", label: "Vídeo" },
  { value: "thread", label: "Thread" },
];
