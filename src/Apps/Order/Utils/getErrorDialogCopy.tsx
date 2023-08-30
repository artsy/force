import { RouterLink } from "System/Router/RouterLink"
import React from "react"

export enum ErrorDialogs {
  CurrencyNotSupported = "currency_not_supported",
}

export const getErrorDialogCopy = (
  dialog?: ErrorDialogs
): {
  title: string
  message: React.ReactNode
  messagePlain: string
} => {
  const supportEmail = "orders@artsy.net"

  switch (dialog) {
    case ErrorDialogs.CurrencyNotSupported:
      return {
        title: "Payment declined",
        message: (
          <div data-testid="formatted-message">
            This card is not compatible with the currency for this artwork.
            Please confirm with your card issuer if this currency can be
            supported, try a different payment method or contact{" "}
            <RouterLink
              data-testid="support-email-link"
              inline
              to={`mailto:${supportEmail}`}
            >
              {supportEmail}
            </RouterLink>
            .
          </div>
        ),
        messagePlain: `This card is not compatible with the currency for this artwork. Please confirm with your card issuer if this currency can be supported, try a different payment method or contact ${supportEmail}.`,
      }
    default:
      return {
        title: "An error occurred",
        message: (
          <div data-testid="formatted-message">
            Something went wrong. Please try again or contact{" "}
            <RouterLink
              data-testid="support-email-link"
              inline
              to={`mailto:${supportEmail}`}
            >
              {supportEmail}
            </RouterLink>
            .
          </div>
        ),
        messagePlain: `Something went wrong. Please try again or contact ${supportEmail}.`,
      }
  }
}
