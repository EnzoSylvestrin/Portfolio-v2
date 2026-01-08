'use client'

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SkillCard } from "./skill-card";
import skillsData from "@/data/main/skills.json";
import { Code2, Database, Server, Wrench } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { WaveDivider } from "@/components/ui/wave-divider";

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export function SkillsSection() {
  const t = useTranslations("skills");

  const categories = [
    { key: "frontend", skills: skillsData.frontend },
    { key: "backend", skills: skillsData.backend },
    { key: "database", skills: skillsData.database },
    { key: "tools", skills: skillsData.tools },
  ];

  return (
    <section id="skills" className="w-full bg-background relative overflow-hidden pb-20">
      {/* Wave divider */}
      <WaveDivider className="-mt-1" />
      
      {/* Meteors effect container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Meteors number={30} />
      </div>
      
      {/* Refined grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} 
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
      </div>

      <div className="w-full px-4 md:px-8">
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.key as keyof typeof categoryIcons];
              return (
                <SkillCard
                  key={category.key}
                  title={t(category.key)}
                  skills={category.skills}
                  icon={Icon}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
