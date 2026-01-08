import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as SimpleIcons from "@icons-pack/react-simple-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Skill {
  name: string;
  icon: string;
  years: number;
  projects: number;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  icon: LucideIcon;
  index: number;
}

const techColors: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  TailwindCSS: "#06B6D4",
  JavaScript: "#F7DF1E",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "Node.js": "#339933",
  Java: "#007396",
  "Spring Boot": "#6DB33F",
  Express: "#000000",
  Python: "#3776AB",
  "C#": "#239120",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  Redis: "#DC382D",
  Prisma: "#2D3748",
  Git: "#F05032",
  GitHub: "#181717",
  Docker: "#2496ED",
  "VS Code": "#007ACC",
  Postman: "#FF6C37",
  Figma: "#F24E1E",
};

export function SkillCard({ title, skills, icon: Icon, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      className="group relative rounded-2xl border border-primary/10 dark:border-primary/20 bg-card/80 backdrop-blur-md p-8 hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 opacity-50 dark:opacity-50 group-hover:opacity-20 dark:group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-primary/10 group-hover:border-primary/30 transition-colors relative">
           <div className="absolute bottom-[-2px] left-0 h-[2px] w-1/3 bg-linear-to-r from-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:w-full" />
           
          <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill, skillIndex) => {
            const IconComponent = SimpleIcons[skill.icon as keyof typeof SimpleIcons] as React.ComponentType<{ className?: string }> | undefined;
            const color = techColors[skill.name] || "currentColor";
            const isDefault = color === "currentColor";
            const isDark = ["Next.js", "Express", "GitHub", "Prisma"].includes(skill.name);
            
            return (
              <Tooltip key={skill.name}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                    style={{
                      borderColor: isDefault ? undefined : `${color}50`,
                      backgroundColor: isDefault ? undefined : `${color}20`,
                      ["--tech-color" as any]: color
                    }}
                    className={`group/badge relative flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-md cursor-help overflow-hidden ${
                      isDefault 
                        ? "bg-secondary border-border/50 hover:border-primary/40 hover:bg-card hover:shadow-primary/5" 
                        : "hover:bg-card"
                    }`}
                  >
                    {!isDefault && (
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: color }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-3">
                      {IconComponent && (
                        <span className="shrink-0 transition-colors brightness-75 dark:brightness-100 saturate-150 dark:saturate-100" style={{ color: isDefault ? undefined : (isDark ? "currentColor" : color) }}>
                          <IconComponent className="w-5 h-5" />
                        </span>
                      )}
                      <span 
                        className={`text-base font-semibold transition-colors brightness-75 dark:brightness-100 saturate-150 dark:saturate-100 ${isDark ? "text-foreground" : ""}`}
                        style={{ color: isDefault || isDark ? undefined : color }}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-medium">
                    {skill.years} {skill.years === 1 ? 'ano' : 'anos'} • {skill.projects} {skill.projects === 1 ? 'projeto' : 'projetos'}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
