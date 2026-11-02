import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import { Corners, StarRule, starPoints } from "@/components/Ornament"
import { PRESENTER } from "@/lib/data"
import { scrollToId } from "@/lib/scroll"
import { cn, delay, prefersReducedMotion } from "@/lib/utils"

/** The title sentence, split where its emphasis changes. An empty name drops its segment. */
const SEGMENTS: { text: string; className?: string }[] = [
  ...(PRESENTER.name ? [{ text: `${PRESENTER.name}ning`, className: "font-semibold text-ink" }, { text: " " }] : []),
  { text: "«" },
  { text: "Abu Nasr Forobiy", className: "text-lapis" },
  { text: " va " },
  { text: "G‘azzoliy", className: "text-qirmiz" },
  { text: "ning falsafa ilmiga oid qarashlarini qiyosiy tahlil etish»", className: "" },
  { text: " mavzusiga tayyorlagan taqdimoti", className: "text-muted" },
]
const TOTAL = SEGMENTS.reduce((n, s) => n + s.text.length, 0)
const START_MS = 1200
const CHAR_MS = 30

/**
 * Typewriter that restarts every time the cover comes back into view. Every
 * character is laid out from the first frame (untyped ones are transparent),
 * so the big type never reflows while it is being written.
 */
function useTypewriter<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setTyped(TOTAL)
      return
    }
    let timer = 0
    let tick = 0
    const run = () => {
      window.clearTimeout(timer)
      window.clearInterval(tick)
      setTyped(0)
      timer = window.setTimeout(() => {
        let n = 0
        tick = window.setInterval(() => {
          n += 1
          setTyped(n)
          if (n >= TOTAL) window.clearInterval(tick)
        }, CHAR_MS)
      }, START_MS)
    }
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && run(), { threshold: 0.6 })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      window.clearInterval(tick)
    }
  }, [])

  return { ref, typed, done: typed >= TOTAL }
}

/** The frontispiece star: Forobiy's lapis square and G‘azzoliy's cinnabar square drawn into one khotam. */
function StarDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="-110 -110 220 220" aria-hidden="true" className={cn("overflow-visible", className)} fill="none">
      <circle className="cover-draw" r="104" stroke="var(--color-line)" strokeWidth="0.6" pathLength={1} />
      <circle className="cover-draw" style={{ animationDelay: "200ms" }} r="96" stroke="var(--color-gold)" strokeWidth="0.5" strokeDasharray="1 3" pathLength={1} />
      <rect className="cover-draw" style={{ animationDelay: "300ms" }} x="-62" y="-62" width="124" height="124" stroke="var(--color-lapis)" strokeWidth="1.3" pathLength={1} />
      <rect
        className="cover-draw"
        style={{ animationDelay: "800ms" }}
        x="-62"
        y="-62"
        width="124"
        height="124"
        transform="rotate(45)"
        stroke="var(--color-qirmiz)"
        strokeWidth="1.3"
        pathLength={1}
      />
      <polygon className="cover-draw" style={{ animationDelay: "1400ms" }} points={starPoints(0, 0, 46, 34, 8, -67.5)} stroke="var(--color-gold)" strokeWidth="0.9" pathLength={1} />
      <circle className="cover-draw" style={{ animationDelay: "1800ms" }} r="14" stroke="var(--color-gold)" strokeWidth="0.9" pathLength={1} />
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          className="cover-draw"
          style={{ animationDelay: `${1900 + i * 40}ms` }}
          d="M0 -88 V-100"
          transform={`rotate(${i * 22.5})`}
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          pathLength={1}
        />
      ))}
    </svg>
  )
}

export function Cover() {
  const { ref, typed, done } = useTypewriter<HTMLElement>()
  let left = typed

  return (
    <section ref={ref} id="muqova" data-stop aria-label="Muqova" className="laid relative isolate h-svh min-h-[680px] overflow-hidden max-md:h-auto max-md:min-h-svh">
      <StarDrawing className="pointer-events-none absolute top-1/2 right-[4%] -z-10 size-[min(60vh,30vw)] -translate-y-1/2 max-lg:top-[8%] max-lg:right-[-10%] max-lg:size-[46vw] max-lg:translate-y-0 max-lg:opacity-35 max-md:hidden" />

      <div className="relative m-[clamp(0.75rem,2vw,1.5rem)] flex h-[calc(100%-2*clamp(0.75rem,2vw,1.5rem))] flex-col border border-gold/40 px-[clamp(1.25rem,4.5vw,4.5rem)] pt-12 pb-10">
        <Corners />

        <div className="text-center" data-rev>
          <p className="disp text-[clamp(1.3rem,2.2vw,2.1rem)] tracking-[0.06em] text-lapis-deep uppercase">{PRESENTER.university}</p>
          <p className="mt-2 text-[clamp(1rem,1.5vw,1.4rem)] text-muted">{PRESENTER.faculty}</p>
          <StarRule className="mx-auto mt-5 max-w-[22rem]" />
        </div>

        <div className="my-auto w-full py-10 lg:max-w-[64%]">
          <p className="flex items-center gap-3 text-[clamp(1rem,1.5vw,1.4rem)] tracking-[0.12em] text-muted uppercase" data-rev style={delay(250)}>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {PRESENTER.group} talabasi
          </p>

          <h1 className="disp mt-5 text-[clamp(1.75rem,3.5vw,3.7rem)] leading-[1.12] font-medium text-ink" aria-label={SEGMENTS.map((s) => s.text).join("")}>
            <span aria-hidden="true">
              {SEGMENTS.map((s, i) => {
                const shown = Math.max(0, Math.min(s.text.length, left))
                // The caret sits in the one segment that is still being written.
                const caretHere = !done && left >= 0 && left < s.text.length
                left -= s.text.length
                return (
                  <span key={i} className={s.className}>
                    {s.text.slice(0, shown)}
                    {caretHere && <span className="cover-caret" />}
                    <span className="text-transparent">{s.text.slice(shown)}</span>
                  </span>
                )
              })}
              {done && <span className="cover-caret cover-caret--idle" />}
            </span>
          </h1>
          <p className={cn("term mt-6 text-[clamp(1.1rem,1.5vw,1.45rem)] text-muted transition-opacity duration-1000", done ? "opacity-100" : "opacity-0")}>
            {PRESENTER.basis} · «{PRESENTER.subject}» fanidan
          </p>
        </div>

        <div className={cn("flex flex-wrap items-end justify-between gap-6 transition-opacity duration-1000", done ? "opacity-100" : "opacity-0")}>
          <p className="text-[clamp(0.95rem,1.3vw,1.2rem)] tracking-[0.12em] text-muted uppercase">
            Farg‘ona · 2026 <span className="arab ml-2 text-gold normal-case">٢٠٢٦</span>
          </p>
          <button
            type="button"
            onClick={() => scrollToId("kirish")}
            className="group inline-flex h-14 items-center gap-4 bg-lapis pr-3 pl-7 text-vellum outline-1 outline-offset-4 outline-lapis transition-[outline-offset,background-color] duration-500 hover:bg-lapis-mid hover:outline-offset-[7px]"
          >
            <span className="label tracking-[0.18em]">Taqdimotni boshlash</span>
            <span className="grid size-9 place-items-center border border-gold-light/50 text-gold-light">
              <ArrowDown className="size-4 motion-safe:animate-bounce" strokeWidth={1.6} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
