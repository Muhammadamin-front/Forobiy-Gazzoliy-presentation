import { Corners, StarRule } from "@/components/Ornament"
import CardFlip from "@/components/ui/card-flip"
import { WordRise } from "@/components/ui/word-rise"
import { RUKN, UNVON } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

/** The alchemy: base copper in the crucible, gold drawn out of it. */
function Crucible() {
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" className="size-[min(300px,34svh)]" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="120" cy="120" r="112" stroke="var(--color-line)" strokeDasharray="2 6" />
      {/* copper: the base self */}
      <circle cx="62" cy="168" r="22" fill="color-mix(in oklab, #b0643a 30%, transparent)" stroke="#b0643a" strokeWidth="1.6" />
      <text x="62" y="173" textAnchor="middle" fontSize="13" fill="#7a3f20" fontFamily="var(--font-sans)">mis</text>
      {/* gold: the purified heart */}
      <circle cx="178" cy="72" r="26" fill="color-mix(in oklab, var(--color-gold-light) 45%, transparent)" stroke="var(--color-gold)" strokeWidth="1.8" />
      <text x="178" y="77" textAnchor="middle" fontSize="13" fill="#6d4f16" fontFamily="var(--font-sans)">oltin</text>
      <path className="draw" pathLength={1} d="M84 150 C 110 128, 128 110, 152 88" stroke="var(--color-qirmiz)" strokeWidth="1.8" />
      <path d="M146 84 L154 86 L150 94" stroke="var(--color-qirmiz)" strokeWidth="1.8" />
      {/* the heart in the middle of the transmutation */}
      <path
        d="M120 132 C 104 120, 98 106, 108 98 C 114 94, 119 97, 120 102 C 121 97, 126 94, 132 98 C 142 106, 136 120, 120 132 Z"
        fill="var(--color-qirmiz)"
        opacity="0.9"
      />
    </svg>
  )
}

export function Gazzoliy() {
  return (
    <section id="gazzoliy" aria-label="G‘azzoliy: Kimyoi saodat">
      {/* 1 — the work and its metaphor */}
      <div data-stop className="slide laid py-20">
        <div className="wrap-page grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="label text-qirmiz" data-rev>
              G‘azzoliy · asar
            </p>
            <WordRise as="h2" className="section-title mt-4 text-ink" text="«Kimyoi saodat»" />
            <p className="arab mt-2 text-left text-[clamp(1.6rem,2.4vw,2.3rem)] text-qirmiz/80" dir="rtl" data-rev style={delay(120)}>
              كيمياى سعادت
            </p>
            <p className="lede mt-6" data-rev style={delay(220)}>
              «Saodat kimyosi». Fors tilida, umrining oxirida (~1105) keng xalq uchun yozilgan. Unda «Ihyo ulum id-din»ning mohiyati qisqa va tushunarli bayon qilinadi.
            </p>
            <blockquote className="mt-10 border-l-2 border-qirmiz pl-6" data-rev style={delay(340)}>
              <p className="disp text-[clamp(1.6rem,2.6vw,2.5rem)] leading-tight text-ink">
                Kimyo misni oltinga aylantirgani kabi, bu ilm qalbni past sifatlardan poklab, oliy sifatlarga yetkazadi.
              </p>
              <footer className="term mt-3 text-muted">Kitob nomining ma’nosi, mazmunan</footer>
            </blockquote>
          </div>
          <div className="frame relative grid place-items-center bg-vellum p-8" data-rev data-words="" style={delay(200)}>
            <Corners />
            <Crucible />
            <p className="term mt-2 text-center text-[1.15rem] text-muted">nafs → poklanish → saodat</p>
          </div>
        </div>
      </div>

      {/* 2 — the four discourses that open the book */}
      <div data-stop className="slide py-20" style={{ background: "var(--color-paper-2)" }}>
        <div className="wrap-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-qirmiz" data-rev>
                G‘azzoliy · to‘rt unvon
              </p>
              <WordRise as="h2" className="section-title mt-3 !text-[clamp(2rem,4vw,3.8rem)] text-ink" text="Saodat kimyosining to‘rt unsuri" />
            </div>
            <p className="lede" data-rev style={delay(200)}>
              Kartani bosing — orqasida izoh.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {UNVON.map((u, i) => (
              <div key={u.name} data-rev style={delay(100 * i)}>
                <CardFlip {...u} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 — the four pillars of ten principles */}
      <div data-stop className="slide laid py-20">
        <div className="wrap-page">
          <div className="grid items-end gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
            <p className="disp text-[clamp(7rem,16vw,14rem)] leading-[0.8] text-qirmiz" data-rev>
              4×10
            </p>
            <div>
              <p className="label text-qirmiz" data-rev>
                G‘azzoliy · to‘rt rukn
              </p>
              <WordRise as="h2" className="section-title mt-3 !text-[clamp(2rem,4vw,3.8rem)] text-ink" text="Amaliy yo‘l: 40 asl" />
              <p className="lede mt-4" data-rev style={delay(200)}>
                Kitobning asosiy qismi to‘rt ruknga, har bir rukn o‘nta aslga bo‘lingan: ikkitasi — tashqi amal, ikkitasi — ichki qalb holati.
              </p>
            </div>
          </div>
          <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-4">
            {RUKN.map((r, i) => (
              <li
                key={r.name}
                className={cn("flex min-h-[220px] flex-col p-6", r.tone === "dark" ? "bg-ink text-vellum" : r.tone === "gold" ? "bg-gold-light/40" : "bg-vellum")}
                data-rev
                style={delay(110 * i)}
              >
                <span className={cn("label", r.tone === "dark" ? "text-qirmiz-light" : "text-qirmiz")}>
                  {i + 1}-rukn · {i < 2 ? "tashqi" : "ichki"}
                </span>
                <span className="disp mt-3 text-[2.1rem]">{r.name}</span>
                <span className={cn("mt-2 leading-snug", r.tone === "dark" ? "text-vellum/80" : "text-muted")}>{r.text}</span>
                <span className={cn("disp mt-auto pt-4 text-[1.6rem]", r.tone === "dark" ? "text-gold-light" : "text-gold")}>10 asl</span>
              </li>
            ))}
          </ol>
          <StarRule className="mt-12" />
        </div>
      </div>
    </section>
  )
}
