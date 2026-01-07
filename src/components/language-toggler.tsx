"use client";

import { useLocale } from "next-intl";
import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

export const LanguageToggler = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  const locale = useLocale();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const langParam = searchParams.get("lang");
    
    if (langParam && ["en", "pt"].includes(langParam) && langParam !== locale) {
      document.cookie = `locale=${langParam}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.reload();
    }
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "pt" ? "en" : "pt";

    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLocale);
    
    window.location.href = url.toString();
  }, [locale]);

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center justify-center p-2 rounded-full border text-xs font-semibold transition-all min-w-[36px]",
        "border-black/10 hover:border-black/20 hover:bg-black/5 text-black/70 hover:text-black",
        "dark:border-white/20 dark:hover:border-white/30 dark:hover:bg-white/10 dark:text-white/80 dark:hover:text-white",
        className,
      )}
      {...props}
    >
      {locale.toUpperCase()}
      <span className="sr-only">Toggle language</span>
    </button>
  );
};

