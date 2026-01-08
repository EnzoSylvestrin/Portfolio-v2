import { SiGithub } from "@icons-pack/react-simple-icons";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { MagicCard } from "@/components/ui/magic-card";

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  index: number;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  index,
}: ProjectCardProps) {
  const gradients = [
    "from-green-500/20 to-emerald-500/20",
    "from-blue-500/20 to-cyan-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-orange-500/20 to-red-500/20",
    "from-indigo-500/20 to-violet-500/20",
    "from-teal-500/20 to-green-500/20",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
    >
      <MagicCard className="rounded-2xl overflow-hidden">
        <div className={`relative h-48 bg-linear-to-br ${gradient} overflow-hidden`}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-foreground/10">{title.charAt(0)}</div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-foreground/90 dark:text-foreground/70 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
            >
              <SiGithub className="w-4 h-4" />
              <span>Ver Código</span>
            </a>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ver Demo</span>
              </a>
            )}
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}
