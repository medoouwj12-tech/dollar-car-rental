"use client";

import { useState } from "react";
import { CarType } from "@/types/car";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FleetSection } from "@/components/sections/FleetSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Footer } from "@/components/layout/Footer";
import { LocaleFontWrapper } from "@/components/layout/LocaleFontWrapper";

export function HomePage() {
  const [heroTypeFilter, setHeroTypeFilter] = useState<CarType | "all">("all");

  return (
    <LocaleFontWrapper>
    <main>
      <Navbar />
      <Hero onSearch={setHeroTypeFilter} />
      <FleetSection externalTypeFilter={heroTypeFilter} />
      <AboutSection />
      <LocationSection />
      <AdminDashboard />
      <Footer />
    </main>
    </LocaleFontWrapper>
  );
}
