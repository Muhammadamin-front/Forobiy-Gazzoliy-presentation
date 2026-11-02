import { Star } from "@/components/Ornament"
import { WordRise } from "@/components/ui/word-rise"
import { COMPARE, TAHOFUT } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Taqqoslash() {
  return (
    <section id="taqqoslash" aria-label="Farqlar" className="laid">
      {/* Two columns of one page: Forobiy on the left, G‘azzoliy on the right, the question on the axis */}
      <div data-stop className="slide py-20">
        <div className="wrap-page">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-gold pb-6 md:gap-10">
            <p className="disp text-right text-[clamp(1.5rem,3vw,2.8rem)] text-lapis">
              Forobiy <span className="arab ml-2 text-[0.7em] text-lapis/70">الفارابي</span>
            </p>
            <Star className="size-8 text-gold" />
            <p className="disp text-[clamp(1.5rem,3vw,2.8rem)] text-qirmiz">
              <span className="arab mr-2 text-[0.7em] text-qirmiz/70">الغزالي</span> G‘azzoliy
            </p>
          </div>
          <table className="w-full border-collapse sm:table-fixed">
            <caption className="sr-only">Forobiy va G‘azzoliy qarashlarining taqqoslanishi</caption>
            <thead className="sr-only">
              <tr>
                <th>Forobiy</th>
                <th>Masala</th>
                <th>G‘azzoliy</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r, i) => (
                <tr key={r.topic} className="border-b border-line/80 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:py-2" data-rev style={delay(50 * i)}>
                  <td className="w-[39%] py-3.5 pr-2 text-right text-[clamp(1rem,1.3vw,1.22rem)] text-lapis-deep max-sm:w-auto max-sm:py-1 sm:pr-5">{r.f}</td>
                  <th scope="row" className="w-[22%] px-1 py-3.5 text-center align-middle font-normal max-sm:order-first max-sm:col-span-2 max-sm:w-auto max-sm:py-1">
                    <span className="label block text-muted">{r.topic}</span>
                  </th>
                  <td className="w-[39%] py-3.5 pl-2 text-[clamp(1rem,1.3vw,1.22rem)] text-qirmiz max-sm:w-auto max-sm:py-1 sm:pl-5">{r.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The bridge between them: G‘azzoliy's critique names Forobiy directly */}
      <div data-stop className="slide on-night py-20">
        <div className="wrap-page">
          <p className="label text-qirmiz-light" data-rev>
            ~1095 · «Tahofut al-falosifa»
          </p>
          <WordRise as="h2" className="section-title mt-3 max-w-[22ch] text-vellum" text="G‘azzoliy Forobiyga javob beradi" />
          <p className="lede mt-5 !text-vellum/75" data-rev style={delay(180)}>
            «Faylasuflarning izchilsizligi» asarida G‘azzoliy Forobiy va Ibn Sino falsafasini {TAHOFUT.total} masala bo‘yicha tanqid qiladi. Ulardan uchtasini dinga eng zid deb
            hisoblaydi.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div className="flex items-end gap-6" data-rev style={delay(240)}>
              <p className="disp text-[clamp(7rem,14vw,12rem)] leading-[0.8] text-qirmiz-light">{TAHOFUT.total}</p>
              <div className="pb-2 text-vellum/80">
                <p className="text-[1.1rem]">masala</p>
                <p className="mt-2 text-sm">
                  <span className="text-gold-light">{TAHOFUT.meta}</span> — metafizika
                </p>
                <p className="text-sm">
                  <span className="text-gold-light">{TAHOFUT.nature}</span> — tabiiy fanlar
                </p>
              </div>
            </div>
            <ol className="grid gap-px border border-qirmiz-light/30 bg-qirmiz-light/30 md:grid-cols-3">
              {TAHOFUT.charges.map((c, i) => (
                <li key={c.title} className="bg-night p-5" data-rev style={delay(300 + i * 110)}>
                  <span className="disp text-[1.4rem] text-qirmiz-light">{i + 1}</span>
                  <h3 className="disp mt-1 text-[1.5rem] text-vellum">{c.title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-snug text-vellum/75">{c.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-12 max-w-[64ch] border-l-2 border-sky pl-6 text-[clamp(1.1rem,1.5vw,1.4rem)] leading-relaxed text-vellum" data-rev style={delay(500)}>
            Ammo G‘azzoliy falsafani butunlay rad etmadi: <span className="text-sky">mantiq va matematikani</span> foydali va dinga zid emas deb bildi, mantiqiy isbotni (burhon) bilim
            mezoni sifatida qabul qildi.
          </p>
        </div>
      </div>
    </section>
  )
}
