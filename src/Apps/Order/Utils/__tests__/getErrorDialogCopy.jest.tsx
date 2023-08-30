import { render, screen } from "@testing-library/react"
import {
  ErrorDialogs,
  ErrorDialogMessage,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"

describe("getErrorDialogCopy", () => {
  describe("dialog is CurrencyNotSupported", () => {
    it("returns the expected title and message", () => {
      const { title, message, formattedMessage } = getErrorDialogCopy(
        ErrorDialogs.CurrencyNotSupported
      )

      expect(title).toBe("Payment declined")
      expect(message).toBe(
        "This card is not compatible with the currency for this artwork. Please confirm with your card issuer if this currency can be supported, try a different payment method or contact orders@artsy.net."
      )

      render(<>{formattedMessage}</>)

      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "This card is not compatible with the currency for this artwork. Please confirm with your card issuer if this currency can be supported, try a different payment method or contact orders@artsy.net."
      )
      expect(screen.queryByTestId("support-email-link")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
    })
  })

  describe("dialog is not provided", () => {
    it("returns the default title and message", () => {
      const { title, message, formattedMessage } = getErrorDialogCopy()

      expect(title).toBe("An error occurred")
      expect(message).toBe(
        "Something went wrong. Please try again or contact orders@artsy.net."
      )

      render(<>{formattedMessage}</>)

      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "Something went wrong. Please try again or contact orders@artsy.net."
      )
      expect(screen.queryByTestId("support-email-link")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
    })
  })
})

describe("ErrorDialogMessage", () => {
  describe("message contains one support email address", () => {
    it("replaces it with a mailto link", () => {
      const message = "Foo orders@artsy.net."

      render(<ErrorDialogMessage message={message} />)

      expect(screen.queryByTestId("support-email-link")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "Foo orders@artsy.net."
      )
    })
  })

  describe("message contains multiple support email addresses", () => {
    it("replaces every instance with mailto links", () => {
      const message =
        "Foo orders@artsy.net bar orders@artsy.net baz orders@artsy.net."

      render(<ErrorDialogMessage message={message} />)

      expect(screen.queryByTestId("support-email-link-0")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
      expect(screen.queryByTestId("support-email-link-1")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
      expect(screen.queryByTestId("support-email-link-2")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "Foo orders@artsy.net bar orders@artsy.net baz orders@artsy.net."
      )
    })
  })

  describe("message only contains a support email address", () => {
    it("replaces it with a mailto link", () => {
      const message = "orders@artsy.net"

      render(<ErrorDialogMessage message={message} />)

      expect(screen.queryByTestId("support-email-link")).toHaveAttribute(
        "href",
        "mailto:orders@artsy.net"
      )
      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "orders@artsy.net"
      )
    })
  })

  describe("message does not contains a support email address", () => {
    it("returns the message", () => {
      const message = "Foo bar baz."

      render(<ErrorDialogMessage message={message} />)

      expect(screen.queryByTestId("support-email-link")).not.toBeInTheDocument()
      expect(screen.queryByTestId("formatted-message")).toHaveTextContent(
        "Foo bar baz."
      )
    })
  })
})
