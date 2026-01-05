import type { ProcessedUserAddress } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"

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
  HIDDEN = "HIDDEN",
}

export type CheckoutStep = {
  name: CheckoutStepName
  state: CheckoutStepState
}

export type ExpressCheckoutPaymentMethod = "applePay" | "googlePay"

export type FulfillmentDetailsTab = "DELIVERY" | "PICKUP"

export type UserAddressMode =
  | {
      mode: "add"
    }
  | {
      mode: "edit"
      address: ProcessedUserAddress
    }
