import { ExperienceSection } from "@/components/main/sections/experiences";
import { HeroSection } from "@/components/main/sections/hero";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <TechStack />
    </div>
  );
}
