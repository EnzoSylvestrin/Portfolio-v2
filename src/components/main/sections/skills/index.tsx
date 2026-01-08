"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/section-header";
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
    <section id="habilidades" className="w-full bg-background relative overflow-hidden pb-20 pt-8 md:pt-0">
      <WaveDivider />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Meteors number={30} />
      </div>
      
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
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
      </div>

      <div className="w-full px-4 md:px-8">
        <div className="container max-w-7xl mx-auto relative z-10">
          <SectionHeader 
            title={t("title")} 
            subtitle={t("subtitle")} 
            align="left"
            className="mb-16" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.key as keyof typeof categoryIcons];
              return (
                <SkillCard
                  key={category.key}
                  title={t(category.key)}
                  icon={Icon}
                  skills={category.skills}
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
