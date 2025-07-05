import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import heroBus from "../../public/hero-bg.png";
import Image from "next/image";
import Lottie from "lottie-react";
import logoAnimation from "../../public/logo.json";
import logoBgAnimation from "../../public/logo-bg-2.json";
import AnimatedCounter from "@/components/ui/animated-counter";
import BookingFormExctracted from "./BookingFormExctracted";

const Hero = () => {
  const t = useTranslations();

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBus}
          alt="Luxury Bus Transfer"
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute backdrop-blur-sm  max-sm:bg-black/40 inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
      </div>

      {/* Diagonal Shape Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-primary transform skew-x-12 origin-top-right opacity-20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center text-center lg:text-left">
          {/* Logo - Mobile Top */}
          <motion.div className="lg:hidden bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg mb-8 flex justify-center">
            <div className="relative flex justify-center">
              <Lottie
                animationData={logoAnimation}
                loop={false}
                className="h-auto w-2/3 relative z-10"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="space-y-6 lg:space-y-8"
          >
            <Lottie
              animationData={logoAnimation}
              loop={false}
              className="h-96 w-96 -mb-10 lg:h-auto max-lg:hidden lg:w-[15rem] relative z-10"
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              <span className="text-primary">{t("hero.title")}</span>{" "}
              {t("hero.titleHighlight")}
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-elegant"
              >
                {t("hero.bookingBtn")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.8,
              }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-white/20"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  <AnimatedCounter value={10000} />+
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  {t("hero.stats.customers")}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {">"}
                  <AnimatedCounter value={8} />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  {t("hero.stats.years")}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  <AnimatedCounter value={100} />%
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  {t("hero.stats.onTime")}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="max-lg:hidden"
          >
            <BookingFormExctracted showTitle showPrice={false} />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.2,
        }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
