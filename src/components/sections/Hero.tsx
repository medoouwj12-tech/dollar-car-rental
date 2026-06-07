"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, Car, Search } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { CarType } from "@/types/car";
import { ArabicBackgroundPattern } from "./ArabicBackgroundPattern";

interface HeroProps {
  onSearch: (type: CarType | "all") => void;
}

/** Arabic/Gulf luxury city skyline - local optimized image */
const HERO_BG = "/images/hero-dubai.jpg";

export function Hero({ onSearch }: HeroProps) {
  const { t, locale } = useLocale();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0.25]);

  const [location, setLocation] = useState("cairo");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState<CarType | "all">("all");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    onSearch(carType);
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  const carTypes: (CarType | "all")[] = [
    "all",
    "luxury",
    "suv",
    "sedan",
    "sports",
    "economy",
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Arabic Luxury Background - Luxury black car with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/luxury_black_car.png"
          alt="Luxury Black Car Background"
          fill
          priority
          className="object-cover object-center opacity-40 select-none pointer-events-none"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950" />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Warm gold glow from top-left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-700/30 blur-3xl rounded-full" />
        
        {/* Right accent gold glow */}
        <div className="absolute -right-40 top-1/4 w-80 h-80 bg-yellow-600/10 blur-3xl rounded-full" />
        
        {/* Bottom right accent */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-800/20 blur-3xl rounded-full" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 20px)"
        }} />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950" />
      </div>

      {/* Floating gold orbs - optimized for performance */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-luxury-gold/10 blur-3xl will-change-transform"
        style={{ willChange: "transform" }}
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-luxury-gold-bright/5 blur-3xl will-change-transform"
        style={{ willChange: "transform" }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Headline with text shadow for readability */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="mb-4 inline-block rounded-full border border-luxury-gold/40 bg-black/40 px-4 py-1.5 text-sm font-medium text-luxury-gold backdrop-blur-md">
            {t.brandTagline}
          </span>
          <h1 className="section-title mb-6 text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <span className="gold-gradient-text">{t.hero.title}</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/80 drop-shadow-lg md:text-xl">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card mx-auto max-w-4xl border-luxury-gold/30 bg-black/50 p-4 backdrop-blur-2xl md:p-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-luxury-gold">
                <MapPin className="h-3.5 w-3.5" />
                {t.hero.pickupLocation}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-glass cursor-pointer appearance-none bg-black/40"
              >
                {Object.entries(t.hero.locations).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-luxury-gold">
                <Calendar className="h-3.5 w-3.5" />
                {t.hero.pickupDate}
              </label>
              <input
                type="date"
                value={pickupDate}
                min={today}
                onChange={(e) => setPickupDate(e.target.value)}
                className="input-glass bg-black/40"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-luxury-gold">
                <Calendar className="h-3.5 w-3.5" />
                {t.hero.returnDate}
              </label>
              <input
                type="date"
                value={returnDate}
                min={pickupDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
                className="input-glass bg-black/40"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-luxury-gold">
                <Car className="h-3.5 w-3.5" />
                {t.hero.carType}
              </label>
              <select
                value={carType}
                onChange={(e) =>
                  setCarType(e.target.value as CarType | "all")
                }
                className="input-glass cursor-pointer appearance-none bg-black/40"
              >
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {t.carTypes[type]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            onClick={handleSearch}
            className="btn-gold mt-4 flex w-full items-center justify-center gap-2 md:mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="h-5 w-5" />
            {t.hero.search}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8"
        >
          {[
            {
              value: "50+",
              label: locale === "ar" ? "سيارة فاخرة" : "Luxury Cars",
            },
            {
              value: "10K+",
              label: locale === "ar" ? "عميل سعيد" : "Happy Clients",
            },
            {
              value: "24/7",
              label: locale === "ar" ? "دعم متواصل" : "Support",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div className="text-2xl font-bold gold-gradient-text drop-shadow-lg md:text-3xl">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
