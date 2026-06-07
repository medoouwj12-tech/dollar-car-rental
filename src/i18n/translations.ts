export type Locale = "en" | "ar";

export const translations = {
  en: {
    // Brand
    brandName: "Dollar Car Rental",
    brandTagline: "Luxury in Motion",

    // Navigation
    nav: {
      home: "Home",
      fleet: "Our Fleet",
      about: "About",
      contact: "Contact",
      admin: "Admin",
    },

    // Hero
    hero: {
      title: "Drive Your Dreams",
      subtitle:
        "Experience unparalleled luxury with our premium fleet. Your journey begins with Dollar.",
      pickupLocation: "Pickup Location",
      pickupDate: "Pickup Date",
      returnDate: "Return Date",
      carType: "Car Type",
      search: "Search Cars",
      locations: {
        cairo: "Cairo",
        giza: "Giza",
        alexandria: "Alexandria",
        sharm: "Sharm El Sheikh",
      },
      whatsappCatalog: "View Full Catalog on WhatsApp",
    },

    // Fleet
    fleet: {
      title: "Our Premium Fleet",
      subtitle: "Choose from our exclusive collection of luxury vehicles",
      filterByBrand: "Filter by Brand",
      filterByType: "Filter by Type",
      priceRange: "Price Range",
      allBrands: "All Brands",
      allTypes: "All Types",
      perDay: "/day",
      currency: "EGP",
      bookNow: "Book Now",
      unavailable: "Unavailable",
      seats: "Seats",
      fuel: "Fuel",
      transmission: "Transmission",
      noResults: "No cars match your filters",
      clearFilters: "Clear Filters",
      kmLimit: "Daily KM Limit",
      extraKmPrice: "Extra KM Price",
      deposit: "Refundable Deposit",
      freeDeposit: "No Deposit Required",
      kmPerDay: "km/day",
      egpPerKm: "EGP/km",
    },

    // Car types
    carTypes: {
      all: "All Types",
      sedan: "Sedan",
      suv: "SUV",
      luxury: "Luxury",
      sports: "Sports",
      economy: "Economy",
    },

    // Fuel types
    fuelTypes: {
      petrol: "Petrol",
      diesel: "Diesel",
      electric: "Electric",
      hybrid: "Hybrid",
    },

    // Transmission
    transmissionTypes: {
      automatic: "Automatic",
      manual: "Manual",
    },

    // Booking modal
    booking: {
      title: "Book Your Ride",
      selectDays: "Number of Days",
      pickupDate: "Pickup Date",
      totalPrice: "Total Price",
      confirm: "Confirm Booking",
      cancel: "Cancel",
      success: "Booking Confirmed!",
      successMessage: "Your luxury ride awaits. We'll contact you shortly.",
      days: "days",
      day: "day",
      notAvailable: "This vehicle is currently unavailable",
    },

    // Admin
    admin: {
      title: "Fleet Management",
      subtitle: "Manage your vehicle inventory",
      addCar: "Add New Car",
      editCar: "Edit Car",
      deleteCar: "Delete",
      save: "Save",
      cancel: "Cancel",
      nameEn: "Name (English)",
      nameAr: "Name (Arabic)",
      brand: "Brand",
      imageUrl: "Image URL",
      pricePerDay: "Price per Day",
      fuel: "Fuel Type",
      transmission: "Transmission",
      seats: "Seats",
      type: "Car Type",
      available: "Available",
      actions: "Actions",
      confirmDelete: "Are you sure you want to delete this car?",
      carAdded: "Car added successfully",
      carUpdated: "Car updated successfully",
      carDeleted: "Car deleted successfully",
    },

    // Footer
    footer: {
      rights: "All rights reserved",
      description:
        "Premium car rental services for discerning travelers across the Gulf region.",
    },

    // Theme
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
    },
  },

  ar: {
    // Brand
    brandName: "دولار لإيجار السيارات",
    brandTagline: "الفخامة في كل رحلة",

    // Navigation
    nav: {
      home: "الرئيسية",
      fleet: "أسطولنا",
      about: "من نحن",
      contact: "تواصل معنا",
      admin: "الإدارة",
    },

    // Hero
    hero: {
      title: "قُد أحلامك",
      subtitle:
        "استمتع بتجربة فاخرة لا مثيل لها مع أسطولنا المميز. رحلتك تبدأ مع دولار.",
      pickupLocation: "موقع الاستلام",
      pickupDate: "تاريخ الاستلام",
      returnDate: "تاريخ التسليم",
      carType: "نوع السيارة",
      search: "ابحث عن سيارة",
      locations: {
        cairo: "القاهرة",
        giza: "الجيزة",
        alexandria: "الإسكندرية",
        sharm: "شرم الشيخ",
      },
      whatsappCatalog: "عرض الكتالوج الكامل على واتساب",
    },

    // Fleet
    fleet: {
      title: "أسطولنا الفاخر",
      subtitle: "اختر من مجموعتنا الحصرية من السيارات الفاخرة",
      filterByBrand: "تصفية حسب الماركة",
      filterByType: "تصفية حسب النوع",
      priceRange: "نطاق السعر",
      allBrands: "جميع الماركات",
      allTypes: "جميع الأنواع",
      perDay: "/يوم",
      currency: "ج.م",
      bookNow: "احجز الآن",
      unavailable: "غير متاحة",
      seats: "مقاعد",
      fuel: "الوقود",
      transmission: "ناقل الحركة",
      noResults: "لا توجد سيارات تطابق معايير البحث",
      clearFilters: "مسح الفلاتر",
      kmLimit: "حد الكيلومترات اليومي",
      extraKmPrice: "سعر الكيلو الزائد",
      deposit: "قيمة التأمين المسترد",
      freeDeposit: "بدون تأمين",
      kmPerDay: "كم/يوم",
      egpPerKm: "ج.م/كم",
    },

    // Car types
    carTypes: {
      all: "جميع الأنواع",
      sedan: "سيدان",
      suv: "دفع رباعي",
      luxury: "فاخرة",
      sports: "رياضية",
      economy: "اقتصادية",
    },

    // Fuel types
    fuelTypes: {
      petrol: "بنزين",
      diesel: "ديزل",
      electric: "كهربائية",
      hybrid: "هجين",
    },

    // Transmission
    transmissionTypes: {
      automatic: "أوتوماتيك",
      manual: "يدوي",
    },

    // Booking modal
    booking: {
      title: "احجز رحلتك",
      selectDays: "عدد الأيام",
      pickupDate: "تاريخ الاستلام",
      totalPrice: "السعر الإجمالي",
      confirm: "تأكيد الحجز",
      cancel: "إلغاء",
      success: "تم تأكيد الحجز!",
      successMessage: "سيارتك الفاخرة في انتظارك. سنتواصل معك قريباً.",
      days: "أيام",
      day: "يوم",
      notAvailable: "هذه السيارة غير متاحة حالياً",
    },

    // Admin
    admin: {
      title: "إدارة الأسطول",
      subtitle: "إدارة مخزون السيارات",
      addCar: "إضافة سيارة جديدة",
      editCar: "تعديل السيارة",
      deleteCar: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      nameEn: "الاسم (إنجليزي)",
      nameAr: "الاسم (عربي)",
      brand: "الماركة",
      imageUrl: "رابط الصورة",
      pricePerDay: "السعر لليوم",
      fuel: "نوع الوقود",
      transmission: "ناقل الحركة",
      seats: "عدد المقاعد",
      type: "نوع السيارة",
      available: "متاحة",
      actions: "الإجراءات",
      confirmDelete: "هل أنت متأكد من حذف هذه السيارة؟",
      carAdded: "تمت إضافة السيارة بنجاح",
      carUpdated: "تم تحديث السيارة بنجاح",
      carDeleted: "تم حذف السيارة بنجاح",
    },

    // Footer
    footer: {
      rights: "جميع الحقوق محفوظة",
      description:
        "خدمات تأجير سيارات فاخرة للمسافرين المميزين في منطقة الخليج.",
    },

    // Theme
    theme: {
      light: "الوضع الفاتح",
      dark: "الوضع الداكن",
    },
  },
} as const;

export type TranslationKey =
  (typeof translations)[Locale];
