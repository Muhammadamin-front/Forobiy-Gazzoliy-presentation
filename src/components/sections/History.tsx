import { useEffect, useRef, useState } from "react"
import { starPoints } from "@/components/Ornament"
import { LADDER } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { cn } from "@/lib/utils"

const N = LADDER.length
const STOPS = LADDER.map((_, i) => ((i + 0.5) / N).toFixed(3)).join(",")
const tone = (who: "f" | "g") => (who === "f" ? "var(--color-lapis)" : "var(--color-qirmiz)")

/**
 * The numeric ladder (scroll-web.md): a pinned stage whose year steps
 * 870 → 1111 as the stage scrubs. Behind the year a rosette grows outward:
 * every event lays one more star ring, the newest drawn strongest, in the
 * colour of the thinker it belongs to.
 */
export function History() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let current = -1
    return registerStage(el, (p) => {
      const i = Math.min(N - 1, Math.floor(p * N))
      if (i !== current) {
        current = i
        setIndex(i)
      }
    })
  }, [])

  const step = LADDER[index]
  const head = step.year.slice(0, step.year.length - 2)
  const tail = step.year.slice(-2)
  // The century between the two lives, made visible when the ladder crosses it.
  const gapNow = index === 4

  return (
    <section id="tarix" aria-label="Tarix">
      <div ref={stageRef} data-stop data-stops={STOPS} className="stage h-[620svh]">
        <div className="stage__pin laid">
          <div className="wrap-page flex h-full flex-col pt-16 pb-10 lg:pt-10">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="disp text-[clamp(1.6rem,2.6vw,2.5rem)] text-ink">Ikki hayot, bir asr oralig‘ida</h2>
              <span className="tnum text-sm text-muted">
                870 → <span className="text-ink">{step.year}</span> → 1111
              </span>
            </div>

            <div className="grid flex-1 items-center gap-10 py-6 lg:grid-cols-[1fr_1.05fr]">
              <div className="relative grid place-items-center">
                <svg viewBox="-260 -260 520 520" aria-hidden="true" className="absolute size-[min(64vh,40vw)] overflow-visible max-lg:size-[30vh]">
                  <circle r="250" fill="none" stroke="var(--color-line)" strokeWidth="1" />
                  {LADDER.map((_, k) => k)
                    .filter((k) => k <= index)
                    .map((k) => {
                      const s = LADDER[index - k]
                      const on = k === 0
                      return (
                        <g
                          key={s.year}
                          style={{ transform: `scale(${1 + k * 0.2}) rotate(${k * 22.5}deg)`, transformBox: "view-box", transformOrigin: "0 0" }}
                          className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        >
                          <polygon
                            points={starPoints(0, 0, 92, 70)}
                            fill="none"
                            stroke={on ? tone(s.who) : "var(--color-gold)"}
                            strokeOpacity={on ? 0.95 : Math.max(0.12, 0.5 - k * 0.06)}
                            strokeWidth={on ? 1.8 : 1}
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      )
                    })}
                </svg>
                <div className="relative text-center">
                  <p className="disp text-[clamp(5rem,12vw,10.5rem)] leading-none" aria-live="polite">
                    <span className="text-muted/50">{head}</span>
                    <span style={{ color: tone(step.who) }}>{tail}</span>
                  </p>
                  <p className={cn("label mt-3", step.who === "f" ? "text-lapis" : "text-qirmiz")}>{step.who === "f" ? "Forobiy" : "G‘azzoliy"}</p>
                  <p className={cn("term mt-2 text-[1.1rem] text-gold transition-opacity duration-700", gapNow ? "opacity-100" : "opacity-0")}>
                    Forobiydan keyin 108 yil o‘tib
                  </p>
                </div>
              </div>

              <ol className="flex flex-col">
                {LADDER.map((s, i) => (
                  <li
                    key={s.year}
                    className={cn(
                      "relative border-t border-line py-2.5 transition-[opacity,padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-b",
                      i <= index ? "pl-5 opacity-100" : "opacity-35",
                      i === 4 && "mt-3 border-t-gold",
                    )}
                  >
                    {i === index && <span aria-hidden="true" className={cn("absolute top-[1.05rem] left-0 size-2 rotate-45", s.who === "f" ? "bg-lapis" : "bg-qirmiz")} />}
                    <div className="flex items-baseline gap-4">
                      <span className={cn("tnum w-12 shrink-0 text-sm", s.who === "f" ? "text-lapis" : "text-qirmiz")}>{s.year}</span>
                      <div>
                        <h3 className="text-[1.12rem] font-medium text-ink">{s.title}</h3>
                        <p
                          className={cn(
                            "overflow-hidden text-[0.98rem] leading-relaxed text-ink/85 transition-[max-height,opacity,margin] duration-700",
                            i === index ? "mt-1.5 max-h-44 opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="h-px w-full bg-line" aria-hidden="true">
              <div className="h-px bg-gold" style={{ width: "calc(var(--p) * 100%)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
