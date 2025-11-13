import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  CreditCardPaymentDetails,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  PrivateSaleOrderWithShippingDetails,
  UntouchedBuyOrder,
  UntouchedBuyOrderWithShippingQuotes,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { OrderAppFragmentContainer } from "Apps/Order/OrderApp"
import { orderRoutes } from "Apps/Order/orderRoutes"
import { MockBoot } from "DevTools/MockBoot"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { getENV } from "Utils/getENV"
import { render, screen } from "@testing-library/react"
import type { orderRoutes_OrderQuery$rawResponse } from "__generated__/orderRoutes_OrderQuery.graphql"
import type { FarceRedirectResult } from "found/server"
import { getFarceResult } from "found/server"
import { Resolver } from "found-relay"
import { DateTime } from "luxon"
import { HeadProvider } from "react-head"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({
    isEigen: false,
  }),
}))

jest.mock(
  "Components/BankDebitForm/BankDebitProvider",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return jest.requireActual("../Components/__mocks__/BankDebitProvider")
  }
)

const featureFlags = {
  isEnabled: jest.fn(() => false),
}

describe("OrderApp routing redirects", () => {
  // FIXME: move to DevTools folder
  async function render(url: string, mockData): Promise<FarceRedirectResult> {
    const environment = createMockEnvironment()

    environment.mock.queueOperationResolver(operation =>
      MockPayloadGenerator.generate(operation, mockData as any)
    )

    const result = await getFarceResult({
      render: _props => {
        return <div>hello</div>
      },
      resolver: new Resolver(environment),
      routeConfig: orderRoutes,
      url,
      matchContext: {
        featureFlags,
      },
    })

    return result as FarceRedirectResult
  }

  const mockResolver = data => ({
    Me: () => ({
      id: "alice_jane",
      name: "Alice Jane",
      email: "foo",
      addressConnection: null,
    }),
    Query: () => ({
      order: {
        internalID: 2939023,
        ...data,
      },
    }),
  })

  describe("new checkout flow redirects", () => {
    it("redirects from the legacy shipping step to the new checkout flow if feature flag is enabled and order is BUY mode", async () => {
      featureFlags.isEnabled.mockReturnValue(true)
      const res = await render(
        "/orders/2939023/shipping",
        mockResolver({
          ...BuyOrderPickup,
          state: "PENDING",
          mode: "BUY",
        })
      )
      expect(res.redirect.url).toBe("/orders2/2939023/checkout")
    })

    it("redirects from the legacy payment step to the new checkout flow if feature flag is enabled and order is BUY mode", async () => {
      featureFlags.isEnabled.mockReturnValue(true)
      const res = await render(
        "/orders/2939023/payment",
        mockResolver({
          ...BuyOrderPickup,
          state: "PENDING",
          mode: "BUY",
        })
      )
      expect(res.redirect.url).toBe("/orders2/2939023/checkout")
    })

    it("redirects from the legacy review step to the new checkout flow if feature flag is enabled and order is BUY mode", async () => {
      featureFlags.isEnabled.mockReturnValue(true)
      const res = await render(
        "/orders/2939023/review",
        mockResolver({
          ...BuyOrderPickup,
          state: "PENDING",
          mode: "BUY",
        })
      )
      expect(res.redirect.url).toBe("/orders2/2939023/checkout")
    })

    it("redirects from the legacy review step to the new checkout flow if feature flag is enabled and order is OFFER mode", async () => {
      featureFlags.isEnabled.mockReturnValue(true)
      const res = await render(
        "/orders/2939023/offer",
        mockResolver({
          ...BuyOrderPickup,
          state: "PENDING",
          mode: "OFFER",
        })
      )
      expect(res.redirect.url).toBe("/orders2/2939023/checkout")
    })

    it("redirects from the legacy status page to the new details page for a submitted order if the order is BUY mode", async () => {
      featureFlags.isEnabled.mockReturnValue(true)
      const res = await render(
        "/orders/2939023/status",
        mockResolver({
          ...BuyOrderPickup,
          state: "SUBMITTED",
        })
      )
      expect(res.redirect.url).toBe("/orders/2939023/details")
    })

    it("redirects from the legacy status page to the new details page for a submitted order if the order is OFFER mode", async () => {
      featureFlags.isEnabled.mockReturnValue(true)
      const res = await render(
        "/orders/2939023/status",
        mockResolver({
          ...BuyOrderPickup,
          mode: "OFFER",
          state: "SUBMITTED",
          displayState: "SUBMITTED",
        })
      )
      expect(res.redirect.url).toBe("/orders/2939023/details")
    })
  })

  it("does not redirect to the status route if the order is pending", async () => {
    try {
      await render(
        "/orders/2939023/shipping",
        mockResolver({
          ...BuyOrderPickup,
          state: "PENDING",
        })
      )
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
  })

  it("redirects to the details route if the order is not pending", async () => {
    const res = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...BuyOrderPickup,
        state: "SUBMITTED",
        displayState: "SUBMITTED",
      })
    )

    expect(res.redirect.url).toBe("/orders/2939023/details")
  })

  it("redirects to the payment route if order is private sale", async () => {
    const res = await render(
      "/orders/2939023/shipping",
      mockResolver({
        ...PrivateSaleOrderWithShippingDetails,
      })
    )

    expect(res.redirect.url).toBe("/orders/2939023/payment")
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
    try {
      await render(
        "/orders/2939023/shipping",
        mockResolver({
          ...UntouchedBuyOrder,
          requestedFulfillment: null,
          state: "PENDING",
        })
      )
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
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
    try {
      await render(
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
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
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
        paymentSet: false,
        paymentMethodDetails: null,
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/payment")
  })

  it("does not redirect to the payment route from the review route if credit card was set but later deleted", async () => {
    const { redirect } = await render(
      "/orders/2939023/review",
      mockResolver({
        ...UntouchedBuyOrder,
        paymentSet: true,
        paymentMethodDetails: null,
        requestedFulfillment: {
          __typename: "CommerceShip",
        },
        state: "APPROVED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/details")
  })

  it("stays on the review route if there are payment and shipping options set", async () => {
    try {
      await render(
        "/orders/2939023/review",
        mockResolver({
          ...UntouchedBuyOrder,
          ...CreditCardPaymentDetails,
          requestedFulfillment: {
            __typename: "CommerceShip",
          },
          state: "PENDING",
        })
      )
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
  })

  it("redirects from the details route to the review route if the order is pending", async () => {
    const { redirect } = await render(
      "/orders/2939023/details",
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

  it("stays on the details page if the order is submitted", async () => {
    try {
      await render(
        "/orders/2939023/details",
        mockResolver({
          ...UntouchedBuyOrder,
          ...CreditCardPaymentDetails,
          requestedFulfillment: {
            __typename: "CommerceShip",
          },
          state: "SUBMITTED",
        })
      )
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
  })

  it("stays on the offer route if the order is an offer order", async () => {
    try {
      await render(
        "/orders/2939023/offer",
        mockResolver({
          ...UntouchedOfferOrder,

          requestedFulfillment: null,
        })
      )
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
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

  it("redirects from the offer route to the details route if the order is not pending", async () => {
    const { redirect } = await render(
      "/orders/2939023/offer",
      mockResolver({
        ...BuyOrderWithShippingDetails,

        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/details")
  })

  it("redirects from the respond route to the details route if not offer order", async () => {
    const { redirect } = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...BuyOrderWithShippingDetails,

        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/details")
  })

  it("redirects from the respond route to the details route if order is not submitted", async () => {
    const { redirect } = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...OfferOrderWithShippingDetails,

        awaitingResponseFrom: "BUYER",
        state: "PENDING",
        displayState: "PENDING",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/details")
  })

  it("redirects to the new payment route if lastTransactionFailed failed on offer and state is submitted", async () => {
    const res = await render(
      "/orders/2939023/respond",
      mockResolver({
        ...UntouchedOfferOrder,
        state: "SUBMITTED",
        awaitingResponseFrom: "BUYER",
        lastTransactionFailed: true,
      })
    )
    expect(res.redirect.url).toBe("/orders/2939023/payment/new")
  })

  it("Stays on the respond page if all the appropriate conditions are met", async () => {
    try {
      await render(
        "/orders/2939023/respond",
        mockResolver({
          ...OfferOrderWithShippingDetails,

          awaitingResponseFrom: "BUYER",
          state: "SUBMITTED",
        })
      )
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
      expect(error.message).toBe("No redirect found for order")
    }
  })

  it("Redirects from the details route to the respond route if awaiting buyer response", async () => {
    const { redirect } = await render(
      "/orders/2939023/details",
      mockResolver({
        ...OfferOrderWithShippingDetails,
        awaitingResponseFrom: "BUYER",
        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/2939023/respond")
  })

  describe("visiting the /review/counter page", () => {
    const counterOfferOrder: orderRoutes_OrderQuery$rawResponse["order"] = {
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
      try {
        await render(
          "/orders/2939023/review/counter",
          mockResolver(counterOfferOrder)
        )
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(error.message).toBe("No redirect found for order")
      }
    })
    // goToDetailsIfNotOfferOrder,
    it("redirects to /details if not an offer order", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          mode: "BUY",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/details")
    })
    // goToDetailsIfNotAwaitingBuyerResponse,
    it("redirects to /details if not awaiting a buyer response", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          awaitingResponseFrom: "SELLER",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/details")
    })
    // goToDetailsIfOrderIsNotSubmitted,
    it("redirects to /details if order is not submitted", async () => {
      const { redirect } = await render(
        "/orders/2939023/review/counter",
        mockResolver({
          ...counterOfferOrder,
          state: "PENDING",
          displayState: "PENDING",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/details")
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
    const counterOfferOrder: orderRoutes_OrderQuery$rawResponse["order"] = {
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
      try {
        await render(
          "/orders/2939023/payment/new",
          mockResolver(counterOfferOrder)
        )
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(error.message).toBe("No redirect found for order")
      }
    })
    // goToDetailsIfNotOfferOrder,
    it("redirects to /details if not an offer order", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver({
          ...counterOfferOrder,
          mode: "BUY",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/details")
    })
    // goToDetailsIfOrderIsNotSubmitted,
    it("redirects to /details if order is not submitted", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver({
          ...counterOfferOrder,
          state: "PENDING",
          displayState: "PENDING",
        })
      )
      expect(redirect.url).toBe("/orders/2939023/details")
    })

    it("redirects to /details if order does not have a failing last transaction", async () => {
      const { redirect } = await render(
        "/orders/2939023/payment/new",
        mockResolver({
          ...counterOfferOrder,
          lastTransactionFailed: false,
        })
      )
      expect(redirect.url).toBe("/orders/2939023/details")
    })
  })
})

describe("OrderApp", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockGetENV = getENV as jest.Mock

  const getWrapper = ({ props, context, breakpoint = "lg" }: any) => {
    return render(
      <MockBoot breakpoint={breakpoint}>
        <HeadProvider>
          <SystemContextProvider {...context}>
            <OrderAppFragmentContainer {...props} />
          </SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    )
  }

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
    getWrapper({ props })
    const viewportMetaTags = document.querySelectorAll('meta[name="viewport"]')
    expect(viewportMetaTags[0]?.getAttribute("content")).toMatch(
      /viewport-fit=cover/
    )
  })

  it("includes meta viewport tag if Eigen", () => {
    const props = getProps()
    getWrapper({ context: { isEigen: true }, props })
    const viewportMetaTags = document.querySelectorAll('meta[name="viewport"]')
    expect(viewportMetaTags.length).toBeGreaterThanOrEqual(1)
  })

  it("shows the sticky 'need help?' footer", () => {
    const props = getProps() as any
    getWrapper({ props })

    // Check for the sticky footer by finding elements with specific text content
    const footerContainers = screen.getAllByText((_content, element) => {
      const hasText =
        element?.textContent?.includes("Need help?") &&
        element?.textContent?.includes("Visit our help center") &&
        element?.textContent?.includes("ask a question.")
      return hasText || false
    })

    // Expect at least one footer container
    expect(footerContainers.length).toBeGreaterThan(0)
    expect(footerContainers[0]).toBeInTheDocument()

    // Also verify the individual interactive elements
    expect(screen.getByText("Visit our help center")).toBeInTheDocument()
    expect(screen.getByText("ask a question.")).toBeInTheDocument()
  })

  it("shows an error page if the order is missing", () => {
    const props = getProps()
    getWrapper({
      context: { isEigen: true },
      props: { ...props, order: null },
    })

    expect(screen.getByTestId("error-page")).toBeInTheDocument()
  })

  describe("chat bubble", () => {
    it("shows the Salesforce chat integration button", () => {
      mockGetENV.mockImplementation(() => ({
        SALESFORCE_MESSAGE_ENABLED: true,
      }))
      const props = getProps() as any

      getWrapper({ props })
      expect(screen.getByTestId("salesforce-wrapper")).toBeInTheDocument()
    })

    it("does not show the Salesforce chat integration button on mobile", () => {
      mockGetENV.mockImplementation(() => ({
        SALESFORCE_MESSAGE_ENABLED: true,
      }))
      const props = getProps() as any
      getWrapper({ props, breakpoint: "xs" })
      expect(screen.queryByTestId("salesforce-wrapper")).not.toBeInTheDocument()
    })

    it("does not show the Salesforce chat integration button if in a modal", () => {
      mockGetENV.mockImplementation(() => ({
        SALESFORCE_MESSAGE_ENABLED: true,
      }))
      const props = getProps()
      getWrapper({
        props: { ...props, match: { location: { query: { isModal: true } } } },
      })

      expect(screen.queryByTestId("salesforce-wrapper")).not.toBeInTheDocument()
    })
  })
})
