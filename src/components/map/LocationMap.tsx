"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Phone, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import LeafletMap from "./LeafletMap";

const LocationMap = () => {
  const t = useTranslations();

  const locations = [
    {
      name: t("locationMap.locations.chernivtsi.name"),
      address: t("locationMap.locations.chernivtsi.address"),
      hours: t("locationMap.locations.chernivtsi.hours"),
      phone: t("locationMap.locations.chernivtsi.phone"),
      features: [
        t("locationMap.locations.chernivtsi.features.0"),
        t("locationMap.locations.chernivtsi.features.1"),
        t("locationMap.locations.chernivtsi.features.2"),
        t("locationMap.locations.chernivtsi.features.3"),
      ],
    },
  ];

  // Map configuration
  const position: [number, number] = [48.25760006570209, 25.956984827289816];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("locationMap.title")}{" "}
            <span className="text-primary">
              {t("locationMap.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("locationMap.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Location Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t("locationMap.primaryHubLocations")}
              </h3>

              <div className="space-y-6">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card p-6 rounded-lg shadow-card border border-border"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-card-foreground mb-2">
                          {location.name}
                        </h4>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-start">
                            <Navigation className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">
                              {location.address}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-primary" />
                            {location.phone}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {location.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pickup Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/5 border border-primary/20 p-4 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-card-foreground font-medium">
                    {t("locationMap.pickupNote")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="overflow-hidden shadow-card bg-card border-0">
              <CardContent className="p-0">
                <div className="h-[500px] relative">
                  <LeafletMap
                    center={position}
                    markerPosition={position}
                    popupContent={{
                      title: locations[0].name,
                      address: locations[0].address,
                    }}
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
