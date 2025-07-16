import type { HeroDataType } from "../mainpage/Hero/data";

export function formatPrice(price: number, currency = "N", locale = "en-NG") {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}

export const uniqueByName = (products: HeroDataType[]) =>
  products.filter(
    (product: HeroDataType, index: number, self) =>
      index ===
      self.findIndex((p) => p.name.toLowerCase() === product.name.toLowerCase())
  );
