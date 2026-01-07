import { HeroSection } from "@/components/sections/hero-section";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TechStack />
    </div>
  );
}
