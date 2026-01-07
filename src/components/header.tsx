"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";

import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

export function SiteHeader() {
  const lastYRef = useRef(0);
  const { scrollY } = useScroll();
  
  const t = useTranslations("header");

  const [hidden, setHidden] = useState(false);

  const NAV_ITEMS = [
    { href: "#inicio", label: t("home") },
    { href: "#sobre", label: t("about") },
    { href: "#experiencia", label: t("experience") },
    { href: "#projetos", label: t("projects") },
    { href: "#habilidades", label: t("skills") },
    { href: "#contato", label: t("contact") },
  ];

  useEffect(() => {
    lastYRef.current = typeof window !== "undefined" ? window.scrollY : 0;
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
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
      <DesktopHeader hidden={hidden} navItems={NAV_ITEMS} />
      <MobileHeader hidden={hidden} navItems={NAV_ITEMS} />
    </>
  );
}

export default SiteHeader;