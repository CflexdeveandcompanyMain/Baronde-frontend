export function formatPrice(price: number, currency = "N", locale = "en-NG") {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
