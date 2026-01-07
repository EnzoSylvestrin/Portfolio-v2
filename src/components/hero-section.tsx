"use client";

import { motion } from "motion/react";
import { ThemeAwareLightPillar } from "./theme-aware-light-pillar";
import { Github, Linkedin, Twitter, Download, ArrowRight, MapPin, ChevronDown, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";

const MorphingText = dynamic(() => import("@/components/ui/morphing-text").then((mod) => mod.MorphingText), {
  ssr: false,
});

export const HeroSection = () => {
  const t = useTranslations("hero");

  const adjectives = [
    t("adjectives.0"),
    t("adjectives.1"),
    t("adjectives.2"),
    t("adjectives.3"),
    t("adjectives.4")
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 pt-16">
      <ThemeAwareLightPillar />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)" }}
      />

      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 flex-1">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left space-y-6 lg:space-y-8"
        >
          <div className="space-y-4 md:space-y-3">
            <span className="text-base md:text-lg font-bold tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
              {t("greeting")}
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground drop-shadow-sm leading-none">
              Enzo
              <br />
              <span className="text-foreground/90">Sylvestrin</span>
            </h1>
          </div>

          <div className="space-y-6 lg:space-y-8 max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t("role")}
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl font-medium">
              {t("description")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="https://github.com/EnzoSylvestrin" target="_blank" className="p-3 rounded-lg bg-card border border-border/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com/in/enzo-sylvestrin" target="_blank" className="p-3 rounded-lg bg-card border border-border/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com/EnzoSylvestrin" target="_blank" className="p-3 rounded-lg bg-card border border-border/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-lg font-bold transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95 shadow-lg shadow-foreground/20"
            >
              {t("viewProjects")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3 bg-card/50 border border-foreground/20 text-foreground rounded-lg font-bold transition-all hover:bg-foreground hover:text-background hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              <Download className="w-4 h-4" />
              {t("downloadCv")}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:flex items-center justify-center lg:justify-end py-10"
        >
          <div className="relative group perspective-1000">
            <motion.div
              className="relative w-[300px] h-[400px] md:w-[380px] md:h-[480px] bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-between"
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

              <div className="flex items-center gap-6 mt-8 z-20" style={{ transform: "translateZ(30px)" }}>
                <span className="text-2xl opacity-80 cursor-default hover:opacity-100 transition-opacity" title="Next.js">▲</span>
                <span className="text-2xl opacity-80 text-[#61DAFB] cursor-default hover:opacity-100 transition-opacity" title="React">⚛</span>
                <span className="text-2xl opacity-80 text-[#3178C6] cursor-default hover:opacity-100 transition-opacity" title="TypeScript">TS</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 z-20 w-full px-4 mb-auto mt-8" style={{ transform: "translateZ(40px)" }}>

                <div className="text-center space-y-1">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                    21
                  </div>
                  <div className="text-xs font-medium text-foreground/80 uppercase tracking-widest">
                    {t("yearsOld")}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-foreground/70 mt-1 bg-background/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-foreground/10 font-medium shadow-sm">
                    <MapPin className="w-3 h-3" />
                    Jundiaí, SP - Brasil
                  </div>
                </div>

                <div className="flex items-center justify-between w-full gap-4 pt-6 border-t border-foreground/10">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-xl md:text-2xl font-bold text-primary">5+</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t("yrsXp")}</span>
                  </div>
                  <div className="h-8 w-px bg-foreground/10" />
                  <div className="flex flex-col items-center flex-1" title="Caffeine Level: High">
                    <span className="text-xl md:text-2xl font-bold text-primary">∞</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
                      {t("coffees")} <Coffee className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>

              <div
                className="absolute w-full bottom-10 left-0 z-20 flex justify-center"
                style={{ transform: "translateZ(60px)" }}
              >
                <MorphingText
                  texts={adjectives}
                  className="text-2xl md:text-3xl font-bold text-primary drop-shadow-md h-12 md:h-16 filter-none"
                />
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};
