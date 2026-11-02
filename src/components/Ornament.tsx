import { cn } from "@/lib/utils"

/** Points of a regular {n/k} star polygon, used for every girih star on the page. */
export function starPoints(cx: number, cy: number, r: number, inner: number, n = 8, rot = -90) {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const a = ((rot + (i * 180) / n) * Math.PI) / 180
    const rr = i % 2 === 0 ? r : inner
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(" ")
}

/** The eight-pointed star (khotam) of two crossed squares — the shared mark of both thinkers. */
export function Star({ className, fill = false }: { className?: string; fill?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("shrink-0", className)} fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <polygon points={starPoints(20, 20, 18, 13.2)} />
      {!fill && <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />}
    </svg>
  )
}

/** A gold rule that grows from its centre star outward. */
export function StarRule({ className, tone = "text-gold" }: { className?: string; tone?: string }) {
  return (
    <div className={cn("flex items-center gap-3", tone, className)} aria-hidden="true" data-rev>
      <span className="axis-rule h-px flex-1 bg-current opacity-70" />
      <Star className="size-4" />
      <span className="axis-rule h-px flex-1 bg-current opacity-70" />
    </div>
  )
}

/** Four corner knots that finish a .frame, as in an illuminated frontispiece. */
export function Corners({ className }: { className?: string }) {
  const corner = (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M2 14 V2 H14" />
      <polygon points="8,4 10,8 8,12 6,8" transform="rotate(-45 8 8)" fill="currentColor" stroke="none" />
    </svg>
  )
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-[3px] text-gold", className)}>
      <span className="absolute top-0 left-0">{corner}</span>
      <span className="absolute top-0 right-0 rotate-90">{corner}</span>
      <span className="absolute right-0 bottom-0 rotate-180">{corner}</span>
      <span className="absolute bottom-0 left-0 -rotate-90">{corner}</span>
    </div>
  )
}

/**
 * The mark: two squares crossed into one star — a lapis square for Forobiy,
 * a cinnabar one for G‘azzoliy, meeting in a gold centre.
 */
export function Mark({ className, light = false }: { className?: string; light?: boolean }) {
  const f = light ? "var(--color-sky)" : "var(--color-lapis)"
  const g = light ? "var(--color-qirmiz-light)" : "var(--color-qirmiz)"
  const gold = light ? "var(--color-gold-light)" : "var(--color-gold)"
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)} fill="none" strokeWidth="2.4" strokeLinejoin="round">
      <rect x="15" y="15" width="34" height="34" stroke={f} />
      <rect x="15" y="15" width="34" height="34" stroke={g} transform="rotate(45 32 32)" />
      <circle cx="32" cy="32" r="5" fill={gold} />
    </svg>
  )
}

/** Thinker colour tokens, used everywhere a value belongs to one of the two. */
export const TONE = {
  f: { text: "text-lapis", bg: "bg-lapis", border: "border-lapis", light: "text-sky", hex: "var(--color-lapis)", hexLight: "var(--color-sky)" },
  g: { text: "text-qirmiz", bg: "bg-qirmiz", border: "border-qirmiz", light: "text-qirmiz-light", hex: "var(--color-qirmiz)", hexLight: "var(--color-qirmiz-light)" },
} as const
