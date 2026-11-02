"use client"

/**
 * Card Flip (flip-card.md, kokonutui — MIT) turned into a folio of
 * «Kimyoi saodat»: the front carries the discourse's number, name and Arabic
 * heading on vellum, the back its explanation on cinnabar. Flips on hover,
 * on click (for a presenter without hover) and on keyboard focus + Enter.
 */

import { Repeat2 } from "lucide-react"
import { useState } from "react"
import { Corners, StarRule } from "@/components/Ornament"
import { cn } from "@/lib/utils"

export interface CardFlipProps {
  n: string
  name: string
  arabic: string
  front: string
  text: string
  className?: string
}

export default function CardFlip({ n, name, arabic, front, text, className }: CardFlipProps) {
  const [hover, setHover] = useState(false)
  const [pinned, setPinned] = useState(false)
  const flipped = hover || pinned

  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={`${n}-unvon, ${name}. ${text}`}
      className={cn("group relative h-[360px] w-full cursor-pointer text-left [perspective:2000px]", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setPinned((v) => !v)}
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          "transition-[transform] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
      >
        <div className="frame absolute inset-0 flex flex-col bg-vellum p-6 [backface-visibility:hidden]">
          <Corners />
          <div className="flex items-start justify-between gap-3">
            <span className="label text-qirmiz">{n}-unvon</span>
            <Repeat2 aria-hidden="true" className="size-4 shrink-0 text-gold transition-transform duration-500 group-hover:-rotate-12" />
          </div>
          <p className="arab mt-6 text-center text-[2.1rem] text-qirmiz/85">{arabic}</p>
          <div className="mt-auto">
            <StarRule className="mb-4" />
            <h3 className="disp text-[2rem] text-ink">{name}</h3>
            <p className="term mt-1 text-[1.1rem] text-muted">{front}</p>
          </div>
        </div>

        <div className="frame frame--light absolute inset-0 flex flex-col bg-qirmiz p-6 text-vellum [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="label text-gold-light">{n}-unvon</span>
          <span className="disp mt-2 text-[1.6rem]">{name}</span>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-vellum/95">{text}</p>
          <span className="arab mt-auto text-[1.3rem] text-gold-light">{arabic}</span>
        </div>
      </div>
    </button>
  )
}
