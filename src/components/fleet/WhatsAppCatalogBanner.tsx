"use client";

import { motion } from "framer-motion";
import { MessageCircle, ExternalLink } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { WHATSAPP_CATALOG_URL } from "@/constants/whatsapp";

export function WhatsAppCatalogBanner() {
  const { t } = useLocale();

  return (
    <motion.a
      href={WHATSAPP_CATALOG_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-luxury-gold/10 p-5 transition-shadow hover:shadow-gold md:p-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/20">
          <MessageCircle className="h-6 w-6 text-green-400" />
        </div>
        <div className="text-start">
          <p className="font-bold text-luxury-gold">{t.hero.whatsappCatalog}</p>
          <p className="text-sm text-[var(--text-secondary)]">
            +20 10 69916439
          </p>
        </div>
      </div>
      <ExternalLink className="hidden h-5 w-5 shrink-0 text-luxury-gold sm:block" />
    </motion.a>
  );
}
