"use client";

import { ReactNode } from "react";
import { LocaleProvider } from "@/context/LocaleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CarProvider } from "@/context/CarContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <CarProvider>{children}</CarProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
