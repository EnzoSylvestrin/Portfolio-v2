"use client";

import { useState } from "react";

import { Menu, X } from "lucide-react";

import { motion } from "motion/react";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { AnimatedColorPicker } from "./animated-color-picker";
import { LanguageToggler } from "./language-toggler";
import { AnimatedTabs } from "./ui/animated-tabs";

interface MobileHeaderProps {
  hidden: boolean;
  navItems: Array<{ href: string; label: string }>;
}

export function MobileHeader({ hidden, navItems }: MobileHeaderProps) {
  const pathname = usePathname();
  const t = useTranslations("header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const activeKey =
    navItems.find((n) => pathname === n.href)?.href ??
    navItems[0]?.href ??
    null;

  const currentTab = hovered ?? selected ?? activeKey;

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: hidden ? -64 : 0, opacity: hidden ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="fixed top-0 left-0 right-0 z-50 hidden sm:block md:hidden"
      >
        <div className="flex h-16 items-center justify-center gap-4 px-4 border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70 dark:bg-card/90 dark:border-primary/30 dark:supports-backdrop-filter:bg-card/80">
          <Link href="/" className="text-sm font-semibold absolute left-4">
            {t("logo")}
          </Link>

          <nav className="relative flex items-center gap-2 justify-center">
            {navItems.slice(0, 4).map((item) => {
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
                  layoutId="tab-hover-mobile"
                />
              );
            })}
          </nav>

          <div className="ml-1 h-6 w-px bg-border dark:bg-border" />
        <div className="flex items-center gap-3">
          <AnimatedColorPicker />
          <LanguageToggler />
          <AnimatedThemeToggler />
        </div>
        </div>
      </motion.header>

      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: hidden ? -64 : 0, opacity: hidden ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="fixed top-0 left-0 right-0 z-50 sm:hidden"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70 dark:bg-card/90 dark:border-primary/30 dark:supports-backdrop-filter:bg-card/80">
          <Link href="/" className="text-sm font-semibold">
            {t("logo")}
          </Link>

          <div className="flex items-center gap-2">
            <AnimatedColorPicker />
            <LanguageToggler />
            <AnimatedThemeToggler />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-md border border-border transition-all min-w-[36px] text-foreground/70 hover:text-foreground hover:bg-accent"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="border-b border-border bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/80"
          >
            <div className="flex flex-col py-2">
              {navItems.map((item) => {
                const isActive = activeKey === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/8 text-primary dark:bg-primary/20 dark:text-primary"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    }`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </motion.header>
    </>
  );
}

