export const appendCurrencySymbol = (
  price: string | number | null | undefined,
  currency: string
): string | number | null | undefined => {
  const pricePresent: boolean =
    typeof price === "string" || typeof price == "number"
  if (currency === "USD" && pricePresent) {
    return "US" + price
  }
  return price
}
