"use client"

import { cn } from "@/lib/utils"

interface WaveDividerProps {
  className?: string
  flip?: boolean
}

export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <div className={cn("w-full relative", className)}>
      <svg
        className={cn(
          "w-full h-auto",
          flip && "rotate-180"
        )}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bottom wave - subtle */}
        <path
          d="M0,64 C320,110 420,10 740,64 C1060,118 1080,20 1200,64 L1200,120 L0,120 Z"
          className="fill-primary/8"
        />
        
        {/* Middle wave */}
        <path
          d="M0,32 C240,80 360,0 600,48 C840,96 960,16 1200,64 L1200,120 L0,120 Z"
          className="fill-primary/15"
        />
        
        {/* Top wave - most prominent */}
        <path
          d="M0,16 C300,80 400,0 700,64 C1000,128 1100,48 1200,96 L1200,120 L0,120 Z"
          className="fill-background"
        />
        
        {/* Accent line on top edge */}
        <path
          d="M0,16 C300,80 400,0 700,64 C1000,128 1100,48 1200,96"
          className="stroke-primary/30"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  )
}
