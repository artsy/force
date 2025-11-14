import { Elements } from "@stripe/react-stripe-js"
import { Order2ExpressCheckout } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckout"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2ExpressCheckout_Test_Query } from "__generated__/Order2ExpressCheckout_Test_Query.graphql"
import { graphql } from "react-relay"

jest.mock("react-tracking")

jest.unmock("react-relay")

const mockElements = Elements as jest.Mock

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => {
  return {
    useCheckoutContext: () => ({
      expressCheckoutPaymentMethods: null,
      setExpressCheckoutLoaded: jest.fn(),
      steps: [],
    }),
  }
})

const { renderWithRelay } =
  setupTestWrapperTL<Order2ExpressCheckout_Test_Query>({
    Component: ({ me }) => <Order2ExpressCheckout order={me!.order!} />,
    query: graphql`
      query Order2ExpressCheckout_Test_Query @raw_response_type {
        me {
          order(id: "123") {
            ...Order2ExpressCheckout_order
          }
        }
      }
    `,
  })

jest.mock("@stripe/react-stripe-js", () => {
  return {
    useStripe: jest.fn(),
    Elements: jest.fn(() => {
      return <button type="button" />
    }),
  }
})

describe("Order2ExpressCheckout", () => {
  it("passes correct props to Stripe Elements", async () => {
    renderWithRelay({ Order: () => ({ ...orderData }) })

    const elementsProps = mockElements.mock.calls[0][0]

    expect(elementsProps.options).toEqual({
      amount: 100000,
      appearance: {
        variables: {
          borderRadius: "50px",
        },
      },
      captureMethod: "manual",
      currency: "usd",
      mode: "payment",
      onBehalfOf: "acct_456",
      setupFutureUsage: "off_session",
    })
  })
})

const orderData = {
  internalID: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
  buyerTotal: {
    minor: 104300,
    currencyCode: "USD",
  },
  itemsTotal: {
    minor: 100000,
    currencyCode: "USD",
  },
  shippingTotal: {
    minor: 4200,
    currencyCode: "USD",
  },
  taxTotal: {
    minor: 100,
    currencyCode: "USD",
  },
  source: "ARTWORK_PAGE",
  mode: "BUY",
  availableShippingCountries: ["US"],
  fulfillmentOptions: [
    {
      type: "DOMESTIC_FLAT",
      amount: {
        minor: 4200,
        currencyCode: "USD",
      },
      selected: null,
    },
  ],
  lineItems: [
    {
      artwork: {
        internalID: "artwork123",
        slug: "artwork-slug",
      },
    },
  ],
  seller: {
    __typeName: "Partner",
    merchantAccount: {
      externalId: "acct_456",
    },
  },
}
