import { Message } from "@artsy/palette"
import { StatusQueryRawResponse } from "v2/__generated__/StatusQuery.graphql"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  PaymentDetails,
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
  expectMessage() {
    expect(this.find(Message).length).toBe(1)
  }
  expectNoMessage() {
    expect(this.find(Message).length).toBe(0)
  }
}

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never

const testOrder: UnionToIntersection<StatusQueryRawResponse["order"]> = {
  ...OfferOrderWithShippingDetailsAndNote,
  ...PaymentDetails,
  state: "SUBMITTED",
}

describe("Status", () => {
  const env = createTestEnv({
    Component: StatusFragmentContainer,
    query: graphql`
      query StatusQuery @raw_response_type {
        order: commerceOrder(id: "42") {
          ...Status_order
        }
      }
    `,
    defaultData: {
      order: testOrder,
    },
    TestPage: StatusTestPage,
  })

  function buildPageWithOrder<Order>(order: Order) {
    return env.buildPage({
      mockData: {
        order,
      },
    })
  }

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
        page.expectMessage()
      })

      it("should show a note section", async () => {
        const page = await env.buildPage()
        expect(page.text()).toContain("Your noteAnother note!")
        page.expectMessage()
      })

      it("should not show a note section if none exists", async () => {
        const page = await buildPageWithOrder(
          produce(testOrder, order => {
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
          ...PaymentDetails,
          state: "APPROVED",
        })
        expect(page.text()).toContain("Offer accepted")
        page.expectMessage()
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          ...PaymentDetails,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has shipped")
        page.expectMessage()
      })

      it("should not contain a note section", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          ...PaymentDetails,
          state: "FULFILLED",
        })
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has been picked up")
        page.expectNoMessage()
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "CANCELED",
          stateReason: "buyer_rejected",
        })
        expect(page.text()).toContain("Offer declined")
        page.expectMessage()
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "CANCELED",
          stateReason: "seller_rejected",
        })
        expect(page.text()).toContain("Offer declined")
        page.expectMessage()
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "CANCELED",
          stateReason: "seller_lapsed",
        })
        expect(page.text()).toContain("offer expired")
        page.expectMessage()
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "CANCELED",
          stateReason: "buyer_lapsed",
        })
        expect(page.text()).toContain("offer expired")
        page.expectMessage()
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "REFUNDED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          ...PaymentDetails,
          state: "CANCELED",
          stateReason: null,
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
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
          ...PaymentDetails,
          state: "SUBMITTED",
        })
        expect(page.text()).toContain("Your order has been submitted")
        expect(page.text()).toContain(
          "You will receive a confirmation email by Jan 15"
        )
        page.expectMessage()
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...PaymentDetails,
          state: "APPROVED",
        })
        expect(page.text()).toContain("Your order is confirmed")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...PaymentDetails,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has shipped")
        page.expectMessage()
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          ...PaymentDetails,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has been picked up")
        expect(page.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          ...PaymentDetails,
          state: "CANCELED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          ...PaymentDetails,
          state: "CANCELED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          ...PaymentDetails,
          state: "REFUNDED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })
  })
})
