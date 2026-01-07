"use client";

import { motion } from "motion/react";
import { MapPin, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const MorphingText = dynamic(() => import("@/components/ui/morphing-text").then((mod) => mod.MorphingText), {
  ssr: false,
});

interface HeroCardProps {
  adjectives: string[];
}

export const HeroCard = ({ adjectives }: HeroCardProps) => {
  const t = useTranslations("hero");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative hidden lg:flex items-center justify-center lg:justify-end py-10"
    >
      <div className="relative group perspective-1000">
        <motion.div
          className="relative w-[320px] h-[420px] md:w-[400px] md:h-[500px] bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-between will-change-transform"
          style={{
            transform: "rotateY(-12deg) rotateX(5deg)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: [-12, -8, -12],
            rotateX: [5, 2, 5],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none rounded-3xl" />

          {/* Tech Stack Icons */}
          <div className="flex items-center gap-6 mt-6 z-20" style={{ transform: "translateZ(30px)" }}>
            <span className="text-3xl opacity-80 cursor-default hover:opacity-100 transition-opacity" title="Next.js">▲</span>
            <span className="text-3xl opacity-80 text-[#61DAFB] cursor-default hover:opacity-100 transition-opacity" title="React">⚛</span>
            <span className="text-3xl opacity-80 text-[#3178C6] cursor-default hover:opacity-100 transition-opacity" title="TypeScript">TS</span>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center gap-10 z-20 w-full px-4 mb-auto mt-6" style={{ transform: "translateZ(40px)" }}>

            {/* Age & Location */}
            <div className="text-center space-y-3">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                21
              </div>
              <div className="text-sm font-medium text-foreground/80 uppercase tracking-widest">
                {t("yearsOld")}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-foreground/70 mt-3 bg-background/40 px-4 py-2 rounded-full backdrop-blur-sm border border-foreground/10 font-medium shadow-sm">
                <MapPin className="w-3.5 h-3.5" />
                Jundiaí, SP - Brasil
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between w-full gap-8 pt-6 border-t border-foreground/10">
              <div className="flex flex-col items-center flex-1 gap-2">
                <span className="text-2xl md:text-3xl font-bold text-primary">5+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t("yrsXp")}</span>
              </div>
              <div className="h-10 w-px bg-foreground/10" />
              <div className="flex flex-col items-center flex-1 gap-2" title="Caffeine Level: High">
                <span className="text-2xl md:text-3xl font-bold text-primary">∞</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
                  {t("coffees")} <Coffee className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

          <div
            className="w-full pt-6 z-20 flex justify-center"
            style={{ transform: "translateZ(60px)" }}
          >
            <MorphingText
              texts={adjectives}
              className="text-2xl md:text-3xl font-bold text-primary h-12 md:h-16"
            />
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};
