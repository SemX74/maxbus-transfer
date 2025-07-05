"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  MessageSquare,
  ArrowLeftRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { routes } from "@/lib/data";

// Zod schema for form validation
const bookingSchema = z.object({
  from: z.string().min(1, "Оберіть місце відправлення"),
  to: z.string().min(1, "Оберіть місце призначення"),
  date: z.string().min(1, "Дата є обов'язковою"),
  time: z.string().min(1, "Час є обов'язковим"),
  name: z.string().min(2, "Ім'я має містити принаймні 2 символи"),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, "Введіть правильний номер телефону (+380XXXXXXXXX)"),
  passengers: z
    .number()
    .min(1, "Кількість пасажирів має бути принаймні 1")
    .max(50, "Максимум 50 пасажирів"),
  comments: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const BookingForm = () => {
  const { toast } = useToast();
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique destinations from routes data
  const allDestinations = Array.from(
    new Set([
      ...routes.map((route) => route.from.ua),
      ...routes.map((route) => route.to.ua),
    ])
  );

  const otherDestinations = allDestinations.filter(
    (dest) => dest !== "Чернівці"
  );
  const [isFromChernivtsi, setIsFromChernivtsi] = useState(true);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      from: "Чернівці",
      to: "Сучава",
      date: "2025-07-06",
      time: "10:00",
      name: "Іван Петренко",
      phone: "+380982070169",
      passengers: 1,
      comments: "",
    },
  });

  const swapDestinations = () => {
    const currentFrom = form.getValues("from");
    const currentTo = form.getValues("to");

    if (isFromChernivtsi) {
      // Currently: Chernivtsi → Other, change to: Other → Chernivtsi
      const otherCity =
        currentTo !== "Чернівці" ? currentTo : otherDestinations[0];
      form.setValue("from", otherCity);
      form.setValue("to", "Чернівці");
    } else {
      // Currently: Other → Chernivtsi, change to: Chernivtsi → Other
      const otherCity =
        currentFrom !== "Чернівці" ? currentFrom : otherDestinations[0];
      form.setValue("from", "Чернівці");
      form.setValue("to", otherCity);
    }

    setIsFromChernivtsi(!isFromChernivtsi);
  };

  // Calculate estimated price
  const calculatePrice = () => {
    const fromCity = form.watch("from");
    const toCity = form.watch("to");
    const passengers = form.watch("passengers") || 1;

    // Find matching route
    const route = routes.find(
      (r) =>
        (r.from.ua === fromCity && r.to.ua === toCity) ||
        (r.from.ua === toCity && r.to.ua === fromCity)
    );

    if (route) {
      return route.pricing.adult * passengers;
    }

    return null;
  };

  const estimatedPrice = calculatePrice();

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Create route string for telegram message
      const routeData = {
        ...data,
        route: `${data.from} → ${data.to}`,
      };

      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "✅ Успішно!",
          description: result.message,
          duration: 5000,
        });
        form.reset();
      } else {
        toast({
          title: "❌ Помилка",
          description: result.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "❌ Помилка",
        description: "Сталася несподівана помилка. Спробуйте ще раз.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Route Selection */}
                    <div className="md:col-span-2">
                      <FormLabel className="flex items-center text-sm font-medium text-card-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {t("booking.route")}
                      </FormLabel>

                      <div className="grid grid-cols-5 gap-2 items-end">
                        {/* From - Static or Select */}
                        <div className="col-span-2">
                          {isFromChernivtsi ? (
                            <FormField
                              control={form.control}
                              name="from"
                              render={() => (
                                <FormItem>
                                  <FormLabel className="text-xs text-muted-foreground mb-1">
                                    {t("booking.fromLabel")}
                                  </FormLabel>
                                  <FormControl>
                                    <div className="h-12 px-3 py-2 border border-input bg-muted rounded-md flex items-center font-medium text-sm">
                                      Чернівці
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormField
                              control={form.control}
                              name="from"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-muted-foreground mb-1">
                                    {t("booking.fromLabel")}
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <SelectTrigger className="h-12 text-sm">
                                        <SelectValue placeholder="Місто" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {otherDestinations.map((city) => (
                                          <SelectItem key={city} value={city}>
                                            {city}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        {/* Swap Button */}
                        <div className="col-span-1 flex justify-center relative">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={swapDestinations}
                            className="h-12 w-10 p-0 rounded-lg border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            title={t("booking.swapTooltip")}
                          >
                            <ArrowLeftRight className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* To - Select or Static */}
                        <div className="col-span-2">
                          {isFromChernivtsi ? (
                            <FormField
                              control={form.control}
                              name="to"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-muted-foreground mb-1">
                                    {t("booking.toLabel")}
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <SelectTrigger className="h-12 text-sm">
                                        <SelectValue
                                          placeholder={t(
                                            "booking.cityPlaceholder"
                                          )}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {otherDestinations.map((city) => (
                                          <SelectItem key={city} value={city}>
                                            {city}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormField
                              control={form.control}
                              name="to"
                              render={() => (
                                <FormItem>
                                  <FormLabel className="text-xs text-muted-foreground mb-1">
                                    Куди
                                  </FormLabel>
                                  <FormControl>
                                    <div className="h-12 px-3 py-2 border border-input bg-muted rounded-md flex items-center font-medium text-sm">
                                      Чернівці
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      {/* Date */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-card-foreground">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              {t("booking.travelDate")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="h-12"
                                min={new Date().toISOString().split("T")[0]}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Time */}
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-card-foreground">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              {t("booking.departureTime")}
                            </FormLabel>
                            <FormControl>
                              <Input type="time" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-medium text-card-foreground">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            {t("booking.fullName")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("booking.fullNamePlaceholder")}
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-medium text-card-foreground">
                            <Phone className="h-4 w-4 mr-2 text-primary" />
                            {t("booking.phoneNumber")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+380961691642"
                              type="tel"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Passengers */}
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="flex items-center text-sm font-medium text-card-foreground">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            {t("booking.numberOfPassengers")}
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue
                                  placeholder={t("booking.selectQuantity")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 20 }, (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1}{" "}
                                  {i + 1 === 1
                                    ? t("booking.passenger")
                                    : t("booking.passengers2")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Comments (Optional) */}
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="flex items-center text-sm font-medium text-card-foreground">
                            <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                            {t("booking.commentsOptional")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("booking.commentsPlaceholder")}
                              {...field}
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Price Estimate */}
                  {estimatedPrice && (
                    <div className="pt-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {t("booking.priceEstimate")}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {estimatedPrice}€
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("booking.priceFor")} {form.watch("passengers")}{" "}
                          {form.watch("passengers") === 1
                            ? t("booking.priceForPassenger")
                            : t("booking.priceForPassengers")}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold h-14 text-lg shadow-elegant disabled:opacity-50"
                    >
                      {isSubmitting
                        ? t("booking.sending")
                        : t("booking.bookTripBtn")}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
