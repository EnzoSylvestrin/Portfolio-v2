"use client";

import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string; // Container className
  variant?: "simple" | "button";
  iconSize?: "sm" | "md" | "lg" | "xl";
}

const socials = [
  {
    name: "Github",
    href: "https://github.com/EnzoSylvestrin",
    icon: Github,
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/enzo-sylvestrin",
    icon: Linkedin,
  },
];

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

export function SocialLinks({ className, variant = "simple", iconSize = "md" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {socials.map((social) => {
        const Icon = social.icon;
        
        if (variant === "button") {
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full border border-foreground/10 dark:border-white/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 text-foreground/60 dark:text-foreground/90 hover:scale-110 bg-background/50 dark:bg-zinc-900/50 backdrop-blur-sm"
              aria-label={social.name}
            >
              <Icon className={cn(sizeMap[iconSize])} />
            </a>
          );
        }

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors hover:scale-110 transform duration-200"
            aria-label={social.name}
          >
            <Icon className={cn(sizeMap[iconSize])} />
          </a>
        );
      })}
    </div>
  );
}
