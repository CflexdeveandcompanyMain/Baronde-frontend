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
      self.findIndex(
        (p) => p.name && p.name.toLowerCase() === product.name.toLowerCase()
      )
  );

export const dateEE = (d: string) => {
  const iso = d;
  const date = new Date(iso);

  const formatted =
    date.getFullYear() +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0");
  return formatted;
};
