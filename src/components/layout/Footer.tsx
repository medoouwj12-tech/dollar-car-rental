"use client";

import { motion } from "framer-motion";
import { Car, Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative border-t border-luxury-gold/20 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-luxury-black/40 border border-luxury-gold/25 flex items-center justify-center">
                <img src="/images/dollar_logo.png" alt="Dollar" className="object-cover h-10 w-10" />
              </div>
              <span className="text-xl font-bold gold-gradient-text">
                Dollar
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.footer.description}
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 font-semibold text-luxury-gold">
              {t.nav.contact}
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-luxury-gold" />
                +20 10 69916439
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-luxury-gold" />
                info@dollarcars-eg.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-luxury-gold" />
                Cairo, Egypt
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-4 font-semibold text-luxury-gold">
              {t.nav.fleet}
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {["luxury", "suv", "sedan", "sports", "economy"].map((type) => (
                <li key={type}>
                  <a
                    href="#fleet"
                    className="transition-colors hover:text-luxury-gold"
                  >
                    {t.carTypes[type as keyof typeof t.carTypes]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-luxury-gold/10 pt-8 text-center text-sm text-[var(--text-secondary)]">
          © {year} {t.brandName}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
