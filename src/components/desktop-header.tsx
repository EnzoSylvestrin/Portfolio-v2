"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { AnimatedColorPicker } from "./animated-color-picker";
import { LanguageToggler } from "./language-toggler";
import { AnimatedTabs } from "./ui/animated-tabs";

interface DesktopHeaderProps {
  hidden: boolean;
  navItems: Array<{ href: string; label: string }>;
}

export function DesktopHeader({ hidden, navItems }: DesktopHeaderProps) {
  const pathname = usePathname();
  const t = useTranslations("header");

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const activeKey =
    navItems.find((n) => pathname === n.href)?.href ??
    navItems[0]?.href ??
    null;
  const currentTab = hovered ?? selected ?? activeKey;

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: hidden ? -64 : 0, opacity: hidden ? 0.5 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="fixed top-3 left-1/2 z-50 -translate-x-1/2 px-3 pointer-events-none hidden md:block"
    >
      <div className="pointer-events-auto flex h-14 items-center gap-4 rounded-full border border-primary/30 bg-background/80 px-5 shadow-lg backdrop-blur-xl supports-backdrop-filter:bg-background/70 dark:bg-card/80 dark:border-primary/30 dark:supports-backdrop-filter:bg-card/70">
        <Link href="/" className="rounded-full px-3.5 text-sm font-semibold">
          {t("logo")}
        </Link>

        <nav className="relative flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeKey === item.href;
            const isCurrent = currentTab === item.href;
            return (
              <AnimatedTabs
                key={item.href}
                item={item}
                setHovered={setHovered}
                setSelected={setSelected}
                isActive={isActive}
                isCurrent={isCurrent}
                layoutId="tab-hover-desktop"
              />
            );
          })}
        </nav>

        <div className="ml-1 h-6 w-px bg-foreground/20 dark:bg-border" />
        <div className="flex items-center gap-3">
          <AnimatedColorPicker />
          <LanguageToggler />
          <AnimatedThemeToggler />
        </div>
      </div>
    </motion.header>
  );
}
