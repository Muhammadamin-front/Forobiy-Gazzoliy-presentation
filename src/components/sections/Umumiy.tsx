import { AuroraBackground } from "@/components/ui/aurora-background"
import { WordRise } from "@/components/ui/word-rise"
import { VENN } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

function List({ items, className, align = "left" }: { items: readonly string[]; className?: string; align?: "left" | "center" | "right" }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", align === "center" && "items-center text-center", align === "right" && "items-end text-right", className)}>
      {items.map((t) => (
        <li key={t} className="max-w-[15rem] text-[clamp(0.95rem,1.2vw,1.15rem)] leading-snug">
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Two overlapping circles: what is Forobiy's own, what is G‘azzoliy's own, and the shared lens between. */
export function Umumiy() {
  return (
    <section id="umumiy" aria-label="Umumiy jihatlar">
      <AuroraBackground className="laid slide py-20" color="#a67c2e">
        <div className="wrap-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-gold" data-rev>
                Ittifoq · umumiy jihatlar
              </p>
              <WordRise as="h2" className="section-title mt-3 text-ink" text="Farqli yo‘llar, umumiy maqsad" />
            </div>
            <p className="lede" data-rev style={delay(200)}>
              Ikkala alloma ham insonni saodatga yetaklashni falsafaning bosh vazifasi deb biladi.
            </p>
          </div>

          <div className="relative mx-auto mt-10 aspect-[1.75/1] w-full max-w-[1100px] max-md:aspect-auto" data-rev style={delay(200)}>
            <svg viewBox="0 0 700 400" aria-hidden="true" className="absolute inset-0 size-full max-md:hidden" fill="none">
              <circle cx="255" cy="200" r="190" fill="color-mix(in oklab, var(--color-lapis) 9%, transparent)" stroke="var(--color-lapis)" strokeWidth="1.6" />
              <circle cx="445" cy="200" r="190" fill="color-mix(in oklab, var(--color-qirmiz) 9%, transparent)" stroke="var(--color-qirmiz)" strokeWidth="1.6" />
            </svg>
            <div className="relative grid h-full grid-cols-[1fr_0.95fr_1fr] items-center max-md:grid-cols-1 max-md:gap-8">
              <div className="pl-[9%] text-lapis-deep max-md:pl-0">
                <p className="disp mb-3 text-[1.7rem] text-lapis">Forobiy</p>
                <List items={VENN.f} />
              </div>
              <div className="text-ink">
                <p className="label mb-3 text-center text-gold">Ikkalasida</p>
                <List items={VENN.both} align="center" className="font-medium" />
              </div>
              <div className="flex flex-col items-end pr-[9%] text-qirmiz max-md:items-start max-md:pr-0">
                <p className="disp mb-3 text-[1.7rem]">G‘azzoliy</p>
                <List items={VENN.g} align="right" className="max-md:items-start max-md:text-left" />
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </section>
  )
}
