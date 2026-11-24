import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trivia Planner",
  description: "Gerenciamento de ideias para mídias sociais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold">
              Trivia Planner
            </Link>
            <nav className="flex gap-4 text-sm text-neutral-600">
              <Link href="/" className="hover:text-neutral-900">Quadro</Link>
              <Link href="/calendario" className="hover:text-neutral-900">Calendário</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
