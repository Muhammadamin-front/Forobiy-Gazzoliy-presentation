import { Corners, StarRule, starPoints } from "@/components/Ornament"
import { CoverFlow } from "@/components/ui/coverflow"
import { WordRise } from "@/components/ui/word-rise"
import { CITIES, EMANATION, RULER_QUALITIES } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

type Variant = (typeof CITIES)[number]["variant"]

/** One city, drawn as the state of its star: whole, scattered, hollow, cracked or turned. */
function CityStar({ variant }: { variant: Variant }) {
  const gold = "var(--color-gold-light)"
  const sky = "var(--color-sky)"
  const r = 70
  const inner = 52
  // The eight rays of the star as separate kites, so a city can scatter or split them.
  const kites = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 - 90) * (Math.PI / 180)
    const b1 = a - Math.PI / 8
    const b2 = a + Math.PI / 8
    const p = (rr: number, t: number) => `${(rr * Math.cos(t)).toFixed(1)},${(rr * Math.sin(t)).toFixed(1)}`
    return { a, d: `M0,0 L${p(inner, b1)} L${p(r, a)} L${p(inner, b2)} Z` }
  })
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className="size-[min(190px,24svh)] overflow-visible" fill="none" strokeLinejoin="round">
      <circle r="92" stroke={sky} strokeOpacity="0.25" strokeDasharray="2 5" />
      {variant === "whole" && (
        <>
          <polygon points={starPoints(0, 0, r, inner)} stroke={gold} strokeWidth="1.6" fill="color-mix(in oklab, var(--color-gold-light) 14%, transparent)" />
          <polygon points={starPoints(0, 0, 34, 25, 8, -67.5)} stroke={gold} strokeWidth="1" />
          <circle r="8" fill={gold} />
        </>
      )}
      {variant === "scattered" &&
        kites.map((k, i) => (
          <path
            key={i}
            d={k.d}
            stroke={sky}
            strokeWidth="1.2"
            transform={`translate(${(Math.cos(k.a) * (14 + (i % 3) * 9)).toFixed(1)} ${(Math.sin(k.a) * (14 + ((i + 1) % 3) * 9)).toFixed(1)}) rotate(${(i % 2 ? 1 : -1) * (8 + i * 3)})`}
          />
        ))}
      {variant === "hollow" && (
        <>
          <polygon points={starPoints(0, 0, r, inner)} stroke={gold} strokeWidth="1.4" strokeDasharray="5 6" />
          <circle r="8" stroke={sky} strokeWidth="1.2" />
        </>
      )}
      {variant === "cracked" && (
        <>
          <g transform="translate(-5 -3)" clipPath="url(#halfL)">
            <polygon points={starPoints(0, 0, r, inner)} stroke={gold} strokeWidth="1.5" />
          </g>
          <g transform="translate(9 12) rotate(9)" clipPath="url(#halfR)">
            <polygon points={starPoints(0, 0, r, inner)} stroke={sky} strokeWidth="1.5" />
          </g>
          <defs>
            <clipPath id="halfL">
              <path d="M-100,-100 L18,-100 L-6,-10 L14,8 L-12,100 L-100,100 Z" />
            </clipPath>
            <clipPath id="halfR">
              <path d="M18,-100 L100,-100 L100,100 L-12,100 L14,8 L-6,-10 Z" />
            </clipPath>
          </defs>
          <path d="M18,-80 L-6,-10 L14,8 L-12,80" stroke="var(--color-qirmiz-light)" strokeWidth="1.2" />
        </>
      )}
      {variant === "turned" && (
        <>
          <polygon points={starPoints(0, 0, r, inner)} stroke={sky} strokeOpacity="0.35" strokeWidth="1" />
          <polygon points={starPoints(14, -10, r * 0.92, inner * 0.6, 8, -72)} stroke={gold} strokeWidth="1.4" />
          <circle cx="22" cy="-16" r="6" fill="var(--color-qirmiz-light)" />
        </>
      )}
    </svg>
  )
}

