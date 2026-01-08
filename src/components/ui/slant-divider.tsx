"use client";

import { cn } from "@/lib/utils";

interface SlantDividerProps {
  className?: string;
}

export function SlantDivider({ className }: SlantDividerProps) {
  return (
    <div className={cn("absolute top-0 left-0 w-full overflow-hidden leading-none z-20 rotate-180", className)}>
      <svg
        className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          className="fill-background"
        />
      </svg>
    </div>
  );
}
