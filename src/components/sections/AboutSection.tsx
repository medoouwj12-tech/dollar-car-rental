"use client";

import { motion } from "framer-motion";
import { Shield, Star, Clock, Award } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export function AboutSection() {
  const { locale } = useLocale();

  const features = [
    {
      icon: Shield,
      title: locale === "ar" ? "أمان وموثوقية" : "Safety & Trust",
      desc:
        locale === "ar"
          ? "أسطولنا يخضع لفحوصات دورية صارمة لضمان سلامتك"
          : "Our fleet undergoes rigorous inspections to ensure your safety",
    },
    {
      icon: Star,
      title: locale === "ar" ? "خدمة متميزة" : "Premium Service",
      desc:
        locale === "ar"
          ? "فريق محترف مخصص لخدمتك على مدار الساعة"
          : "Dedicated professional team at your service 24/7",
    },
    {
      icon: Clock,
      title: locale === "ar" ? "مرونة في الحجز" : "Flexible Booking",
      desc:
        locale === "ar"
          ? "احجز بسهولة وألغِ أو عدّل حجزك دون تعقيد"
          : "Book easily and modify or cancel without hassle",
    },
    {
      icon: Award,
      title: locale === "ar" ? "جودة فائقة" : "Superior Quality",
      desc:
        locale === "ar"
          ? "أحدث موديلات السيارات الفاخرة من أرقى الماركات العالمية"
          : "Latest luxury models from the world's finest brands",
    },
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="section-title mb-4">
            <span className="gold-gradient-text">
              {locale === "ar" ? "لماذا دولار؟" : "Why Dollar?"}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[var(--text-secondary)]">
            {locale === "ar"
              ? "نقدم تجربة تأجير سيارات استثنائية تجمع بين الفخامة والراحة والموثوقية"
              : "We deliver an exceptional car rental experience combining luxury, comfort, and reliability."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card group p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-luxury-gold/10 transition-colors group-hover:bg-luxury-gold/20">
                <feature.icon className="h-7 w-7 text-luxury-gold" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
