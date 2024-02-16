import { StatusFragmentContainer } from "Apps/Order/Routes/Status"
import {
  CreditCardPaymentDetails,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("Status", () => {
  describe("offers", () => {
    let isEigen

    beforeEach(() => {
      // this allows some tests to set isEigen = true without affecting others
      isEigen = false
    })

    const { renderWithRelay } = setupTestWrapperTL({
      Component: (props: any) => (
        <MockBoot context={{ isEigen }}>
          <StatusFragmentContainer {...props} />
        </MockBoot>
      ),
      query: graphql`
        query StatusTestQuery @raw_response_type @relay_test_operation {
          order: commerceOrder(id: "42") {
            ...Status_order
          }
        }
      `,
    })

    it("should should have a title containing status", () => {
      renderWithRelay({
        CommerceOrder: () => UntouchedOfferOrder,
      })

      expect(document.title).toEqual("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetailsAndNote,
            ...CreditCardPaymentDetails,
            state: "SUBMITTED",
            displayState: "SUBMITTED",
          }),
        })

        expect(
          screen.queryByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            /The seller will respond to your offer by Jan 15. Keep in mind making an offer doesn’t guarantee you the work./
          )
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText("Kathryn Markel Fine Arts")
        ).toBeInTheDocument()
        expect(screen.queryByText(/List price/)).toBeInTheDocument()
        expect(screen.queryByText("Your note")).toBeInTheDocument()
        expect(screen.queryByText("Another note!")).toBeInTheDocument()
      })

      it("should say order submitted and have message to continue to inbox on Eigen", () => {
        isEigen = true

        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetailsAndNote,
            ...CreditCardPaymentDetails,
            state: "SUBMITTED",
            displayState: "SUBMITTED",
          }),
        })

        expect(
          screen.queryByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            /The seller will respond to your offer by Jan 15. Keep in mind making an offer doesn’t guarantee you the work./
          )
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).toBeInTheDocument()
        expect(
          screen.queryByText("Kathryn Markel Fine Arts")
        ).not.toBeInTheDocument()
        expect(screen.queryByText("List price")).not.toBeInTheDocument()
      })

      it("should not show a note section if none exists", () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            state: "SUBMITTED",
            displayState: "SUBMITTED",
          }),
        })

        expect(screen.queryByText("Your note")).not.toBeInTheDocument()
      })
    })

    describe("in review", () => {
      it("should say order submitted and have message box", () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetailsAndNote,
            ...CreditCardPaymentDetails,
            state: "IN_REVIEW",
            displayState: "SUBMITTED",
          }),
        })

        expect(
          screen.queryByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            /The seller will respond to your offer by Jan 15. Keep in mind making an offer doesn’t guarantee you the work./
          )
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText("Kathryn Markel Fine Arts")
        ).toBeInTheDocument()
        expect(screen.queryByText(/List price/)).toBeInTheDocument()
        expect(screen.queryByText("Your note")).toBeInTheDocument()
        expect(screen.queryByText("Another note!")).toBeInTheDocument()
      })

      it("should say order submitted and have message to continue to inbox on Eigen", () => {
        isEigen = true

        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetailsAndNote,
            ...CreditCardPaymentDetails,
            state: "IN_REVIEW",
            displayState: "SUBMITTED",
          }),
        })

        expect(
          screen.queryByText("Thank you, your offer has been submitted")
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            /The seller will respond to your offer by Jan 15. Keep in mind making an offer doesn’t guarantee you the work./
          )
        ).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Negotiation with the gallery will continue in the Inbox."
          )
        ).toBeInTheDocument()
        expect(
          screen.queryByText("Kathryn Markel Fine Arts")
        ).not.toBeInTheDocument()
        expect(screen.queryByText("List price")).not.toBeInTheDocument()
      })
    })

    describe("approved", () => {
      it("should say confirmed and have message box", () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "APPROVED",
          }),
        })

        expect(screen.queryByText("Offer accepted")).toBeInTheDocument()
        expect(
          screen.queryByText(
            "Thank you for your purchase. You will be notified when the work has shipped, typically within 5–7 business days."
          )
        ).toBeInTheDocument()
      })
    })

    describe("processing", () => {
      it("should say confirmed and have message box", () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "PROCESSING",
          }),
        })

        expect(screen.queryByText("Offer accepted")).toBeInTheDocument()
        expect(
          screen.queryByText(
            /Thank you for your purchase. More delivery information will be available once your order ships./
          )
        ).toBeInTheDocument()
      })
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should say 'Thank you, your offer has been accepted' and have message box", () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.queryByText("Thank you, your offer has been accepted")
          ).toBeInTheDocument()
        })

        it("renders Message with alert variant and 'please proceed' message", () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.queryByText(
              "Please proceed with the wire transfer within 7 days to complete your purchase."
            )
          ).toBeInTheDocument()
        })

        it("renders the alert Message with correct messages", () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.queryByText(
              /Find the total amount due and Artsy’s banking details below./
            )
          ).toBeInTheDocument()
          expect(
            screen.queryByText(
              /Please inform your bank that you are responsible for all wire transfer fees./
            )
          ).toBeInTheDocument()
          expect(
            screen.queryByText(
              /Please make the transfer in the currency displayed on the order breakdown and then email proof of payment to/
            )
          ).toBeInTheDocument()
        })

        it("renders content for Artsy's bank details", () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })

          expect(
            screen.queryByText("Send wire transfer to")
          ).toBeInTheDocument()
          expect(
            screen.queryByText("Account name: Art.sy Inc.")
          ).toBeInTheDocument()
          expect(
            screen.queryByText("Account number: 4243851425")
          ).toBeInTheDocument()
          expect(
            screen.queryByText("Routing number: 121000248")
          ).toBeInTheDocument()
          expect(
            screen.queryByText("International SWIFT: WFBIUS6S")
          ).toBeInTheDocument()
          expect(screen.queryByText("Bank address")).toBeInTheDocument()
          expect(
            screen.queryByText("Wells Fargo Bank, N.A.")
          ).toBeInTheDocument()
          expect(
            screen.queryByText("420 Montgomery Street")
          ).toBeInTheDocument()
          expect(
            screen.queryByText("San Francisco, CA 94104")
          ).toBeInTheDocument()
        })
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Offer accepted. Payment processing.' and have message box", () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })

          expect(
            screen.queryByText("Offer accepted. Payment processing.")
          ).toBeInTheDocument()
        })

        it("renders description", () => {
          renderWithRelay({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })

          expect(
            screen.queryByText(
              /Thank you for your purchase. nullMore delivery information will be available once your order ships./
            )
          ).toBeInTheDocument()
        })

        it("does not render an alert message", () => {})
      })
    })

    describe("in transit", () => {
      it("should say confirmed, have message box and the tracking URL", () => {})

      it("should display non linked tracking number if no Url", () => {})

      it("should display note about shipping when tracking is not available", () => {})
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", () => {})
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", () => {})
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", () => {})
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", () => {})
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", () => {})
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", () => {})
    })

    describe("refunded", () => {
      it("should say that order was canceled", () => {})
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", () => {})
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", () => {})

    describe("submitted", () => {
      it("should say order submitted and have message box", () => {})
    })

    describe("approved", () => {
      it("should say confirmed", () => {})

      it("should render correct title for Private Sale orders", () => {})

      it("should render correct description for Private Sale orders", () => {})

      it("should render help email in description for Private Sale orders", () => {})
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should render correct title and have message box", () => {})

        it("should render correct title for wire private sale orders", () => {})

        it("renders Message with alert variant and 'please proceed' message", () => {})

        it("should render correct instruction for wire private sale orders", () => {})

        it("should not render any description for wire private sale orders", () => {})

        it("renders the alert Message with correct messages", () => {})

        it("renders correct Artsy bank details for orders in USD", () => {})

        it("renders correct Artsy bank details for orders in GBP", () => {})

        it("renders correct Artsy bank details for orders in EUR", () => {})
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Your order is confirmed. Payment processing.' and have message box", () => {})

        it("should render correct title for private sale orders", () => {})

        it("renders description", () => {})

        it("should render correct description for private sale orders", () => {})

        it("does not render an alert message", () => {})
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", () => {})
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", () => {})
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", () => {})
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", () => {})
    })

    describe("refunded", () => {
      it("should say that order was canceled", () => {})
    })
  })
})
