"use client";

import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { FleetFilters as Filters, CarType } from "@/types/car";
import { useLocale } from "@/context/LocaleContext";
import { useCars } from "@/context/CarContext";

interface FleetFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const carTypes: (CarType | "all")[] = [
  "all",
  "luxury",
  "suv",
  "sedan",
  "sports",
  "economy",
];

export function FleetFiltersBar({ filters, onChange }: FleetFiltersProps) {
  const { t } = useLocale();
  const { cars } = useCars();

  const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
  const maxPrice = Math.max(...cars.map((c) => c.pricePerDay), 600);

  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial });
  };

  const clearFilters = () => {
    onChange({
      brand: "",
      minPrice: 0,
      maxPrice,
      type: "all",
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filters.brand !== "" ||
    filters.type !== "all" ||
    filters.minPrice > 0 ||
    filters.maxPrice < maxPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card mb-8 p-4 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-luxury-gold">
          <Filter className="h-5 w-5" />
          <span className="font-semibold">
            {t.fleet.filterByBrand}
          </span>
        </div>
        {hasActiveFilters && (
          <motion.button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-luxury-gold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-4 w-4" />
            {t.fleet.clearFilters}
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
            {t.fleet.filterByBrand}
          </label>
          <select
            value={filters.brand}
            onChange={(e) => update({ brand: e.target.value })}
            className="input-glass cursor-pointer appearance-none"
          >
            <option value="">{t.fleet.allBrands}</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
            {t.fleet.filterByType}
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              update({ type: e.target.value as CarType | "all" })
            }
            className="input-glass cursor-pointer appearance-none"
          >
            {carTypes.map((type) => (
              <option key={type} value={type}>
                {t.carTypes[type]}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
            {t.fleet.priceRange} (Min)
          </label>
          <input
            type="number"
            min={0}
            max={filters.maxPrice}
            value={filters.minPrice}
            onChange={(e) =>
              update({ minPrice: Number(e.target.value) })
            }
            className="input-glass"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
            {t.fleet.priceRange} (Max)
          </label>
          <input
            type="number"
            min={filters.minPrice}
            max={maxPrice}
            value={filters.maxPrice}
            onChange={(e) =>
              update({ maxPrice: Number(e.target.value) })
            }
            className="input-glass"
          />
        </div>
      </div>
    </motion.div>
  );
}
