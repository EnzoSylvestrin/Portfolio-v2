"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { LanguageToggler } from "./language-toggler";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const lastYRef = useRef(0);
  const t = useTranslations("header");

  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

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

  const activeKey =
    NAV_ITEMS.find((n) => pathname === n.href)?.href ??
    NAV_ITEMS[0]?.href ??
    null;
  const currentTab = hovered ?? selected ?? activeKey;

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: hidden ? -64 : 0, opacity: hidden ? 0.5 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="fixed top-3 left-1/2 z-50 -translate-x-1/2 px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex h-14 items-center gap-4 rounded-full border border-black/10 bg-white/70 px-5 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-white/20 dark:bg-black/40 dark:supports-backdrop-filter:bg-black/30">
        <Link href="/" className="rounded-full px-3.5 text-sm font-semibold">
          {t("logo")}
        </Link>

        <nav className="relative flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeKey === item.href;
            const isCurrent = currentTab === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium text-black/80 outline-none transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(item.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="tab-hover"
                    className="absolute inset-0 z-0 rounded-full bg-black/6 dark:bg-white/12"
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 35,
                      mass: 0.3,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-1 h-6 w-px bg-black/10 dark:bg-white/40" />
        <div className="flex items-center gap-1">
          <LanguageToggler />
          <AnimatedThemeToggler />
        </div>
      </div>
    </motion.header>
  );
}

export default SiteHeader;
