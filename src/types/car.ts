/** Car type categories for filtering */
export type CarType = "sedan" | "suv" | "luxury" | "sports" | "economy";

/** Transmission options */
export type Transmission = "automatic" | "manual";

/** Fuel type options */
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";

/** Bilingual text structure */
export interface BilingualText {
  en: string;
  ar: string;
}

/** Car specifications */
export interface CarSpecs {
  fuel: FuelType;
  transmission: Transmission;
  seats: number;
  type: CarType;
}

/** Core car entity stored in mock database */
export interface Car {
  id: string;
  name: BilingualText;
  brand: string;
  image: string;
  pricePerDay: number;
  specs: CarSpecs;
  available: boolean;
  kmLimit?: number;
  extraKmPrice?: number;
  deposit?: number;
}

/** Form data for creating/editing cars in admin */
export interface CarFormData {
  nameEn: string;
  nameAr: string;
  brand: string;
  image: string;
  pricePerDay: number;
  fuel: FuelType;
  transmission: Transmission;
  seats: number;
  type: CarType;
  available: boolean;
  kmLimit?: number;
  extraKmPrice?: number;
  deposit?: number;
}

/** Booking filter state */
export interface FleetFilters {
  brand: string;
  minPrice: number;
  maxPrice: number;
  type: CarType | "all";
  searchQuery: string;
}

/** Hero search bar state */
export interface SearchParams {
  location: string;
  pickupDate: string;
  returnDate: string;
  carType: CarType | "all";
}
