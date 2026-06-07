"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Car, FleetFilters, CarType } from "@/types/car";
import { useCars } from "@/context/CarContext";
import { useLocale } from "@/context/LocaleContext";
import { FleetFiltersBar } from "@/components/fleet/FleetFilters";
import { CarCard } from "@/components/fleet/CarCard";
import { BookingModal } from "@/components/booking/BookingModal";

interface FleetSectionProps {
  externalTypeFilter?: CarType | "all";
}

export function FleetSection({ externalTypeFilter }: FleetSectionProps) {
  const { cars } = useCars();
  const { t } = useLocale();
  const maxPrice = Math.max(...cars.map((c) => c.pricePerDay), 600);

  const [filters, setFilters] = useState<FleetFilters>({
    brand: "",
    minPrice: 0,
    maxPrice,
    type: "all",
    searchQuery: "",
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Sync external filter from hero search
  useEffect(() => {
    if (externalTypeFilter && externalTypeFilter !== "all") {
      setFilters((prev) => ({ ...prev, type: externalTypeFilter }));
    }
  }, [externalTypeFilter]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.type !== "all" && car.specs.type !== filters.type)
        return false;
      if (car.pricePerDay < filters.minPrice) return false;
      if (car.pricePerDay > filters.maxPrice) return false;
      return true;
    });
  }, [cars, filters]);

  return (
    <section id="fleet" className="relative py-24">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="section-title mb-4">
            <span className="gold-gradient-text">{t.fleet.title}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[var(--text-secondary)]">
            {t.fleet.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <FleetFiltersBar filters={filters} onChange={setFilters} />

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                index={index}
                onBook={setSelectedCar}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center text-[var(--text-secondary)]"
          >
            {t.fleet.noResults}
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </section>
  );
}
