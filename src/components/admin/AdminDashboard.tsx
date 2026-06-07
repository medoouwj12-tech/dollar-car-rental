"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Settings,
} from "lucide-react";
import { Car, CarFormData, CarType, FuelType, Transmission } from "@/types/car";
import { useCars } from "@/context/CarContext";
import { useLocale } from "@/context/LocaleContext";

const emptyForm: CarFormData = {
  nameEn: "",
  nameAr: "",
  brand: "",
  image: "",
  pricePerDay: 100,
  fuel: "petrol",
  transmission: "automatic",
  seats: 5,
  type: "sedan",
  available: true,
};

const carTypes: CarType[] = ["sedan", "suv", "luxury", "sports", "economy"];
const fuelTypes: FuelType[] = ["petrol", "diesel", "electric", "hybrid"];
const transmissions: Transmission[] = ["automatic", "manual"];

export function AdminDashboard() {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const { locale, t } = useLocale();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CarFormData>(emptyForm);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (car: Car) => {
    setForm({
      nameEn: car.name.en,
      nameAr: car.name.ar,
      brand: car.brand,
      image: car.image,
      pricePerDay: car.pricePerDay,
      fuel: car.specs.fuel,
      transmission: car.specs.transmission,
      seats: car.specs.seats,
      type: car.specs.type,
      available: car.available,
    });
    setEditingId(car.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCar(editingId, form);
      showToast(t.admin.carUpdated);
    } else {
      addCar(form);
      showToast(t.admin.carAdded);
    }
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      deleteCar(id);
      showToast(t.admin.carDeleted);
    }
  };

  const updateField = <K extends keyof CarFormData>(
    key: K,
    value: CarFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="admin" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-gold/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-luxury-gold">
              <Settings className="h-6 w-6" />
              <h2 className="section-title">
                <span className="gold-gradient-text">{t.admin.title}</span>
              </h2>
            </div>
            <p className="text-[var(--text-secondary)]">{t.admin.subtitle}</p>
          </div>
          <motion.button
            onClick={openAddForm}
            className="btn-gold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-5 w-5" />
            {t.admin.addCar}
          </motion.button>
        </motion.div>

        {/* Cars Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-luxury-gold/20 bg-luxury-gold/5">
                  <th className="px-4 py-4 text-start text-sm font-semibold text-luxury-gold">
                    {t.admin.brand}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-luxury-gold">
                    {locale === "ar" ? t.admin.nameAr : t.admin.nameEn}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-luxury-gold">
                    {t.admin.pricePerDay}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-luxury-gold">
                    {t.admin.type}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-luxury-gold">
                    {t.admin.available}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-luxury-gold">
                    {t.admin.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, i) => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-luxury-gold/10 transition-colors hover:bg-luxury-gold/5"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 overflow-hidden rounded-lg">
                          <Image
                            src={car.image}
                            alt={car.name[locale]}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <span className="text-sm font-medium">{car.brand}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {car.name[locale]}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-luxury-gold">
                      ${car.pricePerDay}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {t.carTypes[car.specs.type]}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          car.available
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {car.available ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        {car.available
                          ? t.admin.available
                          : t.fleet.unavailable}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => openEditForm(car)}
                          className="rounded-lg p-2 text-luxury-gold transition-colors hover:bg-luxury-gold/10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={t.admin.editCar}
                        >
                          <Pencil className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(car.id)}
                          className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={t.admin.deleteCar}
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            >
              <motion.form
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onSubmit={handleSubmit}
                className="glass-card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold gold-gradient-text">
                    {editingId ? t.admin.editCar : t.admin.addCar}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full p-2 transition-colors hover:bg-luxury-gold/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.nameEn}
                    </label>
                    <input
                      required
                      value={form.nameEn}
                      onChange={(e) => updateField("nameEn", e.target.value)}
                      className="input-glass"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.nameAr}
                    </label>
                    <input
                      required
                      value={form.nameAr}
                      onChange={(e) => updateField("nameAr", e.target.value)}
                      className="input-glass"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.brand}
                    </label>
                    <input
                      required
                      value={form.brand}
                      onChange={(e) => updateField("brand", e.target.value)}
                      className="input-glass"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.pricePerDay}
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.pricePerDay}
                      onChange={(e) =>
                        updateField("pricePerDay", Number(e.target.value))
                      }
                      className="input-glass"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.imageUrl}
                    </label>
                    <input
                      required
                      type="url"
                      value={form.image}
                      onChange={(e) => updateField("image", e.target.value)}
                      className="input-glass"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.fuel}
                    </label>
                    <select
                      value={form.fuel}
                      onChange={(e) =>
                        updateField("fuel", e.target.value as FuelType)
                      }
                      className="input-glass cursor-pointer"
                    >
                      {fuelTypes.map((f) => (
                        <option key={f} value={f}>
                          {t.fuelTypes[f]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.transmission}
                    </label>
                    <select
                      value={form.transmission}
                      onChange={(e) =>
                        updateField(
                          "transmission",
                          e.target.value as Transmission
                        )
                      }
                      className="input-glass cursor-pointer"
                    >
                      {transmissions.map((tr) => (
                        <option key={tr} value={tr}>
                          {t.transmissionTypes[tr]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.seats}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={form.seats}
                      onChange={(e) =>
                        updateField("seats", Number(e.target.value))
                      }
                      className="input-glass"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-luxury-gold">
                      {t.admin.type}
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        updateField("type", e.target.value as CarType)
                      }
                      className="input-glass cursor-pointer"
                    >
                      {carTypes.map((ct) => (
                        <option key={ct} value={ct}>
                          {t.carTypes[ct]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <input
                      type="checkbox"
                      id="available"
                      checked={form.available}
                      onChange={(e) =>
                        updateField("available", e.target.checked)
                      }
                      className="h-5 w-5 rounded border-luxury-gold accent-luxury-gold"
                    />
                    <label
                      htmlFor="available"
                      className="text-sm font-medium text-luxury-gold"
                    >
                      {t.admin.available}
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-outline-gold flex-1"
                  >
                    {t.admin.cancel}
                  </button>
                  <motion.button
                    type="submit"
                    className="btn-gold flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.admin.save}
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 z-[110] -translate-x-1/2 rounded-xl bg-luxury-gold px-6 py-3 font-semibold text-luxury-black shadow-gold-lg"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
