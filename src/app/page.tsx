import { ExperienceSection } from "@/components/main/sections/experiences";
import { ProjectsSection } from "@/components/main/sections/projects";
import { SkillsSection } from "@/components/main/sections/skills";
import { HeroSection } from "@/components/main/sections/hero";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TechStack />
    </div>
  );
}
