export const ARTA_FULFILLMENT_TYPES = [
  "ARTSY_STANDARD",
  "ARTSY_EXPRESS",
  "ARTSY_WHITE_GLOVE",
]

// Types submittable via setOrderFulfillmentOption. SHIPPING_TBD and PICKUP are excluded.
export const SELECTABLE_TYPES = [
  "DOMESTIC_FLAT",
  "INTERNATIONAL_FLAT",
  ...ARTA_FULFILLMENT_TYPES,
]

// TODO: Get these from MP
export const deliveryOptionLabel = (
  type?: string | null,
  cost?: number | null,
) => {
  const isFree = cost === 0

  switch (type) {
    case "DOMESTIC_FLAT":
      return isFree ? "Free" : "Flat rate"
    case "INTERNATIONAL_FLAT":
      return isFree ? "Free" : "Flat rate"
    case "ARTSY_STANDARD":
      return "Standard"
    case "ARTSY_EXPRESS":
      return "Express"
    case "ARTSY_WHITE_GLOVE":
      return "White Glove"
    case "SHIPPING_TBD":
      return "Shipping to be confirmed by seller"
    default:
      return `Shipping details unavailable: Delivery type returned "${type}"`
  }
}

const today = new Date()

export const deliveryOptionTimeEstimate = (
  type?: string | null,
  from: Date = today,
): [string, string] | null => {
  switch (type) {
    case "DOMESTIC_FLAT":
      return ["Est. delivery", "3-5 days after shipping"]
    case "INTERNATIONAL_FLAT":
      return ["Est. delivery", "3-5 days after shipping"]
    case "ARTSY_STANDARD":
      return ["Est. delivery", "3-5 days after shipping"]
    case "ARTSY_EXPRESS":
      return ["Est. delivery", "2 days after shipping"]
    case "ARTSY_WHITE_GLOVE":
      return ["", "Delivery timing varies"]
    case "SHIPPING_TBD":
      return [
        "Shipping details will be updated after checkout. You will be able to review and approve the final total before purchase",
        "",
      ]
    default:
      return ["Something went wrong.", "Please contact orders@artsy.net"]
  }
}
