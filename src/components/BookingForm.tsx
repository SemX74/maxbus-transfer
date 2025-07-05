"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

import BookingFormExctracted from "./BookingFormExctracted";

const BookingForm = () => {
  const t = useTranslations();

  return (
    <section
      id="booking-form"
      className="py-20 bg-muted relative overflow-hidden"
    >
      {/* Diagonal Background Element */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-primary opacity-5 transform -skew-x-12 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("booking.title")}{" "}
            <span className="text-primary">{t("booking.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("booking.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-card border-0 bg-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-card-foreground">
                {t("booking.formTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookingFormExctracted showTitle={false} showPrice={true} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
