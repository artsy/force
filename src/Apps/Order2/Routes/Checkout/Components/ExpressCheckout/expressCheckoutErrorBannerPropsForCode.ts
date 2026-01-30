import {
  type CheckoutErrorBannerMessage,
  ERROR_MESSAGES,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"

export const expressCheckoutErrorBannerPropsForCode = (
  errorCode: string,
): CheckoutErrorBannerMessage => {
  // Errors that can occur after express checkout closes and during backend processing

  // Backend payment processing errors
  if (
    [
      "charge_authorization_failed",
      "processing_error",
      "payment_failed",
    ].includes(errorCode)
  ) {
    return {
      title: "Payment failed",
      message: "There was an issue with your payment method. Please try again.",
    }
  }

  // Confirmation token errors (backend validation)
  if (errorCode === "confirmation_token_error") {
    return {
      title: "Payment verification failed",
      message: "Please check your payment details and try again.",
    }
  }

  // --- The following errors are caught by Google Pay/Apple Pay/Stripe BEFORE checkout closes ---

  // // Card/payment validation errors (caught by Stripe before confirmation token creation)
  if (
    [
      "card_declined",
      "insufficient_funds",
      "incorrect_number",
      "expired_card",
      "credit_card_not_found",
      "credit_card_deactivated",
      "invalid_credit_card",
    ].includes(errorCode)
  ) {
    return {
      title: "Payment failed",
      message: "There was an issue with your payment method. Please try again.",
    }
  }

  // Payment method validation (caught by Stripe before token creation)
  if (errorCode === "unsupported_payment_method") {
    return {
      title: "Payment method not supported",
      message:
        "This payment method is not supported. Please try a different payment method.",
    }
  }

  // Fallback for all other errors
  return ERROR_MESSAGES.generic
}
