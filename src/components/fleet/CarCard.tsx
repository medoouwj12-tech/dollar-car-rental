"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fuel, Users, Settings2 } from "lucide-react";
import { Car } from "@/types/car";
import { useLocale } from "@/context/LocaleContext";

interface CarCardProps {
  car: Car;
  index: number;
  onBook: (car: Car) => void;
}

export function CarCard({ car, index, onBook }: CarCardProps) {
  const { locale, t } = useLocale();
  const name = car.name[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group glass-card overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={car.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent" />

        {/* Price Tag */}
        <div className="absolute bottom-4 start-4 rounded-xl bg-luxury-gold px-3 py-1.5 font-bold text-luxury-black shadow-gold">
          {car.pricePerDay} {t.fleet.currency}
          <span className="text-xs font-normal">{t.fleet.perDay}</span>
        </div>

        {/* Availability Badge */}
        {!car.available && (
          <div className="absolute end-4 top-4 rounded-full bg-red-500/90 px-3 py-1 text-xs font-medium text-white">
            {t.fleet.unavailable}
          </div>
        )}

        {/* Brand */}
        <div className="absolute end-4 bottom-4 rounded-lg bg-luxury-black/60 px-2 py-1 text-xs font-medium text-luxury-gold backdrop-blur-sm">
          {car.brand}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-3 text-lg font-bold transition-colors group-hover:text-luxury-gold">
          {name}
        </h3>

        {/* Specs */}
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-luxury-gold" />
            {t.fuelTypes[car.specs.fuel]}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4 text-luxury-gold" />
            {t.transmissionTypes[car.specs.transmission]}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-luxury-gold" />
            {car.specs.seats} {t.fleet.seats}
          </span>
        </div>

        {/* Rental Terms (KM Limit, Extra KM, Deposit) */}
        {car.kmLimit !== undefined && (
          <div className="mb-5 border-t border-luxury-gold/15 pt-3.5 text-xs text-[var(--text-secondary)]">
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="flex flex-col items-center border-e border-luxury-gold/15 px-1">
                <span className="text-[9px] uppercase tracking-wider text-luxury-gold/75 font-medium">{t.fleet.kmLimit}</span>
                <span className="font-bold text-white mt-1 text-[11px]">{car.kmLimit} {t.fleet.kmPerDay}</span>
              </div>
              <div className="flex flex-col items-center border-e border-luxury-gold/15 px-1">
                <span className="text-[9px] uppercase tracking-wider text-luxury-gold/75 font-medium">{t.fleet.extraKmPrice}</span>
                <span className="font-bold text-white mt-1 text-[11px]">{car.extraKmPrice} {t.fleet.egpPerKm}</span>
              </div>
              <div className="flex flex-col items-center px-1">
                <span className="text-[9px] uppercase tracking-wider text-luxury-gold/75 font-medium">{t.fleet.deposit}</span>
                <span className="font-bold text-white mt-1 text-[11px]">
                  {car.deposit && car.deposit > 0 ? `${car.deposit} ${t.fleet.currency}` : t.fleet.freeDeposit}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <motion.button
          onClick={() => onBook(car)}
          disabled={!car.available}
          className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
            car.available
              ? "btn-gold"
              : "cursor-not-allowed bg-gray-500/20 text-gray-500"
          }`}
          whileHover={car.available ? { scale: 1.02 } : {}}
          whileTap={car.available ? { scale: 0.98 } : {}}
        >
          {car.available ? t.fleet.bookNow : t.fleet.unavailable}
        </motion.button>
      </div>

      {/* Hover glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-gold-lg" />
    </motion.div>
  );
}
