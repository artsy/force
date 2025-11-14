export const appendCurrencySymbol = (
  price: string | number | null | undefined,
  currency: string,
): string | number | null | undefined => {
  const pricePresent: boolean =
    typeof price === "string" || typeof price === "number"
  if (currency === "USD" && pricePresent) {
    const parts = String(price).split("Under ")
    return parts.length > 1 ? `Under US${parts[1]}` : `US${parts[0]}`
  }
  return price
}
