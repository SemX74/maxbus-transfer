import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
  routes,
  formatPrice,
  getInfantPriceText,
  type RouteData,
} from "@/lib/data";

const PopularRoutes = () => {
  const t = useTranslations();
  const locale = useLocale();

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Diagonal Background Elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-gradient-primary opacity-5 transform skew-x-12 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-secondary opacity-5 transform -skew-x-12 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("routes.title")}{" "}
            <span className="text-primary">{t("routes.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("routes.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {routes.map((route: RouteData, index: number) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center justify-between text-card-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-lg font-bold">
                        {locale === "uk" ? route.from.ua : route.from.en}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">
                        {locale === "uk" ? route.to.ua : route.to.en}
                      </span>
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(route.pricing.adult, route.pricing.currency)}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {locale === "uk"
                          ? route.duration.ua
                          : route.duration.en}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-card-foreground text-sm">
                      {t("routes.pricing.adults")}:
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("routes.pricing.adults")}:
                        </span>
                        <span className="font-semibold text-primary">
                          {formatPrice(
                            route.pricing.adult,
                            route.pricing.currency
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("routes.pricing.children")}:
                        </span>
                        <span className="font-semibold text-primary">
                          {formatPrice(
                            route.pricing.child,
                            route.pricing.currency
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("routes.pricing.infants")}:
                        </span>
                        <span className="font-semibold text-green-600">
                          {getInfantPriceText(locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={scrollToBooking}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold shadow-elegant group-hover:shadow-lg transition-all duration-300"
                  >
                    {t("routes.bookBtn")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
