export interface RouteData {
  id: string;
  offerId: string;
  from: {
    en: string;
    ua: string;
  };
  to: {
    en: string;
    ua: string;
  };
  duration: {
    en: string;
    ua: string;
  };
  pricing: {
    adult: number;
    child: number;
    infant: number;
    currency: string;
  };
  vipPricing?: {
    adult: number;
    child: number;
    infant: number;
    currency: string;
  };
  popular: boolean;
  distance?: string;
  vehicle?: string;
}

export const routes: RouteData[] = [
  {
    id: "1",
    offerId: "che-suchava",
    from: {
      en: "Chernivtsi",
      ua: "Чернівці",
    },
    to: {
      en: "Suceava",
      ua: "Сучава",
    },
    duration: {
      en: "~2.5 – 3 hours",
      ua: "~2.5 – 3 години",
    },
    pricing: {
      adult: 20,
      child: 10,
      infant: 0,
      currency: "€",
    },
    vipPricing: {
      adult: 150,
      child: 100,
      infant: 0,
      currency: "€",
    },
    popular: true,
    distance: "45 km",
    vehicle: "Mercedes Sprinter",
  },
  {
    id: "2",
    offerId: "che-iasi",
    from: {
      en: "Chernivtsi",
      ua: "Чернівці",
    },
    to: {
      en: "Iasi",
      ua: "Ясси",
    },
    duration: {
      en: "~4 – 5 hours",
      ua: "~4 – 5 годин",
    },
    pricing: {
      adult: 40,
      child: 20,
      infant: 0,
      currency: "€",
    },
    vipPricing: {
      adult: 250,
      child: 180,
      infant: 0,
      currency: "€",
    },
    popular: true,
    distance: "120 km",
    vehicle: "Mercedes Sprinter",
  },
  {
    id: "3",
    offerId: "che-kishinev",
    from: {
      en: "Chernivtsi",
      ua: "Чернівці",
    },
    to: {
      en: "Kishinev",
      ua: "Кишинев",
    },
    duration: {
      en: "~6 – 7 hours",
      ua: "~6 – 7 годин",
    },
    pricing: {
      adult: 40,
      child: 20,
      infant: 0,
      currency: "€",
    },
    vipPricing: {
      adult: 280,
      child: 200,
      infant: 0,
      currency: "€",
    },
    popular: false,
    distance: "180 km",
    vehicle: "Mercedes Sprinter",
  },
  {
    id: "4",
    offerId: "che-bucharest",
    from: {
      en: "Chernivtsi",
      ua: "Чернівці",
    },
    to: {
      en: "Bucharest",
      ua: "Бухарест",
    },
    duration: {
      en: "~8 – 9 hours",
      ua: "~8 – 9 годин",
    },
    pricing: {
      adult: 60,
      child: 40,
      infant: 0,
      currency: "€",
    },
    vipPricing: {
      adult: 400,
      child: 300,
      infant: 0,
      currency: "€",
    },
    popular: true,
    distance: "420 km",
    vehicle: "Mercedes Sprinter",
  },
];

// Helper function to get route by offer ID
export const getRouteByOfferId = (offerId: string): RouteData | undefined => {
  return routes.find((route) => route.offerId === offerId);
};

// Helper function to get popular routes
export const getPopularRoutes = (): RouteData[] => {
  return routes.filter((route) => route.popular);
};

// Helper function to get VIP routes (routes that have VIP pricing)
export const getVipRoutes = (): RouteData[] => {
  return routes.filter((route) => route.vipPricing);
};

// Helper function to format price
export const formatPrice = (price: number, currency: string): string => {
  return `${price}${currency}`;
};

// Helper function to get free text for infants
export const getInfantPriceText = (locale: string): string => {
  return locale === "ua" ? "Безкоштовно" : "Free";
};

// Helper function to get VIP routes for pricing display
export const getVipPricingData = () => {
  return routes
    .filter((route) => route.vipPricing)
    .map((route) => ({
      destination: route.to,
      price: route.vipPricing!.adult,
      currency: route.vipPricing!.currency,
    }));
};
