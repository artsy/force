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
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { expectOne } from "v2/DevTools/RootTestPage"
import { render } from "enzyme"
import { produce } from "immer"
import { graphql } from "react-relay"
import { StatusFragmentContainer } from "../Status"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

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

const testEnvProps = {
  Component: StatusFragmentContainer,
  query: graphql`
    query StatusQuery @raw_response_type @relay_test_operation {
      order: commerceOrder(id: "42") {
        ...Status_order
      }
    }
  `,
  defaultData: {
    order: testOrder,
  },
  TestPage: StatusTestPage,
}

describe("Status", () => {
  const env = createTestEnv(testEnvProps)

  function buildPageWithOrder<Order>(order: Order) {
    return env.buildPage({
      mockData: {
        order,
      },
    })
  }

  beforeAll(env.clearErrors)

  afterEach(env.clearMocksAndErrors)

  describe("offers", () => {
    it("should should have a title containing status", async () => {
      expect(env.headTags.length).toEqual(0)
      await env.buildPage()
      expect(env.headTags.length).toEqual(1)
      expect(render(env.headTags[0]).text()).toBe("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const page = await env.buildPage()
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
      })

      it("should say order submitted and have message to continue to inbox on Eigen", async () => {
        const env = createTestEnv({
          ...testEnvProps,
          systemContextProps: {
            isEigen: true,
          },
        })
        const page = await env.buildPage()
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

      it("should show a note section", async () => {
        const page = await env.buildPage()
        expect(page.text()).toContain("Your noteAnother note!")
        expect(page.getMessage()).toBe(1)
      })

      it("should not show a note section if none exists", async () => {
        const page = await buildPageWithOrder(
          produce(testOrder, order => {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            order.lastOffer.note = null
          })
        )
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("approved", () => {
      it("should say confirmed and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          displayState: "APPROVED",
        })
        expect(page.text()).toContain("Offer accepted")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("processing", () => {
      it("should say confirmed and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          displayState: "PROCESSING",
        })
        expect(page.text()).toContain("Offer accepted")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("in transit", () => {
      it("should say confirmed and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          displayState: "IN_TRANSIT",
        })
        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessage()).toBe(1)
      })

      it("should display non linked tracking number if no Url", async () => {
        const page = await buildPageWithOrder({
          ...ArtaShippedWithTrackingIdNoTrackingUrl,
          displayState: "IN_TRANSIT",
        })
        expect(page.text()).toContain("oxa")
        expect(
          page.find(Message).find("Message").find("RouterLink").length
        ).toBe(0)
      })

      it("should display link to tracking URL if present", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          displayState: "IN_TRANSIT",
        })
        expect(page.text()).toContain("steve")
        expect(
          page.find(Message).find("Message").find("RouterLink").html()
        ).toContain(`href="steves-house"`)
      })

      it("should display note about shipping when tracking is not available", async () => {
        const page = await buildPageWithOrder({
          ...ArtaShippedWithNoTrackingIdNoTrackingUrl,
          ...CreditCardPaymentDetails,
          displayState: "IN_TRANSIT",
        })
        expect(page.text()).toContain(
          "Our delivery provider will call you to provide a delivery window when it arrives in your area."
        )
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          displayState: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessage()).toBe(1)
      })

      it("should not contain a note section", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          displayState: "FULFILLED",
        })
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has been picked up")
        expect(page.getMessage()).toBe(0)
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
          stateReason: "buyer_rejected",
        })
        expect(page.text()).toContain("Offer declined")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
          stateReason: "seller_rejected",
        })
        expect(page.text()).toContain("Offer declined")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
          stateReason: "seller_lapsed",
        })
        expect(page.text()).toContain("offer expired")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
          stateReason: "buyer_lapsed",
        })
        expect(page.text()).toContain("offer expired")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "REFUNDED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
          stateReason: null,
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
        expect(page.find(TransactionDetailsSummaryItem).length).toBe(1)
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      expect(env.headTags.length).toEqual(0)
      await env.buildPage({ mockData: { order: BuyOrderWithShippingDetails } })
      expect(env.headTags.length).toEqual(1)
      expect(render(env.headTags[0]).text()).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...CreditCardPaymentDetails,
          displayState: "SUBMITTED",
        })
        expect(page.text()).toContain("Your order has been submitted")
        expect(page.text()).toContain(
          "You will receive a confirmation email by Jan 15"
        )
        expect(page.getMessage()).toBe(1)
      })

      describe("for pickup with payment method wire transfer", () => {
        it("should present a general message and not specify a time for confirmation", async () => {
          const page = await buildPageWithOrder({
            ...BuyOrderPickup,
            ...CreditCardPaymentDetails,
            displayState: "SUBMITTED",
            paymentMethod: "WIRE_TRANSFER",
          })
          expect(page.text()).toContain("Your order has been submitted")
          expect(page.text()).toContain(
            "After your order is confirmed, a specialist will contact you to coordinate pickup."
          )
          expect(page.text()).not.toContain(
            "You will receive a confirmation email by"
          )
        })
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...CreditCardPaymentDetails,
          displayState: "APPROVED",
        })
        expect(page.text()).toContain("Your order is confirmed")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...CreditCardPaymentDetails,
          displayState: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has shipped")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has been picked up")
        expect(page.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "CANCELED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          ...CreditCardPaymentDetails,
          displayState: "REFUNDED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        expect(page.getMessage()).toBe(1)
      })
    })
  })
})
