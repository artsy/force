import { render, screen } from "@testing-library/react"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"

describe("getErrorDialogCopy", () => {
  describe("dialog is CurrencyNotSupported", () => {
    it("returns the expected title and message", () => {
      const { title, message, messagePlain } = getErrorDialogCopy(
        ErrorDialogs.CurrencyNotSupported
      )

      expect(title).toBe("Payment declined")
      expect(messagePlain).toBe(
        "This card is not compatible with the currency for this artwork. Please confirm with your card issuer if this currency can be supported, try a different payment method or contact orders@artsy.net."
      )

      render(<>{message}</>)

      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "This card is not compatible with the currency for this artwork. Please confirm with your card issuer if this currency can be supported, try a different payment method or contact"
      )
      expect(screen.queryByTestId("support-email-link")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
    })
  })

  describe("dialog is not provided", () => {
    it("returns the default title and message", () => {
      const { title, message, messagePlain } = getErrorDialogCopy()

      expect(title).toBe("An error occurred")
      expect(messagePlain).toBe(
        "Something went wrong. Please try again or contact orders@artsy.net."
      )

      render(<>{message}</>)

      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "Something went wrong. Please try again or contact"
      )
      expect(screen.queryByTestId("support-email-link")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
    })
  })
})
