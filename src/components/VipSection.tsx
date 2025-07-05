import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Star,
  ArrowRight,
  Clock,
  Shield,
  Wifi,
  Coffee,
  Car,
  Plane,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { getVipPricingData, formatPrice } from "@/lib/data";

const VipSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  const vipPricing = getVipPricingData();

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const vipFeatures = [
    {
      icon: Car,
      title: t("serviceOptions.vip.features.0.title"),
      description: t("serviceOptions.vip.features.0.description"),
    },
    {
      icon: Clock,
      title: t("serviceOptions.vip.features.1.title"),
      description: t("serviceOptions.vip.features.1.description"),
    },
    {
      icon: Plane,
      title: t("serviceOptions.vip.features.2.title"),
      description: t("serviceOptions.vip.features.2.description"),
    },
    {
      icon: Shield,
      title: t("serviceOptions.vip.features.3.title"),
      description: t("serviceOptions.vip.features.3.description"),
    },
    {
      icon: Wifi,
      title: t("serviceOptions.vip.features.4.title"),
      description: t("serviceOptions.vip.features.4.description"),
    },
    {
      icon: Coffee,
      title: t("serviceOptions.vip.features.5.title"),
      description: t("serviceOptions.vip.features.5.description"),
    },
  ];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Diagonal Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-primary opacity-10 transform -skew-x-12 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-1/4 h-2/3 bg-white opacity-5 transform skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-white">
              {t("serviceOptions.specialTitle")}{" "}
              <span className="text-primary">
                {t("serviceOptions.specialTitleHighlight")}
              </span>
            </h2>
            <Sparkles className="h-8 w-8 text-primary ml-3" />
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t("serviceOptions.specialSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* VIP Service Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/vip/IMG_4586.JPG"
                    alt="VIP Mercedes V-Class Service"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t("serviceOptions.vip.badge")}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-white/20"
            >
              <div className="text-sm font-semibold text-gray-800 mb-2">
                {t("serviceOptions.vip.priceTitle")}
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                {vipPricing.map((route, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {locale === "ua"
                        ? route.destination.ua
                        : route.destination.en}
                      :
                    </span>
                    <span className="font-bold text-primary">
                      {formatPrice(route.price, route.currency)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* VIP Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-white mr-3">
                  {t("serviceOptions.vip.vehicle")}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center text-gray-200 mb-4">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>{t("serviceOptions.vip.capacity")}</span>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vipFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 rounded-lg p-2 flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Button
                onClick={scrollToBooking}
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold h-12 shadow-elegant text-lg"
              >
                {t("serviceOptions.vip.bookBtn")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VipSection;
