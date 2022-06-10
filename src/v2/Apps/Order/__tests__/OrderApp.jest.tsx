import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { SystemContextProvider } from "v2/System"
import { ErrorPage } from "v2/Components/ErrorPage"
import { mount } from "enzyme"
import { Resolver } from "found-relay"
import { getFarceResult } from "found/server"
import { HeadProvider, Meta } from "react-head"
import { OrderApp } from "../OrderApp"

import { orderRoutes_OrderQueryRawResponse } from "v2/__generated__/orderRoutes_OrderQuery.graphql"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  UntouchedBuyOrder,
  UntouchedBuyOrderWithShippingQuotes,
  UntouchedOfferOrder,
} from "v2/Apps/__tests__/Fixtures/Order"
import { MockBoot } from "v2/DevTools"
import { createMockNetworkLayer2 } from "v2/DevTools/createMockNetworkLayer"
import { FarceRedirectResult } from "found/server"
import { DateTime } from "luxon"
import { Environment, RecordSource, Store } from "relay-runtime"
// eslint-disable-next-line no-restricted-imports
import { GlobalData } from "sharify"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.mock(
  "v2/Components/BankDebitForm/BankDebitProvider",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return require("../Components/__mocks__/BankDebitProvider")
  }
)

jest.mock("@stripe/stripe-js", () => {
  let mock: null | ReturnType<typeof mockStripe> = null
  return {
    loadStripe: () => {
      if (mock === null) {
        mock = mockStripe()
      }
      return mock
    },
    _mockStripe: () => mock,

    _mockReset: () => (mock = mockStripe()),
  }
})

