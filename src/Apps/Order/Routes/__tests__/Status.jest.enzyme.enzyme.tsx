import { Message } from "@artsy/palette"
import { StatusQuery$rawResponse } from "__generated__/StatusQuery.graphql"
import {
  ArtaShippedWithTrackingIdNoTrackingUrl,
  ArtaShippedWithNoTrackingIdNoTrackingUrl,
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  CreditCardPaymentDetails,
} from "Apps/__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { expectOne } from "DevTools/RootTestPage"
import { produce } from "immer"
import { graphql } from "react-relay"
import { StatusFragmentContainer } from "Apps/Order/Routes/Status"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { Title } from "react-head"

jest.unmock("react-relay")

class StatusTestPage extends OrderAppTestPage {
  get messageText() {
    return expectOne(this.find(Message)).text()
  }
  getMessage() {
    return this.find(Message)
  }
  getMessageLength() {
    return this.find(Message).length
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

  const { getWrapper } = setupTestWrapper({
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
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })

      expect(wrapper.find(Title).text()).toContain("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Thank you, your offer has been submitted"
        )
        expect(page.text()).toContain(
          "The seller will respond to your offer by Jan 15"
        )
        expect(page.text()).not.toContain(
          "Negotiation with the gallery will continue in the Inbox."
        )
        expect(page.getMessageLength()).toBe(2)
        expect(page.text()).toContain("Kathryn Markel Fine Arts")
        expect(page.text()).toContain("List price")
        expect(page.text()).toContain("Your noteAnother note!")
        expect(page.getMessageLength()).toBe(2)
      })

      it("should say order submitted and have message to continue to inbox on Eigen", async () => {
        isEigen = true
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Thank you, your offer has been submitted"
        )
        expect(page.text()).toContain(
          "The seller will respond to your offer by Jan 15"
        )
        expect(page.text()).toContain(
          "Negotiation with the gallery will continue in the Inbox."
        )
        expect(page.getMessageLength()).toBe(1)
        expect(page.text()).not.toContain("Kathryn Markel Fine Arts")
        expect(page.text()).not.toContain("List price")
      })

      it("should not show a note section if none exists", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () =>
            produce(testOrder, order => {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              order.lastOffer.note = null
            }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("in review", () => {
      it("should say order submitted and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...testOrder,
            state: "IN_REVIEW",
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Thank you, your offer has been submitted"
        )
        expect(page.text()).toContain(
          "The seller will respond to your offer by Jan 15"
        )
        expect(page.text()).not.toContain(
          "Negotiation with the gallery will continue in the Inbox."
        )
        expect(page.getMessageLength()).toBe(2)
        expect(page.text()).toContain("Kathryn Markel Fine Arts")
        expect(page.text()).toContain("List price")
        expect(page.text()).toContain("Your noteAnother note!")
        expect(page.getMessageLength()).toBe(2)
      })

      it("should say order submitted and have message to continue to inbox on Eigen", async () => {
        isEigen = true
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...testOrder,
            state: "IN_REVIEW",
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Thank you, your offer has been submitted"
        )
        expect(page.text()).toContain(
          "The seller will respond to your offer by Jan 15"
        )
        expect(page.text()).toContain(
          "Negotiation with the gallery will continue in the Inbox."
        )
        expect(page.getMessageLength()).toBe(1)
        expect(page.text()).not.toContain("Kathryn Markel Fine Arts")
        expect(page.text()).not.toContain("List price")
      })
    })

    describe("approved", () => {
      it("should say confirmed and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "APPROVED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer accepted")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("processing", () => {
      it("should say confirmed and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "PROCESSING",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer accepted")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should say 'Thank you, your offer has been accepted' and have message box", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Thank you, your offer has been accepted"
          )
          expect(page.getMessageLength()).toBe(1)
        })

        it("renders Message with alert variant and 'please proceed' message", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Please proceed with the wire transfer within 7 days to complete your purchase."
          )

          const message = page.getMessage()
          expect(message.props().variant).toBe("alert")
        })

        it("renders the alert Message with correct messages", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Find the total amount due and Artsy’s banking details below."
          )
          expect(page.text()).toContain(
            "Please inform your bank that you are responsible for all wire transfer fees."
          )
          expect(page.text()).toContain(
            "Please make the transfer in the currency displayed on the order breakdown and then email proof of payment to orders@artsy.net."
          )
        })

        it("renders content for Artsy's bank details", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain("Send wire transfer to")
          expect(page.text()).toContain("Account name: Art.sy Inc.")
          expect(page.text()).toContain("Account number: 4243851425")
          expect(page.text()).toContain("Routing number: 121000248")
          expect(page.text()).toContain("International SWIFT: WFBIUS6S")
          expect(page.text()).toContain("Bank address")
          expect(page.text()).toContain("Wells Fargo Bank, N.A.")
          expect(page.text()).toContain("420 Montgomery Street")
          expect(page.text()).toContain("San Francisco, CA 94104")
        })
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Offer accepted. Payment processing.' and have message box", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain("Offer accepted. Payment processing.")
          expect(page.getMessageLength()).toBe(1)
        })

        it("renders description", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "More delivery information will be available once your order ships."
          )
        })

        it("does not render an alert message", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...OfferOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          const message = page.getMessage()
          expect(message.props().variant).not.toBe("alert")
        })
      })
    })

    describe("in transit", () => {
      it("should say confirmed, have message box and the tracking URL", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "IN_TRANSIT",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessageLength()).toBe(1)
        expect(page.text()).toContain("steve")
        expect(
          page.find(Message).find("Message").find("RouterLink").html()
        ).toContain(`href="steves-house"`)
      })

      it("should display non linked tracking number if no Url", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...ArtaShippedWithTrackingIdNoTrackingUrl,
            displayState: "IN_TRANSIT",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("oxa")
        expect(
          page.find(Message).find("Message").find("RouterLink").length
        ).toBe(0)
      })

      it("should display note about shipping when tracking is not available", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...ArtaShippedWithNoTrackingIdNoTrackingUrl,
            ...CreditCardPaymentDetails,
            displayState: "IN_TRANSIT",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Our delivery provider will call you to provide a delivery window when it arrives in your area."
        )
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessageLength()).toBe(1)
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has been picked up")
        expect(page.getMessageLength()).toBe(0)
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "buyer_rejected",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer declined")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "seller_rejected",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer declined")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "seller_lapsed",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("offer expired")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "buyer_lapsed",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("offer expired")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "REFUNDED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: null,
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessageLength()).toBe(1)
        expect(page.find(TransactionDetailsSummaryItem).length).toBe(1)
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderWithShippingDetails,
      })

      expect(wrapper.find(Title).text()).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Thank you, your order has been submitted"
        )
        expect(page.text()).toContain(
          "You will receive a confirmation email by Jan 15"
        )
        expect(page.getMessageLength()).toBe(2)
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order is confirmed")
      })

      it("should render correct title for Private Sale orders", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
            source: "private_sale",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "Thank you for working with Artsy Private Sales."
        )
      })

      it("should render correct description for Private Sale orders", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
            source: "private_sale",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain(
          "You will receive an email from our team with next steps."
        )
      })

      it("should render help email in description for Private Sale orders", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
            source: "private_sale",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("privatesales@artsy.net.")
      })
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should render correct title and have message box", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Thank you, your order has been accepted"
          )
          expect(page.getMessageLength()).toBe(1)
        })

        it("should render correct title for wire private sale orders", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              source: "private_sale",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Thank you for your purchase with Artsy Private Sales."
          )
        })

        it("renders Message with alert variant and 'please proceed' message", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Please proceed with the wire transfer within 7 days to complete your purchase."
          )

          const message = page.getMessage()
          expect(message.props().variant).toBe("alert")
        })

        it("should render correct instruction for wire private sale orders", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              source: "private_sale",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain("email proof of payment")
        })

        it("should not render any description for wire private sale orders", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              source: "private_sale",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).not.toContain("Thank you for your purchase.")
        })

        it("renders the alert Message with correct messages", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Find the total amount due and Artsy’s banking details below."
          )
          expect(page.text()).toContain(
            "Please inform your bank that you are responsible for all wire transfer fees."
          )
          expect(page.text()).toContain(
            "Please make the transfer in the currency displayed on the order breakdown and then email proof of payment to orders@artsy.net."
          )
        })

        it("renders correct Artsy bank details for orders in USD", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              currencyCode: "USD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain("Send wire transfer to")
          expect(page.text()).toContain("Account name: Art.sy Inc.")
          expect(page.text()).toContain("Account number: 4243851425")
          expect(page.text()).toContain("Routing number: 121000248")
          expect(page.text()).toContain("International SWIFT: WFBIUS6S")
          expect(page.text()).toContain("Bank address")
          expect(page.text()).toContain("Wells Fargo Bank, N.A.")
          expect(page.text()).toContain("420 Montgomery Street")
          expect(page.text()).toContain("San Francisco, CA 94104")
        })

        it("renders correct Artsy bank details for orders in GBP", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              currencyCode: "GBP",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain("Send wire transfer to")
          expect(page.text()).toContain("Account name: Art.sy Inc.")
          expect(page.text()).toContain("Account number: 88005417")
          expect(page.text()).toContain("IBAN: GB30PNBP16567188005417")
          expect(page.text()).toContain("International SWIFT: PNBPGB2L")
          expect(page.text()).toContain("Sort Code: 16-56-71")
          expect(page.text()).toContain("Bank address")
          expect(page.text()).toContain("Wells Fargo Bank, N.A. London Branch")
          expect(page.text()).toContain("1 Plantation Place")
          expect(page.text()).toContain("30 Fenchurch Street")
          expect(page.text()).toContain("London, United Kingdom, EC3M 3BD")
        })

        it("renders correct Artsy bank details for orders in EUR", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "WIRE_TRANSFER",
              currencyCode: "EUR",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain("Send wire transfer to")
          expect(page.text()).toContain("Account name: Art.sy Inc.")
          expect(page.text()).toContain("Account number: 88005419")
          expect(page.text()).toContain("IBAN: GB73PNBP16567188005419")
          expect(page.text()).toContain("International SWIFT: PNBPGB2L")
          expect(page.text()).toContain("Bank address")
          expect(page.text()).toContain("Wells Fargo Bank, N.A. London Branch")
          expect(page.text()).toContain("1 Plantation Place")
          expect(page.text()).toContain("30 Fenchurch Street")
          expect(page.text()).toContain("London, United Kingdom, EC3M 3BD")
        })
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Your order is confirmed. Payment processing.' and have message box", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Your order is confirmed. Payment processing."
          )
          expect(page.getMessageLength()).toBe(1)
        })

        it("should render correct title for private sale orders", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
              source: "private_sale",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "Thank you for your purchase with Artsy Private Sales."
          )
        })

        it("renders description", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "More delivery information will be available once your order ships."
          )
        })

        it("should render correct description for private sale orders", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
              source: "private_sale",
            }),
          })
          const page = new StatusTestPage(wrapper)

          expect(page.text()).toContain(
            "You will receive an email from our team with next steps."
          )
          expect(page.text()).toContain("privatesales@artsy.net.")
        })

        it("does not render an alert message", async () => {
          const { wrapper } = getWrapper({
            CommerceOrder: () => ({
              ...BuyOrderWithShippingDetails,
              displayState: "PROCESSING_APPROVAL",
              paymentMethod: "CREDIT_CARD",
            }),
          })
          const page = new StatusTestPage(wrapper)

          const message = page.getMessage()
          expect(message.props().variant).not.toBe("alert")
        })
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has been picked up")
        expect(page.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessageLength()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "REFUNDED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessageLength()).toBe(1)
      })
    })
  })

  describe("back to conversation", () => {
    it("should not display back to conversation link", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "REFUNDED",
        }),
      })
      const page = new StatusTestPage(wrapper)

      expect(page.text()).not.toContain("Back to conversation")
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

      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "REFUNDED",
        }),
      })
      const page = new StatusTestPage(wrapper)

      expect(page.text()).toContain("Back to conversation")
    })
  })
})
