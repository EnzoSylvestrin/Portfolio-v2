import { motion, AnimatePresence } from "framer-motion";

import { LucideIcon } from "lucide-react";

import * as SimpleIcons from "@icons-pack/react-simple-icons";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";

interface Skill {
  name: string;
  icon?: string;           // simple-icons icon name (optional)
  iconSvg?: string;        // SVG string (optional)
  iconUrl?: string;        // URL to icon image (optional)
  sinceYear?: number;      // Auto-calculate years from this year
  years?: number;          // OR hardcoded years (for skills not actively used)
  proficiency?: string;    // Language proficiency level (optional)
  color: string;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  icon: LucideIcon;
  index: number;
}

// Calculate years of experience dynamically
const calculateYears = (sinceYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - sinceYear;
};

// Get years for a skill (use hardcoded or calculate from sinceYear)
const getYears = (skill: Skill): number => {
  if (skill.years !== undefined) return skill.years;
  if (skill.sinceYear !== undefined) return calculateYears(skill.sinceYear);
  return 0;
};

const SkillItem = ({ skill }: { skill: Skill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  const IconComponent = skill.icon
    ? SimpleIcons[skill.icon as keyof typeof SimpleIcons] as React.ComponentType<{ className?: string }> | undefined
    : undefined;
  const color = skill.color;
  const years = getYears(skill);
  const isDark = ["Next.js", "Express", "GitHub", "Prisma", "Fastify", "Cursor", "Bun"].includes(skill.name);

  const description = skill.proficiency ? (
    skill.proficiency
  ) : skill.sinceYear ? (
    `${years} ${years === 1 ? 'ano' : 'anos'}`
  ) : skill.years ? (
    `${years} ${years === 1 ? 'ano' : 'anos'}`
  ) : null;

  const BadgeContent = (
    <>
      <div
        className="absolute inset-0 opacity-0 group-hover/badge:opacity-20 dark:group-hover/badge:opacity-15 transition-opacity duration-200 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      <div className="relative z-10 flex items-center gap-3">
        {skill.iconSvg ? (
          <span
            className="shrink-0 w-5 h-5 transition-colors brightness-75 dark:brightness-100 saturate-150 dark:saturate-100"
            style={{ color: isDark ? "currentColor" : color }}
            dangerouslySetInnerHTML={{ __html: skill.iconSvg }}
          />
        ) : skill.iconUrl ? (
          <Image
            src={skill.iconUrl}
            alt={skill.name}
            width={20}
            height={20}
            className="shrink-0 w-5 h-5 object-contain"
          />
        ) : IconComponent ? (
          <span className="shrink-0 transition-colors brightness-75 dark:brightness-100 saturate-150 dark:saturate-100" style={{ color: isDark ? "currentColor" : color }}>
            <IconComponent className="w-5 h-5" />
          </span>
        ) : null}

        <span
          className={`text-base font-semibold transition-colors brightness-75 dark:brightness-100 saturate-150 dark:saturate-100 ${isDark ? "text-foreground" : ""}`}
          style={{ color: isDark ? undefined : color }}
        >
          {skill.name}
        </span>

        {isMobile && (
          <AnimatePresence mode="wait">
            {isOpen && description && (
              <motion.div
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap flex items-center"
              >
                <span className="w-px h-4 bg-foreground/20 mr-3 shrink-0" />
                <span className="text-xs font-medium text-foreground/80">
                  {description}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );

  // No animation on badges anymore - only cards animate
  const containerStyle = {
    borderColor: `${color}50`,
    backgroundColor: `${color}20`,
    "--tech-color": color
  } as React.CSSProperties;

  const containerClass = "group/badge relative flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 hover:shadow-md overflow-hidden hover:bg-card cursor-pointer";

  if (isMobile) {
    return (
      <div
        style={containerStyle}
        onClick={() => setIsOpen(!isOpen)}
        className={containerClass}
      >
        {BadgeContent}
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={containerStyle}
          className={`${containerClass} hover:-translate-y-0.5 transition-transform`}
        >
          {BadgeContent}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs font-medium">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export function SkillCard({ title, skills, icon: Icon, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1
      }}
      style={{ willChange: 'transform, opacity' }}
      className="group relative rounded-2xl border border-primary/10 dark:border-primary/20 bg-card/80 backdrop-blur-md p-8 hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 opacity-50 dark:opacity-50 group-hover:opacity-20 dark:group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0.6, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: index * 0.05 + 0.1 }}
          className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-primary/10 group-hover:border-primary/30 transition-colors relative"
        >
          <div className="absolute bottom-[-2px] left-0 h-[2px] w-full bg-primary/50 opacity-50 group-hover:opacity-100 transition-all duration-300" />

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 rounded-xl bg-primary/10 border border-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </motion.div>

        <div className="flex flex-wrap gap-4 flex-1">
          {skills.map((skill) => (
            <SkillItem
              key={skill.name}
              skill={skill}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
