"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, CheckCircle2, Clock } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";

interface EducationData {
  institution: string;
  logo: string;
  degree: { pt: string; en: string };
  field: { pt: string; en: string };
  date: { pt: string; en: string };
  status: { pt: string; en: string };
  description: { pt: string; en: string };
  skills: string[];
}

interface EducationCardProps {
  education: EducationData;
  index: number;
}

export function EducationCard({ education, index }: EducationCardProps) {
  const locale = useLocale() as "pt" | "en";
  
  const isOngoing = education.status.en.toLowerCase() === "ongoing";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-primary/20 bg-linear-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm p-8 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-6 right-6 z-10">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
            isOngoing 
              ? "bg-primary/20 text-primary border border-primary/30" 
              : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
          }`}>
            {isOngoing ? (
              <Clock className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {education.status[locale]}
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6 relative z-10">
          <div className="shrink-0 w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center border border-primary/20 p-2 shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src={education.logo}
              alt={education.institution}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {education.institution}
            </h3>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <GraduationCap className="w-4 h-4" />
              <span className="font-semibold">
                {education.degree[locale]} • {education.field[locale]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4 relative z-10">
          <Calendar className="w-4 h-4" />
          <span>{education.date[locale]}</span>
        </div>

        <p className="text-foreground/70 leading-relaxed mb-6 relative z-10">
          {education.description[locale]}
        </p>

        {education.skills && education.skills.length > 0 && (
          <div className="relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {education.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: index * 0.15 + skillIndex * 0.03,
                  }}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-foreground/80 text-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-primary/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
