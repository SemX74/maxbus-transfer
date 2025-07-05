import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import heroBus from "@/assets/hero-bg.png";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import AnimatedCounter from "@/components/ui/animated-counter";

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
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
      </div>

      {/* Diagonal Shape Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-primary transform skew-x-12 origin-top-right opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
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
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t("hero.title")}
              <span className="block text-primary">
                {" "}
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
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
                className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 py-4 text-lg shadow-elegant"
              >
                {t("hero.bookingBtn")}
                <ArrowRight className="ml-2 h-5 w-5" />
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
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={10000} />+
                </div>
                <div className="text-gray-300">{t("hero.stats.customers")}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={5} />
                </div>
                <div className="text-gray-300">{t("hero.stats.years")}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={100} />%
                </div>
                <div className="text-gray-300">{t("hero.stats.onTime")}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Large Logo - Desktop Only */}

          <div className="bg-white/10 w-fit backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <Logo className="h-80 w-80 text-white" />
          </div>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
