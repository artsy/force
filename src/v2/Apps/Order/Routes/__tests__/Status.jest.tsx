import { Message } from "@artsy/palette"
import { StatusQueryRawResponse } from "v2/__generated__/StatusQuery.graphql"
import {
  ArtaShippedWithTrackingIdNoTrackingUrl,
  ArtaShippedWithNoTrackingIdNoTrackingUrl,
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  CreditCardPaymentDetails,
} from "v2/Apps/__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { expectOne } from "v2/DevTools/RootTestPage"
import { produce } from "immer"
import { graphql } from "react-relay"
import { StatusFragmentContainer } from "../Status"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"
import { Title } from "react-head"

jest.unmock("react-relay")

class StatusTestPage extends OrderAppTestPage {
  get messageText() {
    return expectOne(this.find(Message)).text()
  }
  getMessage() {
    return this.find(Message).length
  }
}

const testOrder: StatusQueryRawResponse["order"] = {
  ...OfferOrderWithShippingDetailsAndNote,
  ...CreditCardPaymentDetails,
  state: "SUBMITTED",
  displayState: "SUBMITTED",
}

describe("Status", () => {
  let isEigen
  const pushMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    isEigen = false
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot context={{ isEigen }}>
        <StatusFragmentContainer
          {...props}
          router={{ push: pushMock } as any}
        />
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })

      expect(wrapper.find(Title).text()).toContain("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your offer has been submitted")
        expect(page.text()).toContain(
          "The seller will respond to your offer by Jan 15"
        )
        expect(page.text()).not.toContain(
          "Negotiation with the gallery will continue in the Inbox."
        )
        expect(page.getMessage()).toBe(1)
        expect(page.text()).toContain("Kathryn Markel Fine Arts")
        expect(page.text()).toContain("List price")
        expect(page.text()).toContain("Your noteAnother note!")
        expect(page.getMessage()).toBe(1)
      })

      it("should say order submitted and have message to continue to inbox on Eigen", async () => {
        isEigen = true
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your offer has been submitted")
        expect(page.text()).toContain(
          "The seller will respond to your offer by Jan 15"
        )
        expect(page.text()).toContain(
          "Negotiation with the gallery will continue in the Inbox."
        )
        expect(page.getMessage()).toBe(1)
        expect(page.text()).not.toContain("Kathryn Markel Fine Arts")
        expect(page.text()).not.toContain("List price")
      })

      it("should not show a note section if none exists", async () => {
        const wrapper = getWrapper({
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

    describe("approved", () => {
      it("should say confirmed and have message box", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "APPROVED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer accepted")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("processing", () => {
      it("should say confirmed and have message box", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "PROCESSING",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer accepted")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("in transit", () => {
      it("should say confirmed, have message box and the tracking URL", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "IN_TRANSIT",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessage()).toBe(1)
        expect(page.text()).toContain("steve")
        expect(
          page.find(Message).find("Message").find("RouterLink").html()
        ).toContain(`href="steves-house"`)
      })

      it("should display non linked tracking number if no Url", async () => {
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderWithShippingDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessage()).toBe(1)
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has been picked up")
        expect(page.getMessage()).toBe(0)
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "buyer_rejected",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer declined")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "seller_rejected",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Offer declined")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "seller_lapsed",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("offer expired")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: "buyer_lapsed",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("offer expired")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "REFUNDED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...OfferOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
            stateReason: null,
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
        expect(page.find(TransactionDetailsSummaryItem).length).toBe(1)
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      const wrapper = getWrapper({
        CommerceOrder: () => BuyOrderWithShippingDetails,
      })

      expect(wrapper.find(Title).text()).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "SUBMITTED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has been submitted")
        expect(page.text()).toContain(
          "You will receive a confirmation email by Jan 15"
        )
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "APPROVED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order is confirmed")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "FULFILLED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderWithShippingDetails,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "CANCELED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "REFUNDED",
          }),
        })
        const page = new StatusTestPage(wrapper)

        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })
  })
})
