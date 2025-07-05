import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ua"];
const defaultLocale = "ua";

function getLocale(request: NextRequest): string {
  // Check if locale is stored in cookie (user explicitly chose language)
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  // Default to Ukrainian for majority of users
  // Only check Accept-Language header if we want to be more specific
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    // Simple parsing of Accept-Language header
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    // Prioritize Ukrainian detection
    for (const lang of preferredLanguages) {
      if (lang === "uk" || lang === "uk-ua" || lang === "ua") {
        return "ua";
      }
    }

    // Only fallback to English if explicitly English and no Ukrainian preference
    for (const lang of preferredLanguages) {
      if (lang === "en" || lang.startsWith("en-")) {
        return "en";
      }
    }
  }

  // Default to Ukrainian (majority of users)
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // Skip API routes, static files, and Next.js internal paths
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon.ico") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const locale = getLocale(request);

  // Create response and set locale in headers for next-intl
  const response = NextResponse.next();
  response.headers.set("X-NEXT-INTL-LOCALE", locale);

  // Set cookie if it doesn't exist or is different
  const currentCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (currentCookie !== locale) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
