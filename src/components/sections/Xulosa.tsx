import { Mark, StarRule } from "@/components/Ornament"
import FlowField from "@/components/ui/flow-field"
import { SplashButton } from "@/components/ui/splash-button"
import { WordRise } from "@/components/ui/word-rise"
import { LESSONS, PRESENTER, SOURCES } from "@/lib/data"
import { scrollToY } from "@/lib/scroll"
import { delay } from "@/lib/utils"

export function Xulosa() {
  return (
    <section id="xulosa" aria-label="Xulosa">
      {/* The three lessons, stepping along the margin like a commentary */}
      <div data-stop className="slide on-lapis py-20">
        <div className="wrap-page">
          <p className="label text-gold-light" data-rev>
            Xotima · xulosa
          </p>
          <WordRise as="h2" className="section-title mt-3 max-w-[20ch] text-vellum" text="Bugungi kun uchun saboq" />
          <StarRule className="mt-8 max-w-md" tone="text-gold-light" />
          <ol className="relative mt-12 border-l border-gold-light/40">
            {LESSONS.map((l, i) => (
              <li
                key={l.title}
                className="relative grid gap-x-10 gap-y-2 border-b border-gold-light/20 py-7 pl-8 last:border-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
                style={{ marginLeft: `${i * 3}rem`, ...delay(140 * i) }}
                data-rev
              >
                <span aria-hidden="true" className="absolute top-9 -left-[5px] size-2.5 rotate-45 bg-gold-light" />
                <h3 className="disp text-[clamp(1.5rem,2.3vw,2.1rem)] text-gold-light">
                  <span className="mr-3 text-vellum/50">{i + 1}</span>
                  {l.title}
                </h3>
                <p className="max-w-[58ch] leading-relaxed text-vellum/90">{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Thanks, under the same light the talk opened with */}
      <div data-stop className="on-night">
        <FlowField density="medium" className="min-h-svh">
          <div className="wrap-page relative z-10 flex min-h-svh flex-col items-center justify-center py-20 text-center">
            <Mark className="size-16" light />
            <WordRise as="h2" className="section-title mt-8 text-vellum" text="E’tiboringiz uchun rahmat!" />
            <p className="arab mt-4 text-[clamp(1.6rem,2.6vw,2.4rem)] text-gold-light">شكرا لكم</p>
            <p className="lede mt-6 !text-vellum/75" data-rev style={delay(200)}>
              {PRESENTER.name} · {PRESENTER.group} · «{PRESENTER.subject}» fani
            </p>
            <div className="mt-10" data-rev style={delay(320)}>
              <SplashButton label="Boshiga qaytish" hoverLabel="Yana bir bor" onClick={() => scrollToY(0)} />
            </div>
          </div>
        </FlowField>
      </div>

      <div id="manbalar" data-stop className="laid py-16">
        <div className="wrap-page">
          <h2 className="disp text-[clamp(1.6rem,2.4vw,2.2rem)] text-ink">Foydalanilgan manbalar</h2>
          <ol className="mt-6 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {SOURCES.map((s, i) => (
              <li key={s} className="flex gap-3 border-b border-line/70 py-2 text-[0.98rem] text-ink/85">
                <span className="tnum w-5 shrink-0 text-gold">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="note mt-6">Sanalar taxminiy bo‘lsa «~» bilan belgilangan. Iqtiboslar asl matndan emas, mazmunan berilgan.</p>
        </div>
      </div>
    </section>
  )
}
