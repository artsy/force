import {
  ArtaShippedWithNoTrackingIdNoTrackingUrl,
  ArtaShippedWithTrackingIdNoTrackingUrl,
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  CreditCardPaymentDetails,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
} from "Apps/__tests__/Fixtures/Order"
import { StatusFragmentContainer } from "Apps/Order/Routes/Status"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { StatusQuery$rawResponse } from "__generated__/StatusQuery.graphql"
import { graphql } from "react-relay"
import { OrderAppTestPageRTL } from "./Utils/OrderAppTestPageRTL"

jest.unmock("react-relay")

class StatusTestPageRTL extends OrderAppTestPageRTL {
  get messageText() {
    // Look for Message components by their CSS class structure
    const messageElement =
      document.querySelector("[class*='Message__Container']") ||
      document.querySelector("[class*='Message']") ||
      screen.queryByRole("alert")
    return messageElement?.textContent || ""
  }
  getMessage() {
    // Look for Message components by their CSS class structure first, then fallback to role
    return (
      document.querySelector("[class*='Message__Container']") ||
      document.querySelector("[class*='Message']") ||
      screen.queryByRole("alert")
    )
  }
  getMessageLength() {
    // Count Message components by their CSS class structure
    const messageElements =
      document.querySelectorAll("[class*='Message__Container']") ||
      document.querySelectorAll("[class*='Message']")
    return messageElements.length > 0
      ? messageElements.length
      : screen.queryAllByRole("alert").length
  }
}

const testOrder: StatusQuery$rawResponse["order"] = {
  ...OfferOrderWithShippingDetailsAndNote,
  ...CreditCardPaymentDetails,
  state: "SUBMITTED",
  displayState: "SUBMITTED",
}

