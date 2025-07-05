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

  const otherDestinations = ["Сучава", "Ясси", "Кишинів", "Бухарест"];
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
    const currentOtherCity = isFromChernivtsi
      ? form.getValues("to")
      : form.getValues("from");

    if (isFromChernivtsi) {
      // Currently: Chernivtsi → Other, change to: Other → Chernivtsi
      form.setValue("from", currentOtherCity);
      form.setValue("to", "Чернівці");
    } else {
      // Currently: Other → Chernivtsi, change to: Chernivtsi → Other
      form.setValue("from", "Чернівці");
      form.setValue("to", currentOtherCity);
    }

    setIsFromChernivtsi(!isFromChernivtsi);
  };

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
                        Маршрут
                      </FormLabel>

                      <div className="grid grid-cols-5 gap-2 items-end">
                        {/* From - Static or Select */}
                        <div className="col-span-2 relative">
                          <div className="absolute -top-2 left-2 px-1 bg-card text-xs text-muted-foreground z-10">
                            Звідки
                          </div>
                          {isFromChernivtsi ? (
                            <FormField
                              control={form.control}
                              name="from"
                              render={() => (
                                <FormItem>
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
                            title="Поміняти напрямок"
                          >
                            <ArrowLeftRight className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* To - Select or Static */}
                        <div className="col-span-2 relative">
                          <div className="absolute -top-2 left-2 px-1 bg-card text-xs text-muted-foreground z-10">
                            Куди
                          </div>
                          {isFromChernivtsi ? (
                            <FormField
                              control={form.control}
                              name="to"
                              render={({ field }) => (
                                <FormItem>
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
                          ) : (
                            <FormField
                              control={form.control}
                              name="to"
                              render={() => (
                                <FormItem>
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
                              Дата поїздки
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
                              Час відправлення
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
                            Повне ім&apos;я
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Іван Петренко"
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
                            Номер телефону
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+380991234567"
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
                            Кількість пасажирів
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Оберіть кількість" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 20 }, (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1} {i + 1 === 1 ? "пасажир" : "пасажири"}
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
                            Коментарі (необов&apos;язково)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Додаткові побажання або питання..."
                              {...field}
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold h-14 text-lg shadow-elegant disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Відправляємо..."
                        : "🚐 Забронювати поїздку"}
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
