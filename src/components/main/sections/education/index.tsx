"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

import { useRef } from "react";
import { Timeline } from "@/components/ui/timeline";
import { EducationCard } from "./education-card";
import { Ripple } from "@/components/ui/ripple";

import educationData from "@/data/main/education.json";

export function EducationSection() {
  const t = useTranslations("education");
  const locale = useLocale() as "pt" | "en";
  const containerRef = useRef(null);

  const timelineData = educationData.map((edu) => ({
    title: edu.date[locale],
    content: <EducationCard education={edu} index={educationData.indexOf(edu)} />,
  }));

  return (
    <section
      id="educacao"
      ref={containerRef}
      className="w-full bg-background relative overflow-hidden py-24 md:py-32"
    >
      {/* Premium Dot Pattern Background - SVG Implementation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" className="fill-foreground" />
            </pattern>
            <mask id="fade-mask">
              <rect width="100%" height="100%" fill="url(#mask-gradient)" />
            </mask>
            <linearGradient id="mask-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="15%" stopColor="white" stopOpacity="1" />
              <stop offset="85%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" mask="url(#fade-mask)" />
        </svg>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] flex items-center justify-center">
        <Ripple mainCircleSize={300} mainCircleOpacity={0.10} numCircles={8} />
      </div>

      <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-background z-0 pointer-events-none" />

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("title")}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>

          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
