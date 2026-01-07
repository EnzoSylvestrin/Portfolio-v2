"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const TECHNOLOGIES = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind", icon: "🌊" },
  { name: "NestJS", icon: "🦁" },
  { name: "Docker", icon: "🐳" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "AWS", icon: "☁️" },
  { name: "Figma", icon: "🎨" },
];

export const TechStack = () => {
  const t = useTranslations("techStack");

  return (
    <section className="py-20 w-full overflow-hidden bg-background/50 border-y border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80">
          {t("title")}
        </h2>
        <p className="text-muted-foreground mt-2">
            {t("subtitle")}
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden mask-linear-fade">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-16 py-4"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, 
          }}
        >
          {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-2 group cursor-default"
            >
              <span className="text-3xl md:text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-110">
                {tech.icon}
              </span>
              <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
