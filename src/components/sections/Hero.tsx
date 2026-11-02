import { useEffect, useState } from "react"
import { starPoints } from "@/components/Ornament"
import FlowField from "@/components/ui/flow-field"
import { SplashButton } from "@/components/ui/splash-button"
import { TextRoll } from "@/components/ui/text-roll"
import { THINKERS } from "@/lib/data"
import { scrollToId } from "@/lib/scroll"
import { cn, delay, prefersReducedMotion, wordIndex } from "@/lib/utils"

const PATHS = [
  { word: "aql", who: "f" as const },
  { word: "qalb", who: "g" as const },
]

/** The question rolls between its two answers (text-roll, 2-prompt.md), one per thinker. */
function RollingPath() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setI((v) => (v + 1) % PATHS.length), 3200)
    return () => window.clearInterval(id)
  }, [])
  const p = PATHS[i]
  return (
    <span className={cn("disp inline-block min-w-[3.2ch] italic", p.who === "f" ? "text-sky" : "text-qirmiz-light")}>
      <TextRoll key={p.word} duration={0.35} getEnterDelay={(k) => k * 0.06} getExitDelay={(k) => k * 0.06 + 0.12}>
        {p.word}
      </TextRoll>
    </span>
  )
}

function Medallion({ who }: { who: "f" | "g" }) {
  const t = THINKERS[who]
  const tone = who === "f" ? "var(--color-sky)" : "var(--color-qirmiz-light)"
  return (
    <div className="flex items-center gap-4">
      <div className="relative grid size-[clamp(5.5rem,9vw,8rem)] shrink-0 place-items-center">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full" fill="none">
          <polygon points={starPoints(50, 50, 48, 39)} stroke="var(--color-gold-light)" strokeWidth="0.9" />
          <circle cx="50" cy="50" r="33" stroke={tone} strokeWidth="1.2" />
        </svg>
        <span className="arab relative text-[clamp(1.05rem,1.7vw,1.5rem)]" style={{ color: tone }}>
          {t.arabic}
        </span>
      </div>
      <div>
        <p className="disp text-[clamp(1.5rem,2.3vw,2.2rem)] text-vellum">{t.short}</p>
        <p className="tnum text-sm text-vellum/70">{t.years}</p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="kirish" data-stop aria-label="Kirish" className="on-night relative">
      <FlowField density="dense" className="min-h-svh">
        <div className="wrap-page relative z-10 flex min-h-svh flex-col justify-center py-24">
          <p className="label text-gold-light" data-rev>
            Falsafa · qiyosiy tahlil
          </p>
          <h2 className="section-title mt-5 !text-[clamp(3.6rem,10vw,9.5rem)] !leading-[0.92]" data-words="">
            <span className="w text-sky" style={wordIndex(0)}>
              Aql
            </span>{" "}
            <span className="w text-gold-light italic" style={wordIndex(1)}>
              va
            </span>{" "}
            <span className="w text-qirmiz-light" style={wordIndex(2)}>
              qalb
            </span>
          </h2>
          <p className="mt-8 max-w-[30ch] text-[clamp(1.35rem,2.3vw,2.2rem)] leading-snug text-vellum" data-rev style={delay(250)}>
            Inson saodatga nima orqali erishadi — <RollingPath /> orqalimi?
          </p>
          <p className="lede mt-5 !text-vellum/75" data-rev style={delay(380)}>
            Ikki buyuk alloma bu savolga ikki xil javob bergan. Biri jamiyat va aqlni, ikkinchisi qalb va o‘zlikni tanishni markazga qo‘ygan.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6" data-rev style={delay(520)}>
            <Medallion who="f" />
            <span aria-hidden="true" className="disp text-[2rem] text-gold-light italic">
              va
            </span>
            <Medallion who="g" />
          </div>

          <div className="mt-12" data-rev style={delay(680)}>
            <SplashButton label="Allomalar bilan tanishish" hoverLabel="Boshladik" onClick={() => scrollToId("allomalar")} />
          </div>
        </div>
      </FlowField>
    </section>
  )
}
