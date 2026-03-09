import { Site } from "../Site";

export const getFormattedPrice = (siteData: Site, price: string): string => {
  const lang = siteData?.locale?.languageCode || 'en';
  const country = siteData?.locale?.countryCode || 'US';
  const currency = siteData?.locale?.currencyCode || 'USD';
  const locale = `${lang}-${country}`;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(Number(price));
};
