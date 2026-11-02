import { useEffect, useState } from "react"
import { BookOpen, Feather, FlaskConical, Flag, GitCompareArrows, Hourglass, Landmark, Scale, Sparkles, Users, type LucideIcon } from "lucide-react"
import { PRESENTER, SECTIONS, type SectionId } from "@/lib/data"
import { onScrollY, scrollToId, syncHash } from "@/lib/scroll"
import { arabicDigits, cn } from "@/lib/utils"
import { Mark, starPoints } from "./Ornament"

const ICONS: Record<SectionId, LucideIcon> = {
  muqova: BookOpen,
  kirish: Sparkles,
  allomalar: Users,
  tarix: Hourglass,
  forobiy: Landmark,
  gazzoliy: FlaskConical,
  qiyos: GitCompareArrows,
  taqqoslash: Scale,
  umumiy: Feather,
  xulosa: Flag,
}

/** Which thinker owns a section: its marker takes that thinker's colour. */
const OWNER: Partial<Record<SectionId, "f" | "g">> = { forobiy: "f", gazzoliy: "g" }

function useActiveSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  useEffect(
    () =>
      onScrollY((y) => {
        const probe = y + window.innerHeight * 0.45
        let idx = 0
        SECTIONS.forEach((s, i) => {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top + y <= probe) idx = i
        })
        setActive(idx)
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? y / max : 0)
      }),
    [],
  )
  useEffect(() => {
    if (window.scrollY > 4) syncHash(SECTIONS[active].id)
  }, [active])
  return { active, progress }
}

export function Rail() {
  const { active, progress } = useActiveSection()
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail)] flex-col bg-night text-vellum lg:flex">
        <a
          href="#muqova"
          onClick={(e) => (e.preventDefault(), scrollToId("muqova"))}
          className="mx-4 mt-4 flex flex-col items-center gap-1.5 border-b border-gold-light/25 px-2 pt-1 pb-4 text-center"
        >
          <Mark className="size-12" light />
          <span className="disp text-[1.15rem] text-vellum">Forobiy · G‘azzoliy</span>
          <span className="arab -mt-1 text-[1.05rem] text-gold-light">الفارابي · الغزالي</span>
        </a>

        {/* The margin of the manuscript: a gold line through every folio, the current one marked by a turning star */}
        <nav aria-label="Bo‘limlar" className="relative mx-4 flex-1 overflow-y-auto py-4">
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-gold-light/25" />
          <ul className="relative flex flex-col gap-0.5">
            {SECTIONS.map((s, i) => {
              const Icon = ICONS[s.id]
              const on = i === active
              const passed = i < active
              const owner = OWNER[s.id]
              const onColor = owner === "f" ? "border-sky bg-sky text-night" : owner === "g" ? "border-qirmiz-light bg-qirmiz-light text-night" : "border-gold-light bg-gold-light text-night"
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(s.id)
                    }}
                    className={cn("group flex items-center gap-3 py-[3px] pr-2 pl-1.5 transition-colors duration-300", on ? "text-gold-light" : "text-vellum/75 hover:text-vellum")}
                  >
                    <span
                      className={cn(
                        "relative grid size-8 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500",
                        on ? onColor : passed ? "border-gold-light/60 bg-lapis-deep text-gold-light" : "border-gold-light/25 bg-night text-sky/70 group-hover:border-gold-light/60",
                      )}
                    >
                      {on && (
                        <svg aria-hidden="true" viewBox="0 0 40 40" className="rail-star absolute -inset-[7px] size-[46px] text-gold-light/70" fill="none" stroke="currentColor" strokeWidth="1">
                          <polygon points={starPoints(20, 20, 19.5, 15.5)} />
                        </svg>
                      )}
                      <Icon className="relative size-[15px]" strokeWidth={1.6} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="label !tracking-[0.16em]">{s.label}</span>
                      <span className={cn("term text-[0.86rem]", on ? "text-gold-light/80" : "text-sky/70")}>{s.term}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mx-4 border-t border-gold-light/25 py-4">
          <div className="flex items-baseline justify-between">
            <span className="label text-sky/80">Bo‘lim</span>
            <span className="text-[0.95rem] text-gold-light">
              <span className="tnum">{active + 1}</span> <span className="text-sky/70">/ {SECTIONS.length}</span>
              <span className="arab ml-2 text-sky/60">{arabicDigits(active + 1)}</span>
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-gold-light/20">
            <div className="h-px bg-gold-light transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
          {PRESENTER.name && <p className="mt-4 text-sm text-vellum">{PRESENTER.name}</p>}
          {PRESENTER.group && <p className="text-xs text-sky/80">{PRESENTER.group}</p>}
          <p className="mt-3 text-[0.78rem] leading-snug text-sky/70">
            <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> qadam · <kbd className="font-sans">F</kbd> to‘liq ekran · <kbd className="font-sans">?</kbd> yordam
          </p>
        </div>
      </aside>

      {/* Narrow screens: a slim night bar instead of the rail */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 bg-night px-4 text-vellum lg:hidden">
        <Mark className="size-7" light />
        <span className="label">{SECTIONS[active].label}</span>
        <span className="tnum ml-auto text-sm text-gold-light">
          {active + 1} / {SECTIONS.length}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold-light" style={{ width: `${progress * 100}%` }} />
      </header>
    </>
  )
}
