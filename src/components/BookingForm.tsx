import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

const BookingForm = () => {
  const { toast } = useToast();
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    toast({
      title: t("booking.successTitle"),
      description: t("booking.successMessage"),
    });
    setFormData({
      name: "",
      phone: "",
      destination: "",
      date: "",
      time: "",
      passengers: "1",
    });
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-card-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {t("booking.fullName")}
                    </label>
                    <Input
                      placeholder={t("booking.fullNamePlaceholder")}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-card-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {t("booking.phoneNumber")}
                    </label>
                    <Input
                      placeholder={t("booking.phoneNumberPlaceholder")}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-card-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {t("booking.destinationLabel")}
                    </label>
                    <Input
                      placeholder={t("booking.destinationFormPlaceholder")}
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destination: e.target.value,
                        })
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-card-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {t("booking.travelDate")}
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-card-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {t("booking.departureTime")}
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Passengers */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-card-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {t("booking.numberOfPassengers")}
                    </label>
                    <Select
                      value={formData.passengers}
                      onValueChange={(value) =>
                        setFormData({ ...formData, passengers: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue
                          placeholder={t("booking.selectPassengers")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}{" "}
                            {i + 1 === 1
                              ? t("booking.passenger")
                              : t("booking.passengers")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold h-14 text-lg shadow-elegant"
                  >
                    {t("booking.bookNowBtn")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
