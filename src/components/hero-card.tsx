"use client";

import { motion } from "motion/react";
import { MapPin, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { SiNodedotjs, SiReact, SiLaravel } from "@icons-pack/react-simple-icons";

const MorphingText = dynamic(() => import("@/components/ui/morphing-text").then((mod) => mod.MorphingText), {
  ssr: false,
});

interface HeroCardProps {
  adjectives: string[];
}

export const HeroCard = ({ adjectives }: HeroCardProps) => {
  const t = useTranslations("hero");

  const yearStarted = 2021;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - yearStarted;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative hidden lg:flex items-center justify-center lg:justify-end py-10"
    >
      <div className="relative group perspective-1000">
        <motion.div
          className="relative w-[320px] h-[420px] md:w-[400px] md:h-[500px] bg-card/50 border border-border/50 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-between"
          style={{
            transform: "rotateY(-12deg) rotateX(5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center gap-5 mt-6 z-20" style={{ transform: "translateZ(30px)" }}>
            <SiNodedotjs 
              className="w-8 h-8 opacity-80 cursor-default text-primary hover:opacity-100 transition-opacity" 
              title="Node.js"
            />
            <SiReact 
              className="w-8 h-8 opacity-80 cursor-default text-primary hover:opacity-100 transition-opacity" 
              title="React"
            />
            <SiLaravel 
              className="w-8 h-8 opacity-80 cursor-default text-primary hover:opacity-100 transition-opacity" 
              title="Laravel"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-10 z-20 w-full px-4 mb-auto mt-6" style={{ transform: "translateZ(40px)" }}>
            <div className="text-center space-y-3">
              <div className="text-6xl md:text-7xl font-bold text-foreground">
                21
              </div>
              <div className="text-sm font-medium text-foreground/90 uppercase tracking-widest">
                {t("yearsOld")}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-foreground mt-3 bg-background/60 px-4 py-2 rounded-full border border-foreground/10 font-medium shadow-sm">
                <MapPin className="w-3.5 h-3.5" />
                Jundiaí, SP - Brasil
              </div>
            </div>

            <div className="flex items-center justify-between w-full gap-8 pt-6 border-t border-foreground/10">
              <div className="flex flex-col items-center flex-1 gap-2">
                <span className="text-2xl md:text-3xl font-bold text-primary">{yearsOfExperience}+</span>
                <span className="text-xs text-foreground/70 uppercase tracking-wider font-semibold">{t("yrsXp")}</span>
              </div>
              <div className="h-10 w-px bg-foreground/10" />
              <div className="flex flex-col items-center flex-1 gap-2" title="Caffeine Level: High">
                <span className="text-2xl md:text-3xl font-bold text-primary">∞</span>
                <span className="text-xs text-foreground/70 uppercase tracking-wider font-semibold flex items-center gap-1">
                  {t("coffees")} <Coffee className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div
            className="w-full pt-10 z-20 flex justify-center"
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
