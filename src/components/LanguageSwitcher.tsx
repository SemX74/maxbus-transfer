"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

type Locale = "en" | "ua";

const languages = {
  en: { label: "English", flag: "🇺🇸" },
  ua: { label: "Українська", flag: "🇺🇦" },
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Set the locale in a cookie
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; samesite=lax`;

      // Refresh the page to apply the new locale
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={isPending}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden md:inline">
            {languages[locale].flag} {languages[locale].label}
          </span>
          <span className="md:hidden">{languages[locale].flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code as Locale)}
            className={`cursor-pointer ${locale === code ? "bg-accent" : ""}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
