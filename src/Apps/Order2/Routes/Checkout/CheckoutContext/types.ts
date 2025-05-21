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

export interface CheckoutState {
  isLoading: boolean
  loadingError: CheckoutLoadingError | null
  expressCheckoutPaymentMethods: ExpressCheckoutPaymentMethod[] | null
  steps: CheckoutStep[]
}

export interface CheckoutActions {
  setExpressCheckoutLoaded: (
    availablePaymentMethods: ExpressCheckoutPaymentMethod[],
  ) => void
  setFulfillmentDetailsComplete: (args: { isPickup: boolean }) => void
  editFulfillmentDetails: () => void
  setLoadingError: (error: CheckoutLoadingError | null) => void
  setLoadingComplete: () => void
}
