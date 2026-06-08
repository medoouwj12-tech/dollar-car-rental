import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "./BookingForm";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  );
}
