import { PLATFORMS, type Platform } from "@/lib/types";

export function PlatformBadge({ platform }: { platform: Platform }) {
  const p = PLATFORMS.find((x) => x.value === platform)!;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.color}`}>{p.label}</span>
  );
}