describe("OrderApp routing redirects", () => {
  // FIXME: move to DevTools folder
  async function render(
    url: string,
    mockData: orderRoutes_OrderQueryRawResponse
  ): Promise<FarceRedirectResult> {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    const result = await getFarceResult({
      render: () => <div>hello</div>,
      resolver: new Resolver(environment),
      routeConfig: orderRoutes,
      url,
    })

    return result as FarceRedirectResult
  }

  const mockResolver = (data: orderRoutes_OrderQueryRawResponse["order"]) => ({
    me: { id: "alice_jane", name: "Alice Jane" },
    order: data,
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
        lineItems: {
          edges: [
            {
              node: {
                artwork: {
                  href: "/artwork/artwork-id",
                  id: "artwork-id",
                  is_acquireable: true,
                  is_offerable: true,
                  slug: "artwork-id",
                },
                shippingQuoteOptions: null,
                id: "node id",
              },
            },
          ],
        },
        state: "ABANDONED",
      })
    )
    expect(redirect.url).toBe("/artwork/artwork-id")
  })

  it("redirects to the home page if the order is abandoned and has no ID", async () => {
    const { redirect } = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...BuyOrderPickup,
        lineItems: null,
        state: "ABANDONED",
      })
    )
    expect(redirect.url).toBe("/")
  })

  it("stays on the shipping route if no shipping option is set", async () => {
    const { redirect } = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...UntouchedBuyOrder,
        requestedFulfillment: null,
        state: "PENDING",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the payment route if no shipping option was set", async () => {
    const { redirect } = await render(
      "/orders/2939023/payment",
      mockResolver({
        ...UntouchedBuyOrder,
        requestedFulfillment: null,
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("redirects to the shipping route from the payment route if no shipping quote was set", async () => {
    const { redirect } = await render(
      "/orders/2939023/payment",
      mockResolver({
        ...UntouchedBuyOrderWithShippingQuotes,
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("stays on the payment route if there is shipping but no payment info", async () => {
    const { redirect } = await render(
      "/orders/2939023/payment",
      mockResolver({
        ...UntouchedBuyOrder,
        creditCard: null,
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "PENDING",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the review route if no shipping option was set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        creditCard: null,
        requestedFulfillment: null,
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("redirects to the shipping route from the review route if no shipping quote was set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrderWithShippingQuotes,
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/shipping")
  })

  it("redirects to the payment route from the review route if no credit card is set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        creditCard: null,
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/payment")
  })

  it("stays on the review route if there are payment and shipping options set", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        creditCard: {
          id: "",
          internalID: "29390235",
        },
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "PENDING",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects from the status route to the review route if the order is pending", async () => {
    const { redirect } = await render(
      "/orders/2939023/status",
      mockResolver({
        ...UntouchedBuyOrder,
        creditCard: {
          id: "",
          internalID: "12345",
        },
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/review")
  })

  it("stays on the status page if the order is submitted", async () => {
    const { redirect } = await render(
      "/orders/2939023/status",
      mockResolver({
        ...UntouchedBuyOrder,
        creditCard: {
          id: "",
          internalID: "29390235",
        },
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "SUBMITTED",
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

        awaitingResponseFrom: "BUYER",
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/status")
  })

  it("Stays on the respond page if all the appropriate conditions are met", async () => {
    const { redirect } = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...OfferOrderWithShippingDetails,

        awaitingResponseFrom: "BUYER",
        state: "SUBMITTED",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("Redirects from the status route to the respond route if awaiting buyer response", async () => {
    const { redirect } = await render(
      "/orders/2939023/status",
      mockResolver({
        ...OfferOrderWithShippingDetails,
        creditCard: {
          id: "relay-node-id",
          internalID: "gravity-credit-card-id",
        },
        awaitingResponseFrom: "BUYER",
        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/respond")
  })

  describe("visiting the /review/counter page", () => {
    const counterOfferOrder: orderRoutes_OrderQueryRawResponse["order"] = {
      ...OfferOrderWithShippingDetails,
      awaitingResponseFrom: "BUYER",
      id: "2939023",
      lastOffer: {
        ...OfferWithTotals,
        createdAt: DateTime.local().minus({ days: 1 }).toString(),
        id: "last-offer",
        internalID: "last-offer",
      },
      myLastOffer: {
        createdAt: DateTime.local().toString(),
        id: "my-last-offer",
        internalID: "my-last-offer",
      },
      state: "SUBMITTED",
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
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
    const counterOfferOrder: orderRoutes_OrderQueryRawResponse["order"] = {
      ...OfferOrderWithShippingDetails,

      awaitingResponseFrom: "BUYER",
      lastOffer: {
        ...OfferWithTotals,
        createdAt: DateTime.local().minus({ days: 1 }).toString(),
        id: "last-offer",
        internalID: "last-offer",
      },
      lastTransactionFailed: true,
      myLastOffer: {
        createdAt: DateTime.local().toString(),
        id: "my-last-offer",
        internalID: "my-last-offer",
      },
      state: "SUBMITTED",
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
    window.sd = { STRIPE_PUBLISHABLE_KEY: "" } as GlobalData
  })

  const getProps = ({ state, location, replace }: any = {}) => {
    return {
      children: false,
      location: { pathname: location || "/order/123/shipping" },
      order: {
        ...UntouchedBuyOrder,
        state: state || "PENDING",
      },
      params: {
        orderID: "123",
      },
      routeIndices: [],
      router: {
        // tslint:disable-next-line:no-empty
        addNavigationListener: () => {},
        replace,
      },
      routes: [],
    }
  }

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
    const subject = getWrapper({ context: { isEigen: true }, props }) as any
    const viewportMetaTags = subject
      .find(Meta)
      .filterWhere(meta => meta.props().name === "viewport")
    expect(viewportMetaTags.length).toBe(1)
  })

  it("shows the sticky 'need help?' footer", () => {
    const props = getProps() as any
    const subject = getWrapper({ props }) as any
    expect(subject.text()).toMatch(
      "Need help? Visit our help center or ask a question."
    )
  })

  it("shows the Zendesk chat integration button", () => {
    const props = getProps() as any
    const subject = getWrapper({ props }) as any
    expect(subject.find("ZendeskWrapper")).toHaveLength(1)
  })

  it("does not show the Zendesk chat integration button if in a modal", () => {
    const props = getProps()
    const subject = getWrapper({
      props: { ...props, location: { query: { isModal: true } } },
    })

    expect(subject.find("ZendeskWrapper")).toHaveLength(1)
  })

  it("shows an error page if the order is missing", () => {
    const props = getProps()
    const subject = getWrapper({
      context: { isEigen: true },
      props: { ...props, order: null },
    })

    subject.find(ErrorPage)

    expect(subject.find(ErrorPage).text()).toContain(
      "Sorry, the page you were looking for doesn’t exist at this URL."
    )
  })
})
