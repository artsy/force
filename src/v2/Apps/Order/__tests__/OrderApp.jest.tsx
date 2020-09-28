import { routes } from "v2/Apps/Order/routes"
import { SystemContextProvider } from "v2/Artsy"
import { ErrorPage } from "v2/Components/ErrorPage"
import { mount } from "enzyme"
import { Resolver } from "found-relay"
import { getFarceResult } from "found/server"
import React from "react"
import { HeadProvider, Meta } from "react-head"
import { OrderApp } from "../OrderApp"

import { routes_OrderQueryRawResponse } from "v2/__generated__/routes_OrderQuery.graphql"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  UntouchedBuyOrder,
  UntouchedOfferOrder,
} from "v2/Apps/__tests__/Fixtures/Order"
import { MockBoot } from "v2/DevTools"
import { createMockNetworkLayer2 } from "v2/DevTools/createMockNetworkLayer"
import { FarceRedirectResult } from "found/server"
import { DateTime } from "luxon"
import { Environment, RecordSource, Store } from "relay-runtime"
import { GlobalData } from "sharify"

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
  CardElement: () => jest.fn(),
  injectStripe: () => jest.fn(),
}))

describe("OrderApp routing redirects", () => {
  // FIXME: move to DevTools folder
  async function render(
    url: string,
    mockData: routes_OrderQueryRawResponse
  ): Promise<FarceRedirectResult> {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    const result = await getFarceResult({
      url,
      routeConfig: routes,
      resolver: new Resolver(environment),
      render: () => <div>hello</div>,
    })

    return result as FarceRedirectResult
  }

  const mockResolver = (data: routes_OrderQueryRawResponse["order"]) => ({
    order: data,
    me: { name: "Alice Jane", id: "alice_jane" },
  })

  it("does not redirect to the status route if the order is pending", async () => {
    const { redirect } = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...BuyOrderPickup,
        state: "PENDING",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the status route if the order is not pending", async () => {
    const res = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...BuyOrderPickup,
        state: "SUBMITTED",
      })
    )
    expect(res.redirect.url).toBe("/orders/2939023/status")
  })

  it("redirects to the artwork page if the order is abandoned", async () => {
    const { redirect } = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...BuyOrderPickup,
        state: "ABANDONED",
        lineItems: {
          edges: [
            {
              node: {
                id: "node id",
                artwork: {
                  id: "artwork-id",
                  slug: "artwork-id",
                  href: "/artwork/artwork-id",
                  is_acquireable: true,
                  is_offerable: false,
                },
              },
            },
          ],
        },
      })
    )
    expect(redirect.url).toBe("/artwork/artwork-id")
  })

  it("redirects to the home page if the order is abandoned and has no ID", async () => {
    const { redirect } = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...BuyOrderPickup,
        state: "ABANDONED",
        lineItems: null,
      })
    )
    expect(redirect.url).toBe("/")
  })

  it("stays on the shipping route if no shipping option is set", async () => {
    const { redirect } = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: null,
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the payment route if no shipping option was set", async () => {
    const { redirect } = await render(
      "/orders/2939023/payment",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: null,
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("stays on the payment route if there is shipping but no payment info", async () => {
    const { redirect } = await render(
      "/orders/2939023/payment",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        creditCard: null,
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the review route if no shipping option was set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: null,
        creditCard: null,
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("redirects to the payment route from the review route if no credit card is set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        creditCard: null,
      })
    )
    expect(redirect.url).toBe("/orders/2939023/payment")
  })

  it("stays on the review route if there are payment and shipping options set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        creditCard: {
          id: "",
          internalID: "29390235",
        },
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects from the status route to the review route if the order is pending", async () => {
    const { redirect } = await render(
      "/orders/2939023/status",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        creditCard: {
          id: "",
          internalID: "12345",
        },
      })
    )
    expect(redirect.url).toBe("/orders/2939023/review")
  })

  it("stays on the status page if the order is submitted", async () => {
    const { redirect } = await render(
      "/orders/2939023/status",
      mockResolver({
        ...UntouchedBuyOrder,
        state: "SUBMITTED",
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        creditCard: {
          id: "",
          internalID: "29390235",
        },
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("stays on the offer route if the order is an offer order", async () => {
    const { redirect } = await render(
      "/orders/2939023/offer",
      mockResolver({
        ...UntouchedOfferOrder,

        requestedFulfillment: null,
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects from the offer route to the shipping route if the order is not an offer order", async () => {
    const { redirect } = await render(
      "/orders/2939023/offer",
      mockResolver({
        ...UntouchedBuyOrder,

        requestedFulfillment: null,
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("redirects from the offer route to the status route if the order is not pending", async () => {
    const { redirect } = await render(
      "/orders/2939023/offer",
      mockResolver({
        ...BuyOrderWithShippingDetails,

        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/status")
  })

  it("redirects from the respond route to the status route if not offer order", async () => {
    const { redirect } = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...BuyOrderWithShippingDetails,

        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/status")
  })

  it("redirects from the respond route to the status route if order is not submitted", async () => {
    const { redirect } = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...OfferOrderWithShippingDetails,

        state: "PENDING",
        awaitingResponseFrom: "BUYER",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/status")
  })

  it("Stays on the respond page if all the appropriate conditions are met", async () => {
    const { redirect } = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...OfferOrderWithShippingDetails,

        state: "SUBMITTED",
        awaitingResponseFrom: "BUYER",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("Redirects from the status route to the respond route if awaiting buyer response", async () => {
    const { redirect } = await render(
      "/orders/2939023/status",
      mockResolver({
        ...OfferOrderWithShippingDetails,

        state: "SUBMITTED",
        awaitingResponseFrom: "BUYER",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/respond")
  })

  describe("visiting the /review/counter page", () => {
    const counterOfferOrder: routes_OrderQueryRawResponse["order"] = {
      ...OfferOrderWithShippingDetails,
      id: "2939023",
      state: "SUBMITTED",
      lastOffer: {
        ...OfferWithTotals,
        id: "last-offer",
        internalID: "last-offer",
        createdAt: DateTime.local().minus({ days: 1 }).toString(),
      },
      myLastOffer: {
        id: "my-last-offer",
        internalID: "my-last-offer",
        createdAt: DateTime.local().toString(),
      },
      awaitingResponseFrom: "BUYER",
    } as const
    it("stays on the /review/counter page if all conditions are met", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver(counterOfferOrder)
      )
      expect(redirect).toBe(undefined)
    })
    // goToStatusIfNotOfferOrder,
    it("redirects to /status if not an offer order", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          mode: "BUY",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/status")
    })
    // goToStatusIfNotAwaitingBuyerResponse,
    it("redirects to /status if not awaiting a buyer response", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          awaitingResponseFrom: "SELLER",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/status")
    })
    // goToStatusIfOrderIsNotSubmitted,
    it("redirects to /status if order is not submitted", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          state: "PENDING",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/status")
    })
    // goToRespondIfMyLastOfferIsNotMostRecentOffer,
    it("redirects to /respond if myLastOffer is not more recent than lastOffer", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          myLastOffer: {
            ...counterOfferOrder.myLastOffer,
            createdAt: DateTime.local().minus({ days: 2 }).toString(),
          },
        })
      )
      expect(redirect.url).toBe("/orders/2939023/respond")
    })
  })

  describe("visiting the /payment/new page", () => {
    const counterOfferOrder: routes_OrderQueryRawResponse["order"] = {
      ...OfferOrderWithShippingDetails,

      state: "SUBMITTED",
      lastOffer: {
        ...OfferWithTotals,
        internalID: "last-offer",
        id: "last-offer",
        createdAt: DateTime.local().minus({ days: 1 }).toString(),
      },
      myLastOffer: {
        internalID: "my-last-offer",
        id: "my-last-offer",
        createdAt: DateTime.local().toString(),
      },
      awaitingResponseFrom: "BUYER",
      lastTransactionFailed: true,
    } as const
    it("stays on the /payment/new page if all conditions are met", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver(counterOfferOrder)
      )
      expect(redirect).toBe(undefined)
    })
    // goToStatusIfNotOfferOrder,
    it("redirects to /status if not an offer order", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver({
          ...counterOfferOrder,
          mode: "BUY",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/status")
    })
    // goToStatusIfOrderIsNotSubmitted,
    it("redirects to /status if order is not submitted", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver({
          ...counterOfferOrder,
          state: "PENDING",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/status")
    })

    it("redirects to /status if order does not have a failing last transaction", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver({
          ...counterOfferOrder,
          lastTransactionFailed: false,
        })
      )
      expect(redirect.url).toBe("/orders/2939023/status")
    })
  })
})

describe("OrderApp", () => {
  const getWrapper = ({ props, context }: any) => {
    return mount(
      <MockBoot>
        <HeadProvider>
          <SystemContextProvider {...context}>
            <OrderApp {...props} />
          </SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    )
  }
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" } as GlobalData
  })

  const getProps = ({ state, location, replace }: any = {}) => {
    return {
      children: false,
      params: {
        orderID: "123",
      },
      location: { pathname: location || "/order/123/shipping" },
      router: {
        // tslint:disable-next-line:no-empty
        addNavigationListener: () => {},
        replace,
      },
      order: {
        ...UntouchedBuyOrder,
        state: state || "PENDING",
      },
      routeIndices: [],
      routes: [],
    }
  }

  it("enables intercom", () => {
    const trigger = jest.fn()
    const props = getProps()
    getWrapper({ props, context: { mediator: { trigger } } })
    expect(trigger).toHaveBeenCalledWith("enableIntercomForBuyers", {
      is_acquireable: true,
      is_offerable: false,
    })
  })

  it("adds a meta tag with 'view-port-fit=cover' when not Eigen", () => {
    const props = getProps() as any
    const subject = getWrapper({ props }) as any
    const viewportMetaTags = subject
      .find(Meta)
      .filterWhere(meta => meta.props().name === "viewport")
    expect(viewportMetaTags.first().html()).toMatch(
      '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover">'
    )
  })

  it("includes meta viewport tag if Eigen", () => {
    const props = getProps()
    const subject = getWrapper({ props, context: { isEigen: true } }) as any
    const viewportMetaTags = subject
      .find(Meta)
      .filterWhere(meta => meta.props().name === "viewport")
    expect(viewportMetaTags.length).toBe(1)
  })

  it("shows the sticky 'need help?' footer", () => {
    const props = getProps() as any
    const subject = getWrapper({ props }) as any
    expect(subject.text()).toMatch("Need help? Visit our help center or ask a question.")
  })

  it("shows an error page if the order is missing", () => {
    const props = getProps()
    const subject = getWrapper({
      props: { ...props, order: null },
      context: { isEigen: true },
    })

    subject.find(ErrorPage)

    expect(subject.find(ErrorPage).text()).toContain(
      "Sorry, the page you were looking for doesn’t exist at this URL."
    )
  })
})
