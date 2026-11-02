"use client"

/**
 * AuroraBackground (prompt-background-light.md), re-cut for the manuscript.
 * The aurora's mechanism is kept — a wide texture drifting slowly behind the
 * content on the `aurora` keyframes, faded out by a radial mask — but the
 * texture is a girih lattice of eight-pointed stars in hairline gold instead
 * of blurred colour bands.
 */

import { useMemo, type ReactNode } from "react"
import { starPoints } from "@/components/Ornament"
import { cn } from "@/lib/utils"

function girihTile(color: string) {
  const s = 120
  const star = (cx: number, cy: number) => `<polygon points="${starPoints(cx, cy, 34, 25)}" />`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><g fill="none" stroke="${color}" stroke-width="0.9">${star(0, 0)}${star(s, 0)}${star(0, s)}${star(s, s)}${star(s / 2, s / 2)}<path d="M0 ${s / 2} H${s} M${s / 2} 0 V${s}" stroke-dasharray="2 6"/></g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  color?: string
}

export const AuroraBackground = ({ className, children, showRadialGradient = true, color = "#d9b866", ...props }: AuroraBackgroundProps) => {
  const tile = useMemo(() => girihTile(color), [color])
  return (
    <div className={cn("relative isolate", className)} {...props}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-[length:240px_240px] bg-repeat opacity-60 motion-safe:animate-aurora",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_80%_20%,black_10%,transparent_70%)]",
          )}
          style={{ backgroundImage: tile }}
        />
      </div>
      {children}
    </div>
  )
}
