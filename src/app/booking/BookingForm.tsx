"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar, Users, Fuel, Settings2, MapPin, Phone, Mail } from "lucide-react";
import { Car } from "@/types/car";
import { useLocale } from "@/context/LocaleContext";
import { useCars } from "@/context/CarContext";

export function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale, t } = useLocale();
  const { cars } = useCars();
  const carId = searchParams.get("carId");
  
  const [car, setCar] = useState<Car | null>(null);
  const [days, setDays] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (carId) {
      const foundCar = cars.find(c => c.id === carId);
      setCar(foundCar || null);
    }
  }, [carId, cars]);

  useEffect(() => {
    if (pickupDate && days) {
      const pickup = new Date(pickupDate);
      const returnDateObj = new Date(pickup);
      returnDateObj.setDate(returnDateObj.getDate() + days);
      setReturnDate(returnDateObj.toISOString().split("T")[0]);
    }
  }, [pickupDate, days]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <p className="text-[var(--text-secondary)] mb-4">{t.booking.notAvailable}</p>
          <motion.button
            onClick={() => router.push("/")}
            className="btn-gold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </motion.button>
        </div>
      </div>
    );
  }

  const name = car.name[locale];
  const totalPrice = car.pricePerDay * days;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupDate || !returnDate || !customerName || !customerPhone) {
      alert(locale === 'ar' ? 'الرجاء ملء جميع البيانات المطلوبة' : 'Please fill all required fields');
      return;
    }

    const bookingDetails = `
Name: ${customerName}
Car: ${name}
Pickup Date: ${pickupDate}
Return Date: ${returnDate}
Days: ${days}
Total Price: ${totalPrice} EGP
Phone: ${customerPhone}
Email: ${customerEmail}
    `;

    const whatsappUrl = `https://wa.me/201069916439?text=${encodeURIComponent(`جديد حجز سيارة:\n${bookingDetails}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold gold-gradient-text mb-2">
            {locale === 'ar' ? 'حجز سيارة' : 'Book Your Car'}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {locale === 'ar' ? 'أكمل بيانات الحجز الخاصة بك' : 'Complete your booking details'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card sticky top-8 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={car.image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-luxury-gold text-lg font-semibold mb-4">{car.brand}</p>

                {/* Specs */}
                <div className="space-y-3 mb-6 pb-6 border-b border-luxury-gold/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Fuel className="h-4 w-4 text-luxury-gold" />
                    <span className="text-[var(--text-secondary)]">{t.fuelTypes[car.specs.fuel]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Settings2 className="h-4 w-4 text-luxury-gold" />
                    <span className="text-[var(--text-secondary)]">{t.transmissionTypes[car.specs.transmission]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-luxury-gold" />
                    <span className="text-[var(--text-secondary)]">{car.specs.seats} {t.fleet.seats}</span>
                  </div>
                </div>

                {/* Rental Terms */}
                {car.kmLimit !== undefined && (
                  <div className="mb-6 pb-6 border-b border-luxury-gold/20 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-luxury-gold">{t.fleet.kmLimit}:</span>
                      <span className="font-semibold">{car.kmLimit} km/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-gold">{t.fleet.extraKmPrice}:</span>
                      <span className="font-semibold">{car.extraKmPrice} EGP/km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-gold">{t.fleet.deposit}:</span>
                      <span className="font-semibold">
                        {car.deposit && car.deposit > 0 ? `${car.deposit} EGP` : t.fleet.freeDeposit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price Summary */}
                <div className="bg-luxury-gold/10 rounded-xl p-4">
                  <div className="flex justify-between mb-2 text-sm text-[var(--text-secondary)]">
                    <span>{car.pricePerDay} EGP × {days} {days === 1 ? t.booking.day : t.booking.days}</span>
                    <span className="font-semibold">{totalPrice} EGP</span>
                  </div>
                  <div className="flex justify-between border-t border-luxury-gold/20 pt-2 text-lg font-bold">
                    <span>{t.booking.totalPrice}</span>
                    <span className="gold-gradient-text">{totalPrice} EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-luxury-gold mb-4">
                    {locale === 'ar' ? 'بيانات المستأجر' : 'Rental Information'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-luxury-gold mb-2">
                        {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="input-glass w-full"
                        placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-luxury-gold mb-2">
                        {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="input-glass w-full"
                        placeholder="+20 10 0000 0000"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-luxury-gold mb-2">
                        {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'} {locale === 'ar' ? '(اختياري)' : '(Optional)'}
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="input-glass w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div>
                  <h3 className="text-xl font-semibold text-luxury-gold mb-4">
                    {locale === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-luxury-gold mb-2">
                        <Calendar className="h-4 w-4" />
                        {t.booking.pickupDate} *
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        min={today}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="input-glass w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-luxury-gold mb-2">
                        <Calendar className="h-4 w-4" />
                        {locale === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        readOnly
                        className="input-glass w-full opacity-75 cursor-not-allowed"
                      />
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {locale === 'ar' ? 'محسوب تلقائياً بناءً على عدد الأيام' : 'Calculated automatically based on number of days'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-luxury-gold mb-2">
                        {t.booking.selectDays} *
                      </label>
                      <div className="flex items-center gap-4">
                        <motion.button
                          type="button"
                          onClick={() => setDays(Math.max(1, days - 1))}
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-luxury-gold text-xl font-bold text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
                          whileTap={{ scale: 0.9 }}
                        >
                          −
                        </motion.button>
                        <span className="min-w-[4rem] text-center text-3xl font-bold text-luxury-gold">
                          {days}
                        </span>
                        <motion.button
                          type="button"
                          onClick={() => setDays(days + 1)}
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-luxury-gold text-xl font-bold text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {days === 1 ? t.booking.day : t.booking.days}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info Box */}
                <div className="bg-luxury-gold/5 rounded-xl p-4 border border-luxury-gold/20">
                  <h4 className="text-sm font-semibold text-luxury-gold mb-3">
                    {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </h4>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                      <a href="tel:+201069916439" className="hover:text-luxury-gold">+20 10 69916439</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                      <a href="mailto:info@dollarcars-eg.com" className="hover:text-luxury-gold">info@dollarcars-eg.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                      <span>ميدان الجامعة الروسية، القاهرة</span>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-luxury-gold/20">
                  <motion.button
                    type="button"
                    onClick={() => router.back()}
                    className="btn-outline-gold flex-1 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                    {locale === 'ar' ? 'العودة' : 'Back'}
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="btn-gold flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {locale === 'ar' ? 'تأكيد عبر واتس آب' : 'Confirm via WhatsApp'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
