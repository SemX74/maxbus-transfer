"use client";
import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import PopularRoutes from "@/components/PopularRoutes";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import LocationMap from "@/components/map/LocationMap";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import VipSection from "@/components/VipSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <Hero />
      <PopularRoutes />
      <Testimonials />
      <BookingForm />
      <VipSection />
      <LocationMap />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
