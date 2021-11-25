import { toNumber, isNumber } from "lodash"

export const appendCurrencySymbol = (
  price: string | number | null | undefined,
  currency: string
): string | number | null | undefined => {
  const isUSCurrency = currency === "USD"
  const priceInvalid =
    price === null || price === undefined || currency !== "USD"

  // return early when price is falsy or not a US currency
  if (priceInvalid) {
    return price
  }
  // when price is a number instead of a string
  if (typeof price === "number") {
    return handleInteger(price)
  }
  if (isUSCurrency && isPriceValid(price)) {
    // when price is a valid price but does not have a "$" appended
    if (!price!.includes("$") && price) {
      return "US$" + price
    }
    // when price is a range or already has a "$" appended
    return price?.replaceAll("$", "US$")
  }
  return price
}

const isPriceValid = (price): boolean => {
  // e.g. price = "Under $2000"
  if (price!.includes("$")) {
    return true
  }
  // e.g. price is a non-numerical value
  // e.g. price = "-" and we don't want to show "US$-" in the UI
  if (Number.isNaN(toNumber(price))) {
    return false
  }
  // e.g. price is string but otherwise a valid numerical value
  // e.g. price = "4,000"
  return isNumber(toNumber(price))
}

export const handleInteger = (price: number): string => {
  return "US$" + String(price)
}
