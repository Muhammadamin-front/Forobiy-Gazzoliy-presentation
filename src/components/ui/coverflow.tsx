"use client"

/**
 * 3D CoverFlow carousel (prompt.md, 21st.dev) re-cut as a folio of Forobiy's
 * cities: each plate is an illuminated page whose star is whole, scattered,
 * hollow, cracked or turned, on a night-lapis ground. Changes from the source:
 * plates carry drawn art instead of photographs, the window-wide ←/→ listener
 * is removed (those keys belong to the presenter), the arrows are real
 * buttons, offsets scale with the stage width, and reduced motion turns
 * autoplay off.
 */

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface CoverItem {
  art: ReactNode
  title: string
  sub: string
  desc: string
  accent?: boolean
}

export function CoverFlow({ items, autoplayDelay = 6000, className }: { items: CoverItem[]; autoplayDelay?: number; className?: string }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [unit, setUnit] = useState(285)
  const stageRef = useRef<HTMLDivElement>(null)
  const touchX = useRef(0)
  const total = items.length

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || hovered || total <= 1) return
    const id = setInterval(next, autoplayDelay)
    return () => clearInterval(id)
  }, [autoplayDelay, hovered, next, total])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setUnit(Math.min(300, Math.max(120, e.contentRect.width * 0.24))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const item = items[current]

  return (
    <div
      className={cn("relative isolate overflow-hidden py-6 select-none", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const d = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(d) > 45) (d < 0 ? next : prev)()
      }}
    >
      <div ref={stageRef} className="relative mx-auto flex h-[min(470px,52svh)] w-full max-w-6xl items-center justify-center [perspective:1400px]">
        {items.map((it, idx) => {
          const off = (idx - current + total) % total
          let t = "translateX(0) scale(0.4)"
          let o = 0
          let z = 0
          let f = "brightness(0.4)"
          if (off === 0) (t = "translateX(0) scale(1)"), (o = 1), (z = 30), (f = "none")
          else if (off === 1) (t = `translateX(${unit}px) scale(0.82) rotateY(-26deg)`), (o = 0.7), (z = 20), (f = "brightness(0.65)")
          else if (off === 2) (t = `translateX(${unit * 1.78}px) scale(0.66) rotateY(-40deg)`), (o = 0.4), (z = 10), (f = "brightness(0.5)")
          else if (off === total - 1) (t = `translateX(${-unit}px) scale(0.82) rotateY(26deg)`), (o = 0.7), (z = 20), (f = "brightness(0.65)")
          else if (off === total - 2) (t = `translateX(${-unit * 1.78}px) scale(0.66) rotateY(40deg)`), (o = 0.4), (z = 10), (f = "brightness(0.5)")
          const center = off === 0
          return (
            <figure
              key={it.title}
              onClick={() => !center && setCurrent(idx)}
              aria-hidden={!center}
              className={cn(
                "absolute m-0 flex h-[min(450px,50svh)] w-[min(310px,62vw)] flex-col overflow-hidden border bg-lapis-deep outline-1 outline-offset-[-8px] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                it.accent ? "border-gold-light outline-gold-light/50" : "border-sky/40 outline-sky/25",
              )}
              style={{ transform: t, opacity: o, zIndex: z, filter: f, cursor: center ? "default" : "pointer" }}
            >
              <div className="grid flex-1 place-items-center p-6">{it.art}</div>
              <figcaption className={cn("p-6 pt-0 text-center transition-[opacity,transform] duration-500", center ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
                <p className={cn("disp text-[1.7rem]", it.accent ? "text-gold-light" : "text-vellum")}>{it.title}</p>
                <p className="term mt-0.5 text-sky">{it.sub}</p>
                <span aria-hidden="true" className="mx-auto my-3 block h-px w-10 bg-gold-light" />
                <p className="text-[0.98rem] leading-snug text-vellum/90">{it.desc}</p>
              </figcaption>
            </figure>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-6">
        <button type="button" onClick={prev} aria-label="Oldingi shahar" className="grid size-11 place-items-center border border-gold-light/50 text-gold-light transition-colors hover:bg-gold-light hover:text-night">
          <ChevronLeft className="size-5" strokeWidth={1.6} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Shaharlar">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={it.title}
              onClick={() => setCurrent(i)}
              className={cn("h-2 w-2 rotate-45 transition-all duration-500", i === current ? "bg-gold-light" : "bg-vellum/30 hover:bg-vellum/60")}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Keyingi shahar" className="grid size-11 place-items-center border border-gold-light/50 text-gold-light transition-colors hover:bg-gold-light hover:text-night">
          <ChevronRight className="size-5" strokeWidth={1.6} />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {item.title}, {item.sub}
      </p>
    </div>
  )
}
