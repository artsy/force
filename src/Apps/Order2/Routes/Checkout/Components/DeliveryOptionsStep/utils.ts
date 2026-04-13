// TODO: Get these from MP
export const deliveryOptionLabel = (type?: string | null) => {
  switch (type) {
    case "DOMESTIC_FLAT":
      return "Flat rate"
    case "INTERNATIONAL_FLAT":
      return "Flat rate"
    case "ARTSY_STANDARD":
      return "Standard"
    case "ARTSY_EXPRESS":
      return "Express"
    case "ARTSY_STANDARD_INTERNATIONAL":
      return "Standard"
    case "ARTSY_EXPRESS_INTERNATIONAL":
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
      return ["Est. delivery", "5-10 days after shipping"]
    case "ARTSY_STANDARD":
      return ["Est. delivery", "3-5 days after shipping"]
    case "ARTSY_STANDARD_INTERNATIONAL":
      return ["Est. delivery", "5-10 days after shipping"]
    case "ARTSY_EXPRESS":
      return ["Est. delivery", "2 days after shipping"]
    case "ARTSY_EXPRESS_INTERNATIONAL":
      return ["Est. delivery", "3-7 days after shipping"]
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
