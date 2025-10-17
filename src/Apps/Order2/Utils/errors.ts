export { CheckoutMutationError } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"

type ExchangeErrorCode =
  | "missing_region"
  | "missing_country"
  | "missing_postal_code"
  | "destination_could_not_be_geocoded"

type LocalErrorCode = "no_shipping_options"

export class LocalCheckoutError extends Error {
  code: LocalErrorCode

  constructor(code: LocalErrorCode, message?: string) {
    super(message)
    this.code = code
    this.name = "LocalCheckoutError"
  }
}

export type KnownErrorCodes = LocalErrorCode | ExchangeErrorCode
