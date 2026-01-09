"use client";

import { motion } from "motion/react";
import { Download, ArrowRight, ArrowDown } from "lucide-react";

import { useTranslations, useLocale } from "next-intl";

import { SocialLinks } from "@/components/ui/social-links"; 

import { HighlightedText } from "@/lib/highlight-parser"; 

import { AuroraBackground } from "./backgrounds/aurora";
import { HeroCard } from "./card";

export const HeroSection = () => {
  const t = useTranslations("hero");
  const locale = useLocale();

  const adjectives = [
    t("adjectives.0"),
    t("adjectives.1"),
    t("adjectives.2"),
    t("adjectives.3"),
    t("adjectives.4"),
  ];

  return (
    <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 lg:px-8">

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#53535312_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)" }}
      />

      <AuroraBackground />

      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 xl:gap-16 items-center relative z-10 flex-1">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-start text-left space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8"
        >
          <div className="flex flex-col gap-2">
            <span className="text-base md:text-lg font-bold tracking-[0.2em] text-primary pl-1">
              {t("greeting")}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-foreground drop-shadow-sm leading-none">
              Enzo
              <br />
              <span className="text-foreground/90">Sylvestrin</span>
            </h1>
          </div>

          <div className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8 max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-foreground">
              {t("role")}
            </h2>
            <p className="text-base md:text-lg lg:text-lg xl:text-xl text-foreground/80 leading-relaxed max-w-xl font-medium">
              <HighlightedText text={t("description")} boldOnly />
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SocialLinks variant="button" iconSize="md" includeWhatsapp={true} className="gap-4" />
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById('projects');
                if (section) {
                  const headerOffset = 80;
                  const elementPosition = section.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="group inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-foreground text-background rounded-lg font-bold transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95 shadow-lg shadow-foreground/20"
            >
              {t("viewProjects")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={`/EnzoSylvestrin-${locale}.pdf`}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-card/50 border border-foreground/20 text-foreground rounded-lg font-bold transition-all hover:bg-foreground hover:text-background hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              <Download className="w-4 h-4" />
              {t("downloadCv")}
            </a>
          </div>
        </motion.div>

        <HeroCard adjectives={adjectives} />
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-6 h-6 text-foreground" />
      </motion.div>
    </section>
  );
};
