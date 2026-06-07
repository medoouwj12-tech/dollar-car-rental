"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Car, CarFormData } from "@/types/car";
import { initialCars } from "@/data/initialCars";

interface CarContextType {
  cars: Car[];
  addCar: (data: CarFormData) => void;
  updateCar: (id: string, data: CarFormData) => void;
  deleteCar: (id: string) => void;
  getCarById: (id: string) => Car | undefined;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

/** Converts form data to a Car entity */
function formToCar(data: CarFormData, id: string): Car {
  return {
    id,
    name: { en: data.nameEn, ar: data.nameAr },
    brand: data.brand,
    image: data.image,
    pricePerDay: data.pricePerDay,
    specs: {
      fuel: data.fuel,
      transmission: data.transmission,
      seats: data.seats,
      type: data.type,
    },
    available: data.available,
    kmLimit: data.kmLimit,
    extraKmPrice: data.extraKmPrice,
    deposit: data.deposit,
  };
}

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars);

  const addCar = useCallback((data: CarFormData) => {
    const id = Date.now().toString();
    setCars((prev) => [...prev, formToCar(data, id)]);
  }, []);

  const updateCar = useCallback((id: string, data: CarFormData) => {
    setCars((prev) =>
      prev.map((car) => (car.id === id ? formToCar(data, id) : car))
    );
  }, []);

  const deleteCar = useCallback((id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  }, []);

  const getCarById = useCallback(
    (id: string) => cars.find((car) => car.id === id),
    [cars]
  );

  return (
    <CarContext.Provider
      value={{ cars, addCar, updateCar, deleteCar, getCarById }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCars must be used within CarProvider");
  }
  return context;
}
