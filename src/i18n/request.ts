import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  // Get locale from middleware headers or fallback to default
  const headersList = await headers();
  const locale = headersList.get("X-NEXT-INTL-LOCALE") || "ua";

  // Ensure that a valid locale is used
  const validLocale = ["en", "ua"].includes(locale) ? locale : "ua";

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
