import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Zod schema for form validation
const bookingSchema = z.object({
  route: z.string().min(1, "Маршрут є обов'язковим"),
  date: z.string().min(1, "Дата є обов'язковою"),
  time: z.string().min(1, "Час є обов'язковим"),
  timeLabel: z.string().optional(),
  name: z.string().min(2, "Ім'я має містити принаймні 2 символи"),
  phone: z
    .string()
    .refine(
      (val) =>
        !!val && (isValidPhoneNumber(val) || isValidPhoneNumber(val, "UA")),
      {
        message: "Введіть правильний номер телефону",
      }
    ),
  phoneCountry: z.string().nullable().optional(),
  passengers: z
    .number()
    .min(1, "Кількість пасажирів має бути принаймні 1")
    .max(50, "Максимум 50 пасажирів"),
  email: z
    .string()
    .email("Введіть правильну електронну пошту")
    .optional()
    .or(z.literal("")),
  comments: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = bookingSchema.parse(body);

    // Normalize phone to E.164 (falls back to UA for local-format numbers)
    const phone =
      (
        parsePhoneNumberFromString(validatedData.phone) ??
        parsePhoneNumberFromString(validatedData.phone, "UA")
      )?.number ?? validatedData.phone;

    // Format the message
    const message = `🚐 НОВА ЗАЯВКА

Маршрут: ${validatedData.route}
Дата: ${validatedData.date}
Час ${validatedData.timeLabel || "вильоту"}: ${validatedData.time}
Ім'я: ${validatedData.name}
Пасажирів: ${validatedData.passengers}${
      validatedData.email ? `\nEmail: ${validatedData.email}` : ""
    }${validatedData.comments ? `\nКоментарі: ${validatedData.comments}` : ""}

👉 Подзвонити: ${phone}${
      validatedData.phoneCountry ? ` (${validatedData.phoneCountry})` : ""
    }`;

    // Create inline keyboard with messaging options
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: "💬 WhatsApp",
            url: `https://wa.me/${phone.replace("+", "")}`,
          },
        ],
      ],
    };

    // Send message to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          reply_markup: keyboard,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      throw new Error(
        `Telegram API error: ${errorData.description || "Unknown error"}`
      );
    }

    const result = await response.json();
    console.log("Message sent successfully:", result);

    return NextResponse.json({
      success: true,
      message: "Заявка успішно відправлена!",
    });
  } catch (error) {
    console.error("Error sending to Telegram:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Помилка валідації форми",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Помилка при відправці заявки. Спробуйте ще раз.",
      },
      { status: 500 }
    );
  }
}
