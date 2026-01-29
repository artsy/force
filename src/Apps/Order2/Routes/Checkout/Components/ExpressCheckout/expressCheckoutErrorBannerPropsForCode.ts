import type { CheckoutErrorBannerProps } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"

export const expressCheckoutErrorBannerPropsForCode = (
  errorCode: string,
): CheckoutErrorBannerProps["error"] => {
  // Card/payment failed errors
  if (
    [
      "card_declined",
      "insufficient_funds",
      "incorrect_number",
      "expired_card",
      "charge_authorization_failed",
      "credit_card_not_found",
      "credit_card_deactivated",
      "invalid_credit_card",
      "processing_error",
    ].includes(errorCode)
  ) {
    return {
      title: "Payment failed",
      message: "There was an issue with your payment method. Please try again.",
    }
  }

  // Shipping address errors
  if (
    [
      "unsupported_shipping_location",
      "missing_postal_code",
      "missing_country",
      "missing_phone_number",
      "missing_shipping_info",
    ].includes(errorCode)
  ) {
    return {
      title: "Shipping address error",
      message: "Please check your shipping address and try again.",
    }
  }

  // No shipping options available after setting address
  if (errorCode === "no_shipping_options") {
    return {
      title: "No shipping options available",
      message:
        // TODO: Align with other missing shipping options messaging
        "We couldn't find any shipping options for the address provided or this order may not be deliverable to that address.",
    }
  }

  // Payment method not supported
  if (errorCode === "unsupported_payment_method") {
    return {
      title: "Payment method not supported",
      message:
        "This payment method is not supported. Please try a different payment method.",
    }
  }

  // Confirmation token errors
  if (errorCode === "confirmation_token_error") {
    return {
      title: "Payment verification failed",
      message: "Please check your payment details and try again.",
    }
  }

  // Fallback for all other errors
  return {
    title: "An error occurred",
  }
}
