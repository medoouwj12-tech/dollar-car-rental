"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export function LocationSection() {
  const { locale } = useLocale();
  
  return (
    <section className="relative py-20 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold gold-gradient-text mb-4">
            {locale === 'ar' ? 'موقعنا' : 'Our Location'}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {locale === 'ar' 
              ? 'جد أسطول Dollar في قلب القاهرة، جاهز لخدمتك'
              : 'Find Dollar Fleet in the heart of Cairo, ready to serve you'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-luxury-gold/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8714267625447!2d31.49387!3d30.08678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fbd46eb7a61%3A0x1234567890ab!2z15DXnNikINCG16jZiNuoINi52YnZh9itINCCINCG16jZiNuoINuMNDk1MTEz!5e0!3m2!1sar!2seg!4v1699999999999"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-luxury-gold mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-luxury-gold mb-2">
                  {locale === 'ar' ? 'العنوان' : 'Address'}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  ميدان الجامعة الروسية<br />
                  Badr, Cairo Governorate<br />
                  4951134, Egypt
                </p>
                <a
                  href="https://maps.google.com/?q=ميدان+الجامعة+الروسية,+Badr,+Cairo+4951134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-luxury-gold hover:text-luxury-gold/80 transition-colors text-sm mt-2 inline-block"
                >
                  {locale === 'ar' ? 'افتح في الخرائط →' : 'Open in Maps →'}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-luxury-gold mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-luxury-gold mb-2">
                  {locale === 'ar' ? 'الهاتف' : 'Phone'}
                </h3>
                <a
                  href="tel:+201069916439"
                  className="text-[var(--text-secondary)] hover:text-luxury-gold transition-colors"
                >
                  +20 10 69916439
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-luxury-gold mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-luxury-gold mb-2">
                  {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </h3>
                <a
                  href="mailto:info@dollarcars-eg.com"
                  className="text-[var(--text-secondary)] hover:text-luxury-gold transition-colors"
                >
                  info@dollarcars-eg.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-luxury-gold mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-luxury-gold mb-2">
                  {locale === 'ar' ? 'ساعات العمل' : 'Hours'}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  {locale === 'ar' 
                    ? 'السبت - الخميس: 8:00 - 22:00\nالجمعة: 10:00 - 22:00'
                    : 'Sat - Thu: 8:00 - 22:00\nFriday: 10:00 - 22:00'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
