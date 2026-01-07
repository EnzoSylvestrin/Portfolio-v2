"use client";

import { motion } from "motion/react";
import { HeroCard } from "../hero-card";
import { Download, ArrowRight, ArrowDown, Linkedin } from "lucide-react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { AuroraBackground } from "../aurora-background";
import { SiGithub } from "@icons-pack/react-simple-icons";
// import { RadialGradientBackground } from "./radial-gradient-background";

export const HeroSection = () => {
  const t = useTranslations("hero");

  const adjectives = [
    t("adjectives.0"),
    t("adjectives.1"),
    t("adjectives.2"),
    t("adjectives.3"),
    t("adjectives.4"),
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 pt-16">

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)" }}
      />

      <AuroraBackground />
      {/* <RadialGradientBackground /> */}

      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 flex-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left space-y-6 lg:space-y-8"
        >
          <div className="flex flex-col gap-2">
            <span className="text-base md:text-lg font-bold tracking-[0.2em] text-primary pl-1">
              {t("greeting")}
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground drop-shadow-sm leading-none">
              Enzo
              <br />
              <span className="text-foreground/90">Sylvestrin</span>
            </h1>
          </div>

          <div className="space-y-6 lg:space-y-8 max-w-2xl">
            <h2 className="text-1xl md:text-2xl lg:text-3xl font-bold text-foreground">
              {t("role")}
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl font-medium">
              {t("description")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="https://github.com/EnzoSylvestrin" target="_blank" className="p-3 rounded-lg bg-card border border-primary/40 hover:bg-primary/20 hover:text-primary hover:border-primary/60 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <SiGithub className="w-5 h-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/enzo-sylvestrin-336b71221/" target="_blank" className="p-3 rounded-lg bg-card border border-primary/40 hover:bg-primary/20 hover:text-primary hover:border-primary/60 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <Linkedin className="w-5 h-5" />
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
