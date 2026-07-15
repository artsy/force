export interface PriceToDigitsParams {
  price: number
  digitCount: number
}

/**
 * Converts an integer price (in major currency units) to a fixed-width digit
 * string, zero-padded on the left. Leading zeroes are intentional: guesses
 * are compared position by position against this string.
 */
export const priceToDigits = ({
  price,
  digitCount,
}: PriceToDigitsParams): string => {
  if (!Number.isInteger(price) || price < 0) {
    throw new Error("priceToDigits: price must be a non-negative integer")
  }

  const digits = String(price)

  if (digits.length > digitCount) {
    throw new Error(
      `priceToDigits: price ${price} does not fit in ${digitCount} digits`,
    )
  }

  return digits.padStart(digitCount, "0")
}

export interface HasSeparatorBeforeParams {
  index: number
  digitCount: number
}

/**
 * Returns true when a thousands separator should be rendered *before* the
 * digit at `index` in a fixed-width digit string of length `digitCount`.
 * Separators are purely visual and are never editable characters.
 */
export const hasSeparatorBefore = ({
  index,
  digitCount,
}: HasSeparatorBeforeParams): boolean => {
  return index > 0 && (digitCount - index) % 3 === 0
}

export interface FormatDigitsWithSeparatorsParams {
  /** A partial or complete digit string, filled left to right */
  digits: string
  /** The fixed width of the puzzle; defaults to the length of `digits` */
  digitCount?: number
}

/**
 * Formats a digit string with thousands separators aligned to the fixed
 * puzzle width, e.g. { digits: "0985000", digitCount: 7 } → "0,985,000".
 * Partial entries are formatted by their position from the left, so the
 * separators never move as the player types.
 */
export const formatDigitsWithSeparators = ({
  digits,
  digitCount = digits.length,
}: FormatDigitsWithSeparatorsParams): string => {
  return digits
    .split("")
    .map((digit, index) => {
      const separator = hasSeparatorBefore({ index, digitCount }) ? "," : ""

      return `${separator}${digit}`
    })
    .join("")
}

/**
 * Display prefix for a currency code, matching how Metaphysics renders
 * auction-result prices (e.g. “US$98,385,000”, “£212,500”).
 */
export const currencyPrefix = (currency: string): string => {
  const CURRENCY_PREFIXES: Record<string, string> = {
    AUD: "AU$",
    CAD: "CA$",
    CHF: "CHF ",
    CNY: "CN¥",
    EUR: "€",
    GBP: "£",
    HKD: "HK$",
    JPY: "¥",
    USD: "US$",
  }

  return CURRENCY_PREFIXES[currency] ?? `${currency} `
}

export interface FormatPriceParams {
  price: number
  currency: string
}

/** Formats an integer price for display, e.g. { price: 212500, currency: "GBP" } → "£212,500" */
export const formatPrice = ({ price, currency }: FormatPriceParams): string => {
  return `${currencyPrefix(currency)}${price.toLocaleString("en-US")}`
}

export interface FormatRealizedPriceParams {
  priceRealizedUSD: number
  priceRealized: number
  currency: string
}

export interface RealizedPriceDisplay {
  /** The USD figure the player was guessing, e.g. “US$279,563” */
  usd: string
  /** The native-currency figure, present only when the sale was not in USD, e.g. “£212,500” */
  native: string | null
}

/**
 * The realized price for the end-of-game reveal. USD is primary (it is what
 * was guessed); the native price is included only when the sale currency
 * differs, matching how the auction-result page shows both.
 */
export const formatRealizedPrice = ({
  priceRealizedUSD,
  priceRealized,
  currency,
}: FormatRealizedPriceParams): RealizedPriceDisplay => {
  return {
    usd: formatPrice({ price: priceRealizedUSD, currency: "USD" }),
    native:
      currency === "USD"
        ? null
        : formatPrice({ price: priceRealized, currency }),
  }
}
