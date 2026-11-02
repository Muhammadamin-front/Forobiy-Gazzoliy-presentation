import { Corners, Star } from "@/components/Ornament"
import { THINKERS } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

/** One folio per thinker: name, Arabic heading, epithet and a short passport. */
function Folio({ who }: { who: "f" | "g" }) {
  const t = THINKERS[who]
  const f = who === "f"
  return (
    <article className="frame relative flex flex-col bg-vellum p-[clamp(1.4rem,2.6vw,2.4rem)]" data-rev style={delay(f ? 0 : 180)}>
      <Corners />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn("label", f ? "text-lapis" : "text-qirmiz")}>{t.years}</p>
          <h3 className={cn("disp mt-2 text-[clamp(2.4rem,4vw,3.8rem)]", f ? "text-lapis" : "text-qirmiz")}>{t.short}</h3>
          <p className="mt-1 text-[0.95rem] text-muted">{t.full}</p>
        </div>
        <span className={cn("arab text-[clamp(1.8rem,3vw,2.8rem)]", f ? "text-lapis/80" : "text-qirmiz/80")}>{t.arabic}</span>
      </div>

      <div className={cn("mt-6 border-y py-4", f ? "border-lapis/25" : "border-qirmiz/25")}>
        <p className="disp text-[1.6rem] text-ink">{t.title}</p>
        <p className="term text-[1.05rem] text-muted">{t.titleMeaning}</p>
      </div>

      <dl className="mt-2">
        {t.rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[9.5rem_1fr] gap-4 border-b border-line/60 py-2.5 last:border-0 max-sm:grid-cols-1 max-sm:gap-0">
            <dt className="text-sm text-muted">{r.k}</dt>
            <dd className="text-[1.02rem] text-ink">{r.v}</dd>
          </div>
        ))}
      </dl>

      <p className={cn("mt-auto flex items-start gap-3 pt-5 text-[1.12rem] leading-snug", f ? "text-lapis" : "text-qirmiz")}>
        <Star className="mt-1 size-4" fill />
        {t.idea}
      </p>
    </article>
  )
}

export function Allomalar() {
  return (
    <section id="allomalar" data-stop aria-label="Allomalar" className="laid slide py-20">
      <div className="wrap-page">
        <div className="flex flex-wrap items-end justify-between gap-6" data-rev>
          <h2 className="section-title text-ink">Ikki alloma</h2>
          <p className="lede">Biri X asrda Bag‘dod va Halabda, ikkinchisi XI asrda Bag‘dod va Tusda ijod qilgan. Ular orasida bir asrdan ko‘proq vaqt bor.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Folio who="f" />
          <Folio who="g" />
        </div>
      </div>
    </section>
  )
}