describe("Status", () => {
  let isEigen

  let match = {
    location: {
      query: {},
    },
    params: {},
  }

  beforeEach(() => {
    jest.clearAllMocks()
    isEigen = false
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot context={{ isEigen }}>
        <StatusFragmentContainer {...props} match={match} />
      </MockBoot>
    ),
    query: graphql`
      query StatusQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "42") {
          ...Status_order
        }
      }
    `,
  })

  describe("offers", () => {
    it("should should have a title containing status", async () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      expect(document.title).toContain("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.getByText(/The seller will respond to your offer by.*Jan 15/)
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).not.toBeInTheDocument()
        expect(page.getMessageLength()).toBe(2)
        expect(screen.getByText("Kathryn Markel Fine Arts")).toBeInTheDocument()
        expect(screen.getByText(/List price/)).toBeInTheDocument()
        expect(screen.getByText(/Another note/)).toBeInTheDocument()
      })

      it("should say order submitted and have message to continue to inbox on Eigen", async () => {
        isEigen = true
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.getByText(/The seller will respond to your offer by.*Jan 15/)
        ).toBeInTheDocument()
        expect(
          screen.getByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
        expect(
          screen.queryByText("Kathryn Markel Fine Arts")
        ).not.toBeInTheDocument()
        expect(screen.queryByText("List price")).not.toBeInTheDocument()
      })
    })

    describe("in review", () => {
      it("should say order submitted and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...testOrder,
            state: "IN_REVIEW",
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.getByText(/The seller will respond to your offer by.*Jan 15/)
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).not.toBeInTheDocument()
        expect(page.getMessageLength()).toBe(2)
        expect(screen.getByText("Kathryn Markel Fine Arts")).toBeInTheDocument()
        expect(screen.getByText(/List price/)).toBeInTheDocument()
        expect(screen.getByText(/Another note/)).toBeInTheDocument()
      })

      it("should say order submitted and have message to continue to inbox on Eigen", async () => {
        isEigen = true
        renderWithRelay({
          CommerceOrder: () => ({
            ...testOrder,
            state: "IN_REVIEW",
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.getByText(/The seller will respond to your offer by.*Jan 15/)
        ).toBeInTheDocument()
        expect(
          screen.getByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
        expect(
          screen.queryByText("Kathryn Markel Fine Arts")
        ).not.toBeInTheDocument()
        expect(screen.queryByText("List price")).not.toBeInTheDocument()
      })
    })

    describe("approved", () => {
      it("should say confirmed and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "APPROVED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Offer accepted")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("processing", () => {
      it("should say confirmed and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "PROCESSING",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Offer accepted")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should say 'Thank you, your offer has been accepted' and have message box", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPageRTL(screen)

          expect(
            screen.getByText("Thank you, your offer has been accepted")
          ).toBeInTheDocument()
          expect(page.getMessageLength()).toBe(1)
        })

        it("renders Message with alert variant and 'please proceed' message", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.getByText(
              "Please proceed with the wire transfer within 7 days to complete your purchase."
            )
          ).toBeInTheDocument()
        })

        it("renders the alert Message with correct messages", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.getByText(/Find the total amount due.*banking details/)
          ).toBeInTheDocument()
          expect(
            screen.getByText(/Please inform your bank.*wire transfer fees/)
          ).toBeInTheDocument()
          expect(screen.getByText(/orders@artsy\.net/)).toBeInTheDocument()
        })

        it("renders content for Artsy's bank details", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(screen.getByText("Send wire transfer to")).toBeInTheDocument()
          expect(
            screen.getByText("Account name: Art.sy Inc.")
          ).toBeInTheDocument()
          expect(
            screen.getByText("Account number: 4243851425")
          ).toBeInTheDocument()
          expect(
            screen.getByText("Routing number: 121000248")
          ).toBeInTheDocument()
          expect(
            screen.getByText("International SWIFT: WFBIUS6S")
          ).toBeInTheDocument()
          expect(screen.getByText("Bank address")).toBeInTheDocument()
          expect(screen.getByText("Wells Fargo Bank, N.A.")).toBeInTheDocument()
          expect(screen.getByText("420 Montgomery Street")).toBeInTheDocument()
          expect(
            screen.getByText("San Francisco, CA 94104")
          ).toBeInTheDocument()
        })
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Offer accepted. Payment processing.' and have message box", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPageRTL(screen)

          expect(
            screen.getByText("Offer accepted. Payment processing.")
          ).toBeInTheDocument()
          expect(page.getMessageLength()).toBe(1)
        })

        it("renders description", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })

          expect(
            screen.getByText(
              /More delivery information will be available once your order ships/
            )
          ).toBeInTheDocument()
        })

        it("does not render an alert message", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPageRTL(screen)

          const message = page.getMessage()
          expect(message).not.toHaveAttribute("variant", "alert")
        })
      })
    })

    describe("in transit", () => {
      it("should say confirmed, have message box and the tracking URL", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "IN_TRANSIT",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Your order has shipped")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
        expect(screen.getByText("steve")).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /steve/ })).toHaveAttribute(
          "href",
          "steves-house"
        )
      })

      it("should display non linked tracking number if no Url", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...ArtaShippedWithTrackingIdNoTrackingUrl,
            displayState: "IN_TRANSIT",
          }),
        })

        expect(screen.getByText(/oxa/)).toBeInTheDocument()
        expect(
          screen.queryByRole("link", { name: /oxa/ })
        ).not.toBeInTheDocument()
      })

      it("should display note about shipping when tracking is not available", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...ArtaShippedWithNoTrackingIdNoTrackingUrl,
            ...CreditCardPaymentDetails,
            displayState: "IN_TRANSIT",
          }),
        })

        expect(
          screen.getByText(/Our delivery provider.*delivery window.*your area/)
        ).toBeInTheDocument()
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Your order has shipped")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
        expect(screen.queryByText("Your note")).not.toBeInTheDocument()
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order has been picked up")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(0)
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "buyer_rejected",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Offer declined")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "seller_rejected",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Offer declined")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "seller_lapsed",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Offer expired")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "buyer_lapsed",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Offer expired")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "REFUNDED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order was canceled and refunded")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: null,
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order was canceled and refunded")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
        expect(screen.getByTestId("transactionSummary")).toBeInTheDocument()
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      renderWithRelay({
        CommerceOrder: () => BuyOrderWithShippingDetails,
      })

      expect(document.title).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Thank you, your order has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.getByText(/You will receive a confirmation email by.*Jan 15/)
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(2)
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
          }),
        })

        expect(screen.getByText("Your order is confirmed")).toBeInTheDocument()
      })

      it("should render correct title for Private Sale orders", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
            source: "private_sale",
          }),
        })

        expect(
          screen.getByText("Thank you for working with Artsy Private Sales.")
        ).toBeInTheDocument()
      })

      it("should render correct description for Private Sale orders", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
            source: "private_sale",
          }),
        })

        expect(
          screen.getByText(/You will receive an email.*next steps/)
        ).toBeInTheDocument()
      })

      it("should render help email in description for Private Sale orders", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
            source: "private_sale",
          }),
        })

        expect(screen.getByText("privatesales@artsy.net.")).toBeInTheDocument()
      })
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should render correct title and have message box", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPageRTL(screen)

          expect(
            screen.getByText("Thank you, your order has been accepted")
          ).toBeInTheDocument()
          expect(page.getMessageLength()).toBe(1)
        })

        it("should render correct title for wire private sale orders", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              source: "private_sale",
            }),
          })

          expect(
            screen.getByText(
              "Thank you for your purchase with Artsy Private Sales."
            )
          ).toBeInTheDocument()
        })

        it("renders Message with alert variant and 'please proceed' message", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.getByText(
              "Please proceed with the wire transfer within 7 days to complete your purchase."
            )
          ).toBeInTheDocument()
        })

        it("should render correct instruction for wire private sale orders", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              source: "private_sale",
            }),
          })

          expect(screen.getByText(/email proof of payment/)).toBeInTheDocument()
        })

        it("should not render any description for wire private sale orders", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              source: "private_sale",
            }),
          })

          expect(
            screen.queryByText("Thank you for your purchase.")
          ).not.toBeInTheDocument()
        })

        it("renders the alert Message with correct messages", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.getByText(/Find the total amount due.*banking details/)
          ).toBeInTheDocument()
          expect(
            screen.getByText(/Please inform your bank.*wire transfer fees/)
          ).toBeInTheDocument()
          expect(screen.getByText(/orders@artsy\.net/)).toBeInTheDocument()
        })

        it("renders correct Artsy bank details for orders in USD", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              currencyCode: "USD",
            }),
          })

          expect(screen.getByText("Send wire transfer to")).toBeInTheDocument()
          expect(
            screen.getByText("Account name: Art.sy Inc.")
          ).toBeInTheDocument()
          expect(
            screen.getByText("Account number: 4243851425")
          ).toBeInTheDocument()
          expect(
            screen.getByText("Routing number: 121000248")
          ).toBeInTheDocument()
          expect(
            screen.getByText("International SWIFT: WFBIUS6S")
          ).toBeInTheDocument()
          expect(screen.getByText("Bank address")).toBeInTheDocument()
          expect(screen.getByText("Wells Fargo Bank, N.A.")).toBeInTheDocument()
          expect(screen.getByText("420 Montgomery Street")).toBeInTheDocument()
          expect(
            screen.getByText("San Francisco, CA 94104")
          ).toBeInTheDocument()
        })

        it("renders correct Artsy bank details for orders in GBP", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              currencyCode: "GBP",
            }),
          })

          expect(screen.getByText("Send wire transfer to")).toBeInTheDocument()
          expect(
            screen.getByText("Account name: Art.sy Inc.")
          ).toBeInTheDocument()
          expect(
            screen.getByText("Account number: 88005417")
          ).toBeInTheDocument()
          expect(
            screen.getByText("IBAN: GB30PNBP16567188005417")
          ).toBeInTheDocument()
          expect(
            screen.getByText("International SWIFT: PNBPGB2L")
          ).toBeInTheDocument()
          expect(screen.getByText("Sort Code: 16-56-71")).toBeInTheDocument()
          expect(screen.getByText("Bank address")).toBeInTheDocument()
          expect(
            screen.getByText("Wells Fargo Bank, N.A. London Branch")
          ).toBeInTheDocument()
          expect(screen.getByText("1 Plantation Place")).toBeInTheDocument()
          expect(screen.getByText("30 Fenchurch Street")).toBeInTheDocument()
          expect(
            screen.getByText("London, United Kingdom, EC3M 3BD")
          ).toBeInTheDocument()
        })

        it("renders correct Artsy bank details for orders in EUR", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              currencyCode: "EUR",
            }),
          })

          expect(screen.getByText("Send wire transfer to")).toBeInTheDocument()
          expect(
            screen.getByText("Account name: Art.sy Inc.")
          ).toBeInTheDocument()
          expect(
            screen.getByText("Account number: 88005419")
          ).toBeInTheDocument()
          expect(
            screen.getByText("IBAN: GB73PNBP16567188005419")
          ).toBeInTheDocument()
          expect(
            screen.getByText("International SWIFT: PNBPGB2L")
          ).toBeInTheDocument()
          expect(screen.getByText("Bank address")).toBeInTheDocument()
          expect(
            screen.getByText("Wells Fargo Bank, N.A. London Branch")
          ).toBeInTheDocument()
          expect(screen.getByText("1 Plantation Place")).toBeInTheDocument()
          expect(screen.getByText("30 Fenchurch Street")).toBeInTheDocument()
          expect(
            screen.getByText("London, United Kingdom, EC3M 3BD")
          ).toBeInTheDocument()
        })
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Your order is confirmed. Payment processing.' and have message box", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPageRTL(screen)

          expect(
            screen.getByText("Your order is confirmed. Payment processing.")
          ).toBeInTheDocument()
          expect(page.getMessageLength()).toBe(1)
        })

        it("should render correct title for private sale orders", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
              source: "private_sale",
            }),
          })

          expect(
            screen.getByText(
              "Thank you for your purchase with Artsy Private Sales."
            )
          ).toBeInTheDocument()
        })

        it("renders description", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })

          expect(
            screen.getByText(
              /More delivery information will be available once your order ships/
            )
          ).toBeInTheDocument()
        })

        it("should render correct description for private sale orders", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
              source: "private_sale",
            }),
          })

          expect(
            screen.getByText(/You will receive an email.*next steps/)
          ).toBeInTheDocument()
          expect(
            screen.getByText(/privatesales@artsy\.net/)
          ).toBeInTheDocument()
        })

        it("does not render an alert message", async () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPageRTL(screen)

          const message = page.getMessage()
          expect(message).not.toHaveAttribute("variant", "alert")
        })
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(screen.getByText("Your order has shipped")).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order has been picked up")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order was canceled and refunded")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order was canceled and refunded")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "REFUNDED",
          }),
        })
        const page = new StatusTestPageRTL(screen)

        expect(
          screen.getByText("Your order was canceled and refunded")
        ).toBeInTheDocument()
        expect(page.getMessageLength()).toBe(1)
      })
    })
  })

  describe("back to conversation", () => {
    it("should not display back to conversation link", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "REFUNDED",
        }),
      })

      expect(screen.queryByText("Back to conversation")).not.toBeInTheDocument()
    })

    it("should render a link to the conversation", async () => {
      match = {
        location: {
          query: {
            backToConversationId: "conversationId",
          },
        },
        params: {},
      }

      renderWithRelay({
        CommerceOrder: () => ({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "REFUNDED",
        }),
      })

      expect(screen.getByText("Back to conversation")).toBeInTheDocument()
    })
  })
})
