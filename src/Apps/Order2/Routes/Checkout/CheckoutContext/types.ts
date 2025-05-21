export enum CheckoutStepName {
  OFFER_AMOUNT = "OFFER_AMOUNT",
  FULFILLMENT_DETAILS = "FULFILLMENT_DETAILS",
  DELIVERY_OPTION = "DELIVERY_OPTION",
  PAYMENT = "PAYMENT",
  CONFIRMATION = "CONFIRMATION",
}

export enum CheckoutStepState {
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  HIDDEN = "HIDDEN", // TODO: Use this for missing fulfillment option/shipping quote step?
}

export type CheckoutStep = {
  name: CheckoutStepName
  state: CheckoutStepState
}

export type CheckoutLoadingError = "missing_line_item_data"

export type ExpressCheckoutPaymentMethod = "applePay" | "googlePay"

export type FulfillmentDetailsTab = "DELIVERY" | "PICKUP"
