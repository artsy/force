import type { CheckoutErrorBannerProps } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"

export const expressCheckoutErrorBannerPropsForCode = (
  errorCode: string,
): CheckoutErrorBannerProps["error"] => {
  // Errors that can occur after express checkout closes and during backend processing

  // Backend payment processing errors
  if (["charge_authorization_failed", "processing_error"].includes(errorCode)) {
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
  // if (
  //   [
  //     "card_declined",
  //     "insufficient_funds",
  //     "incorrect_number",
  //     "expired_card",
  //     "credit_card_not_found",
  //     "credit_card_deactivated",
  //     "invalid_credit_card",
  //   ].includes(errorCode)
  // ) {
  //   return {
  //     title: "Payment failed",
  //     message: "There was an issue with your payment method. Please try again.",
  //   }
  // }

  // // Missing info errors (caught by express checkout UI before confirmation)
  // if (
  //   [
  //     "missing_postal_code",
  //     "missing_country",
  //     "missing_phone_number",
  //     "missing_shipping_info",
  //   ].includes(errorCode)
  // ) {
  //   return {
  //     title: "Shipping address error",
  //     message: "Please check your shipping address and try again.",
  //   }
  // }

  // // Shipping validation errors (caught during address/rate selection in modal)
  // if (errorCode === "unsupported_shipping_location") {
  //   return {
  //     title: "Shipping address error",
  //     message: "We don't ship to this location.",
  //   }
  // }

  // // No shipping options (caught during shipping rate selection in modal)
  // if (errorCode === "no_shipping_options") {
  //   return {
  //     title: "No shipping options available",
  //     message:
  //       "We couldn't find any shipping options for the address provided or this order may not be deliverable to that address.",
  //   }
  // }

  // Payment method validation (caught by Stripe before token creation)
  if (errorCode === "unsupported_payment_method") {
    return {
      title: "Payment method not supported",
      message:
        "This payment method is not supported. Please try a different payment method.",
    }
  }

  // Fallback for all other errors
  return {
    title: "An error occurred",
    message:
      "Something went wrong. Please try again or contact orders@artsy.net",
  }
}
