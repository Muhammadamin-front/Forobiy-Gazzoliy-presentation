import { useEffect, useRef, useState } from "react"
import { Crown, Heart, Landmark, Scale } from "lucide-react"
import { Corners, starPoints } from "@/components/Ornament"
import { QIYOS_STEPS } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { cn } from "@/lib/utils"

const N = QIYOS_STEPS.length
const STOPS = QIYOS_STEPS.map((_, i) => ((i + 0.5) / N).toFixed(3)).join(",")

/** Ring node positions (top, right, bottom, left) on the city / body / kingdom diagram. */
const NODES = [
  { x: 0, y: -168 },
  { x: 168, y: 0 },
  { x: 0, y: 168 },
  { x: -168, y: 0 },
]

const colorOf = (step: number) => (step < 2 ? "var(--color-lapis)" : step === 2 ? "var(--color-qirmiz)" : "var(--color-gold)")

/**
 * The climax: one diagram that is first Forobiy's city of ranks, then the
 * body with the heart at its centre, then G‘azzoliy's kingdom of the self —
 * and finally both, with the direction each reads the metaphor in.
 */
function Diagram({ step }: { step: number }) {
  const s = QIYOS_STEPS[step]
  const c = colorOf(step)
  const CenterIcon = step === 0 ? Landmark : step === 1 ? Heart : step === 2 ? Crown : Scale
  const both = step === 3
  return (
    <div className="relative h-full w-full">
      <svg viewBox="-260 -260 520 520" aria-hidden="true" className="absolute inset-0 size-full overflow-visible" fill="none">
        <defs>
          <marker id="arrow-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-lapis)" />
          </marker>
          <marker id="arrow-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-qirmiz)" />
          </marker>
        </defs>
        <polygon points={starPoints(0, 0, 250, 200)} stroke="var(--color-line)" strokeWidth="1" />
        {/* Forobiy's ranks: concentric orders around the ruler */}
        {[70, 120, 168].map((r, i) => (
          <circle
            key={r}
            r={r}
            stroke={c}
            strokeWidth={step < 2 ? 1.4 : 1}
            strokeOpacity={step < 2 ? 0.75 - i * 0.18 : 0.22}
            strokeDasharray={step === 1 ? "3 6" : undefined}
            className="transition-[stroke,stroke-opacity] duration-700"
          />
        ))}
        {/* G‘azzoliy's officers: each answers directly to the king */}
        {NODES.map((n, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={n.x}
            y2={n.y}
            stroke={both ? (i % 2 === 0 ? "var(--color-lapis)" : "var(--color-qirmiz)") : c}
            strokeWidth="1.4"
            className="transition-[opacity] duration-700"
            style={{ opacity: step >= 2 ? 0.7 : 0 }}
          />
        ))}
        {both && (
          <>
            <path d="M-40 -30 C -110 -110, -150 -120, -190 -110" stroke="var(--color-lapis)" strokeWidth="2.2" markerEnd="url(#arrow-f)" />
            <path d="M190 110 C 150 120, 110 110, 40 30" stroke="var(--color-qirmiz)" strokeWidth="2.2" markerEnd="url(#arrow-g)" />
          </>
        )}
      </svg>

      {/* Centre: ruler → heart → king → happiness */}
      <div className="absolute top-1/2 left-1/2 grid size-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-vellum transition-colors duration-700" style={{ background: c }}>
        <div className="flex flex-col items-center gap-1 px-2">
          <CenterIcon className="size-[clamp(1.1rem,2vw,1.8rem)]" strokeWidth={1.6} />
          <span key={s.center} className="disp animate-[fadein_0.6s_ease] text-[clamp(0.95rem,1.55vw,1.5rem)] leading-tight">
            {s.center}
          </span>
        </div>
      </div>

      {NODES.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${50 + (n.x / 520) * 100}%`, top: `${50 + (n.y / 520) * 100}%` }}
        >
          <span
            key={s.ring[i]}
            className={cn(
              "block max-w-[11rem] border bg-vellum px-3 py-1.5 text-center text-[clamp(0.8rem,1.05vw,1rem)] leading-tight shadow-[0_6px_18px_-12px_rgba(10,19,41,0.5)] transition-colors duration-700",
              both ? (i % 2 === 0 ? "border-lapis text-lapis" : "border-qirmiz text-qirmiz") : step < 2 ? "border-lapis/50 text-lapis-deep" : "border-qirmiz/50 text-qirmiz",
            )}
          >
            {s.ring[i]}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Qiyos() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let current = -1
    return registerStage(el, (p) => {
      const i = Math.min(N - 1, Math.floor(p * N))
      if (i !== current) {
        current = i
        setStep(i)
      }
    })
  }, [])

  return (
    <section id="qiyos" aria-label="Qiyos: shahar va tana">
      <div ref={stageRef} data-stop data-stops={STOPS} className="stage h-[460svh]">
        <div className="stage__pin laid">
          <div className="wrap-page grid h-full gap-4 pt-16 pb-6 max-lg:grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:pt-10 lg:pb-8">
            <div className="flex flex-col justify-center">
              <p className="label text-gold">Qiyos · markaziy g‘oya</p>
              <h2 className="section-title mt-2 !text-[clamp(1.9rem,3.6vw,3.6rem)] text-ink">Shahar va tana</h2>
              <ol className="mt-4 flex flex-col lg:mt-8">
                {QIYOS_STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    className={cn("relative border-t border-line py-3.5 transition-[opacity,padding] duration-700 last:border-b", i === step ? "pl-5 opacity-100" : "opacity-40 max-lg:hidden")}
                  >
                    {i === step && (
                      <span aria-hidden="true" className={cn("absolute top-[1.45rem] left-0 size-2 rotate-45", s.who === "f" ? "bg-lapis" : s.who === "g" ? "bg-qirmiz" : "bg-gold")} />
                    )}
                    <p className={cn("label", s.who === "f" ? "text-lapis" : s.who === "g" ? "text-qirmiz" : "text-gold")}>{s.kicker}</p>
                    <h3 className="disp mt-1 text-[clamp(1.35rem,1.9vw,1.85rem)] text-ink">{s.title}</h3>
                    <p
                      className={cn(
                        "overflow-hidden text-[1.02rem] leading-relaxed text-ink/85 transition-[max-height,opacity,margin] duration-700",
                        i === step ? "mt-1.5 max-h-48 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      {s.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="frame relative min-h-0 bg-vellum/60 p-[9px] lg:min-h-[46svh]">
              <Corners />
              <div className="grid h-full w-full place-items-center" style={{ containerType: "size" }}>
                <div className="p-[5%]" style={{ width: "min(100cqw, 100cqh)", height: "min(100cqw, 100cqh)" }}>
                  <Diagram step={step} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