export function Forobiy() {
  return (
    <section id="forobiy" aria-label="Forobiy: Siyosat falsafasi">
      {/* 1 — the work and its cosmology: being flows down from the First Cause to matter */}
      <div data-stop className="slide on-lapis py-20">
        <div className="wrap-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <div>
            <p className="label text-sky" data-rev>
              Forobiy · asar
            </p>
            <WordRise as="h2" className="section-title mt-4 text-vellum" text="«Siyosat falsafasi»" />
            <p className="lede mt-6 !text-vellum/80" data-rev style={delay(200)}>
              Davlat tuzilishi, rahbarning vazifalari va jamiyat taraqqiyoti haqidagi asar. Uning g‘oyalari «Fozil odamlar shahri» va «Fuqarolik siyosati» bilan bir butunlikni tashkil
              etadi.
            </p>
            <blockquote className="mt-10 border-l-2 border-gold-light pl-6" data-rev style={delay(340)}>
              <p className="disp text-[clamp(1.6rem,2.6vw,2.5rem)] leading-tight text-vellum">Inson yolg‘iz o‘zi kamolotga yeta olmaydi — buning uchun unga jamiyat kerak.</p>
              <footer className="term mt-3 text-sky">Forobiy g‘oyasi, mazmunan</footer>
            </blockquote>
            <p className="mt-8 max-w-[52ch] leading-relaxed text-vellum/85" data-rev style={delay(440)}>
              Forobiy uchun <span className="text-gold-light">saodat</span> — inson aqlining kamolga yetib, faol aqlga yaqinlashishi. Siyosatning vazifasi — odamlarni shu saodatga
              birgalikda yetaklash.
            </p>
          </div>

          <figure className="frame frame--light relative p-6 lg:p-8" data-rev style={delay(200)}>
            <Corners className="text-gold-light" />
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="disp text-[1.5rem] text-vellum">Borliq zinapoyasi</span>
              <span className="term text-sky">fayz — «toshib chiqish»</span>
            </figcaption>
            <ol className="relative mt-5">
              <svg aria-hidden="true" className="absolute top-4 bottom-4 left-[15px] h-[calc(100%-2rem)] w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                <line x1="1" y1="0" x2="1" y2="100" stroke="var(--color-gold-light)" strokeOpacity="0.3" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line className="fayz-line" x1="1" y1="0" x2="1" y2="100" stroke="var(--color-gold-light)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              {EMANATION.map((e, i) => (
                <li key={e.name} className="relative flex items-start gap-4 py-2.5" data-rev style={delay(260 + i * 90)}>
                  <span
                    className={cn(
                      "relative z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border text-[0.8rem]",
                      i < 3 ? "border-gold-light bg-gold-light text-night" : "border-sky/60 bg-lapis-deep text-sky",
                    )}
                    style={{ opacity: 1 - i * 0.08 }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[1.15rem] font-medium text-vellum">
                      {e.name} <span className="term ml-1 text-[1rem] text-sky">{e.term}</span>
                    </p>
                    <p className="text-[0.95rem] leading-snug text-vellum/70">{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="note mt-4 !text-vellum/60">Birinchi uchtasi — jismsiz; keyingi uchtasi jism bilan bog‘liq.</p>
          </figure>
        </div>
      </div>

      {/* 2 — five cities: the virtuous one and its four corruptions */}
      <div data-stop className="slide on-night py-16">
        <div className="wrap-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-sky" data-rev>
                Forobiy · shaharlar
              </p>
              <WordRise as="h2" className="section-title mt-3 !text-[clamp(2rem,4vw,3.8rem)] text-vellum" text="Fozil shahar va uning ziddlari" />
            </div>
            <p className="lede !text-vellum/75" data-rev style={delay(200)}>
              Shaharlar boshqaruv shakliga ko‘ra emas, qanday maqsadga intilishiga ko‘ra ajratiladi.
            </p>
          </div>
          <CoverFlow
            className="mt-4"
            items={CITIES.map((c) => ({ art: <CityStar variant={c.variant} />, title: c.name, sub: c.term, desc: c.desc, accent: c.variant === "whole" }))}
          />
        </div>
      </div>

      {/* 3 — the first ruler's twelve qualities */}
      <div data-stop className="slide laid py-20">
        <div className="wrap-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
            <div>
              <p className="label text-lapis" data-rev>
                Forobiy · rahbar
              </p>
              <WordRise as="h2" className="section-title mt-3 !text-[clamp(2rem,4vw,3.8rem)] text-ink" text="Birinchi rahbarning 12 fazilati" />
              <p className="lede mt-6" data-rev style={delay(200)}>
                Fozil shahar faqat fozil rahbar bilan quriladi. Forobiy uni faylasuf va donishmand deb biladi: tug‘ma qobiliyat va tarbiya birlashgan inson.
              </p>
              <p className="note mt-6" data-rev style={delay(300)}>
                Barcha fazilatlar bir kishida kam uchragani uchun Forobiy ularni bir necha kishi birgalikda — kengash shaklida — mujassam etishi mumkinligini ham aytadi.
              </p>
            </div>
            <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {RULER_QUALITIES.map((q, i) => (
                <li key={q} className="flex flex-col gap-2 bg-vellum p-4" data-rev style={delay(60 * i)}>
                  <span className="disp text-[1.9rem] leading-none text-lapis">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.02rem] leading-snug text-ink">{q}</span>
                </li>
              ))}
            </ol>
          </div>
          <StarRule className="mt-12" />
        </div>
      </div>
    </section>
  )
}
