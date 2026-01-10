"use client";

import { useEffect } from "react";
import skillsData from "@/data/main/skills.json";

export function PreloadSkillsIcons() {
  useEffect(() => {
    const allSkills = [
      ...skillsData.core,
      ...skillsData.frontend,
      ...skillsData.backend,
      ...skillsData.database,
      ...skillsData.tools,
      ...skillsData.languages,
    ];

    allSkills.forEach((skill) => {
      if ("iconUrl" in skill && skill.iconUrl) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = skill.iconUrl;
        link.as = "image";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    });

    return () => {
      const links = document.head.querySelectorAll('link[rel="preload"][as="image"]');
      links.forEach((link) => {
        if (link.getAttribute("href")?.startsWith("http")) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return null;
}
