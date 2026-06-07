"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  User,
  Menu,
  X,
  Globe,
  Car,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { key: "home" as const, href: "#home" },
  { key: "fleet" as const, href: "#fleet" },
  { key: "about" as const, href: "#about" },
  { key: "contact" as const, href: "#contact" },
  { key: "admin" as const, href: "#admin" },
];

export function Navbar() {
  const { locale, setLocale, t, dir } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.a
          href="#home"
          className="group flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-luxury-black/40 border border-luxury-gold/25 flex items-center justify-center">
            <img src="/images/dollar_logo.png" alt="Dollar" className="object-cover h-10 w-10" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold gold-gradient-text">
              Dollar
            </span>
            <span className="block text-xs text-[var(--text-secondary)]">
              {t.brandTagline}
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.key}
              href={link.href}
              className="relative text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-luxury-gold"
              whileHover={{ y: -2 }}
            >
              {t.nav[link.key]}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <motion.button
            onClick={toggleLocale}
            className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:border-luxury-gold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4 text-luxury-gold" />
            <span className="uppercase">{locale === "en" ? "AR" : "EN"}</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="glass rounded-xl p-2.5 transition-colors hover:border-luxury-gold"
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-luxury-gold" />
            ) : (
              <Moon className="h-5 w-5 text-luxury-gold" />
            )}
          </motion.button>

          {/* User Profile */}
          <motion.button
            className="glass hidden rounded-xl p-2.5 transition-colors hover:border-luxury-gold sm:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="User profile"
          >
            <User className="h-5 w-5 text-luxury-gold" />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass rounded-xl p-2.5 md:hidden"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mt-2 overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-luxury-gold/10 hover:text-luxury-gold"
                >
                  {t.nav[link.key]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
