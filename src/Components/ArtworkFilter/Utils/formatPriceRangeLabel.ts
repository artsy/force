const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

/**
 * Turns a `priceRange` value ("*-5000", "1000-5000") into its label. Null when
 * unbounded, which is what the filter's cleared state looks like.
 */
export const formatPriceRangeLabel = (
  priceRange: string | undefined | null,
): string | null => {
  if (!priceRange) return null

  const [min, max] = priceRange.split("-")

  if (!min || !max) return null
  if (min === "*" && max === "*") return null

  const format = (amount: string): string => {
    return CURRENCY_FORMATTER.format(Number(amount))
  }

  if (min === "*") {
    return `Under ${format(max)}`
  }

  if (max === "*") {
    return `${format(min)} and up`
  }

  return `${format(min)}–${format(max)}`
}
