"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";

import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

export function Header() {
  const lastYRef = useRef(0);
  const isScrollingToSectionRef = useRef(false);
  const { scrollY } = useScroll();
  
  const t = useTranslations("header");

  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#inicio");

  const NAV_ITEMS = [
    { href: "#inicio", label: t("home") },
    { href: "#experiencia", label: t("experience") },
    { href: "#projetos", label: t("projects") },
    { href: "#habilidades", label: t("skills") },
    { href: "#contato", label: t("contact") },
  ];

  useEffect(() => {
    lastYRef.current = typeof window !== "undefined" ? window.scrollY : 0;
  }, []);

  useEffect(() => {
    // Reset hidden state if we're at the top of the page when language changes
    // This fixes the issue where changing language keeps header hidden
    const currentScroll = typeof window !== "undefined" ? window.scrollY : 0;
    if (currentScroll < 80 && hidden) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => setHidden(false), 0);
      return () => clearTimeout(timer);
    }
  }, [t, hidden]); // Re-run when translations change (language toggle)

  // Scroll Spy - detect active section
  useEffect(() => {
    const sectionIds = ["inicio", "experiencia", "projetos", "habilidades", "contato"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = `#${entry.target.id}`;
            setActiveSection(href);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is in top 20-40% of viewport
        threshold: 0.1
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Ignore scroll events during programmatic navigation
    if (isScrollingToSectionRef.current) {
      lastYRef.current = latest;
      return;
    }

    const last = lastYRef.current;
    const delta = latest - last;
    const threshold = 80;
    const minorDelta = 6;

    if (latest < threshold) {
      setHidden(false);
    } else if (delta > minorDelta) {
      setHidden(true);
    } else if (delta < -minorDelta) {
      setHidden(false);
    }

    lastYRef.current = latest;
  });

  return (
    <>
      <DesktopHeader 
        hidden={hidden} 
        navItems={NAV_ITEMS} 
        activeSection={activeSection}
        isScrollingToSectionRef={isScrollingToSectionRef}
      />
      <MobileHeader hidden={hidden} navItems={NAV_ITEMS} />
    </>
  );
}