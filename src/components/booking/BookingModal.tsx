"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Calendar, CheckCircle } from "lucide-react";
import { Car } from "@/types/car";
import { useLocale } from "@/context/LocaleContext";
import { getWhatsAppBookUrl } from "@/constants/whatsapp";

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
}

export function BookingModal({ car, onClose }: BookingModalProps) {
  const { locale, t } = useLocale();
  const [days, setDays] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  if (!car) return null;

  const name = car.name[locale];
  const totalPrice = car.pricePerDay * days;

  const handleConfirm = () => {
    if (!car.available) return;
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-card relative w-full max-w-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute end-4 top-4 z-10 rounded-full bg-luxury-black/50 p-2 transition-colors hover:bg-luxury-gold hover:text-luxury-black"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {confirmed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle className="mb-4 h-16 w-16 text-luxury-gold" />
              </motion.div>
              <h3 className="mb-2 text-2xl font-bold gold-gradient-text">
                {t.booking.success}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {t.booking.successMessage}
              </p>
            </motion.div>
          ) : (
            <>
              {/* Car Image */}
              <div className="relative h-48">
                <Image
                  src={car.image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold">{t.booking.title}</h3>
                <p className="mb-6 text-lg text-luxury-gold">{name}</p>

                {!car.available ? (
                  <p className="text-center text-red-400">
                    {t.booking.notAvailable}
                  </p>
                ) : (
                  <>
                    {/* Pickup Date */}
                    <div className="mb-4">
                      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-luxury-gold">
                        <Calendar className="h-4 w-4" />
                        {t.booking.pickupDate}
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        min={today}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="input-glass"
                      />
                    </div>

                    {/* Days Selector */}
                    <div className="mb-6">
                      <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                        {t.booking.selectDays}
                      </label>
                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={() => setDays(Math.max(1, days - 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-luxury-gold text-xl font-bold text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
                          whileTap={{ scale: 0.9 }}
                        >
                          −
                        </motion.button>
                        <span className="min-w-[3rem] text-center text-2xl font-bold">
                          {days}
                        </span>
                        <motion.button
                          onClick={() => setDays(days + 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-luxury-gold text-xl font-bold text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {days === 1 ? t.booking.day : t.booking.days}
                        </span>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="mb-6 rounded-xl border border-luxury-gold/30 bg-luxury-gold/5 p-4">
                      {/* Rental Conditions */}
                      {car.kmLimit !== undefined && (
                        <div className="mb-3 border-b border-luxury-gold/15 pb-3 text-xs text-[var(--text-secondary)]">
                          <div className="flex justify-between mb-1.5">
                            <span>{t.fleet.kmLimit}:</span>
                            <span className="font-semibold text-white">
                              {car.kmLimit * days} {t.fleet.kmPerDay.split('/')[0]} ({car.kmLimit} {t.fleet.kmPerDay})
                            </span>
                          </div>
                          <div className="flex justify-between mb-1.5">
                            <span>{t.fleet.extraKmPrice}:</span>
                            <span className="font-semibold text-white">
                              {car.extraKmPrice} {t.fleet.egpPerKm}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t.fleet.deposit}:</span>
                            <span className="font-semibold text-white">
                              {car.deposit && car.deposit > 0 ? `${car.deposit} ${t.fleet.currency}` : t.fleet.freeDeposit}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mb-2 flex justify-between text-sm text-[var(--text-secondary)]">
                        <span>
                          {car.pricePerDay} {t.fleet.currency} × {days}{" "}
                          {days === 1 ? t.booking.day : t.booking.days}
                        </span>
                        <span>
                          {totalPrice} {t.fleet.currency}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-luxury-gold/20 pt-2 text-lg font-bold">
                        <span>{t.booking.totalPrice}</span>
                        <span className="gold-gradient-text">
                          {totalPrice} {t.fleet.currency}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={onClose}
                        className="btn-outline-gold flex-1"
                      >
                        {t.booking.cancel}
                      </button>
                      <motion.a
                        href={getWhatsAppBookUrl(name, days, totalPrice, pickupDate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold flex flex-1 items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t.booking.confirm}
                      </motion.a>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
