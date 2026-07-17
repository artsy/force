import { HAMMER_PRICE_DIGIT_COUNT } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"

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
    USD: "$",
  }

  return CURRENCY_PREFIXES[currency] ?? `${currency} `
}

/**
 * The fixed-width digit string a puzzle’s guesses are scored against: the
 * realized price in USD cents (as fetched from Metaphysics), rounded to
 * whole dollars and zero-padded to at least HAMMER_PRICE_DIGIT_COUNT digits.
 * Returns null when the lot has no positive realized price (e.g. bought in),
 * which makes the puzzle unplayable.
 */
export const realizedPriceToTargetDigits = (
  centsUSD: number | null | undefined,
): string | null => {
  if (centsUSD == null || !Number.isFinite(centsUSD)) {
    return null
  }

  const price = Math.round(centsUSD / 100)

  if (price <= 0) {
    return null
  }

  const digitCount = Math.max(HAMMER_PRICE_DIGIT_COUNT, String(price).length)

  return priceToDigits({ price, digitCount })
}
