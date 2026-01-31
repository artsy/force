import {
  type CheckoutErrorBannerMessage,
  ERROR_MESSAGES,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import createLogger from "Utils/logger"

const logger = createLogger("ExpressCheckout errorHandling")

export const expressCheckoutErrorBannerPropsForCode = (
  errorCode: string,
): CheckoutErrorBannerMessage => {
  // Errors that can occur after express checkout closes and during backend processing

  // Backend payment processing errors
  if (["create_credit_card_failed"].includes(errorCode)) {
    return {
      title: "Payment failed",
      message: "There was an issue with your payment method. Please try again.",
    }
  }

  logger.error("Unhandled express checkout error code:", errorCode)

  // Fallback for all other errors
  return ERROR_MESSAGES.generic
}
