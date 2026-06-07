"use client";

import { ReactNode } from "react";
import { useLocale } from "@/context/LocaleContext";

/** Applies Arabic font when locale is AR */
export function LocaleFontWrapper({ children }: { children: ReactNode }) {
  const { locale } = useLocale();

  return (
    <div className={locale === "ar" ? "font-arabic" : "font-sans"}>
      {children}
    </div>
  );
}
