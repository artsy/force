import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { Elements } from "@stripe/react-stripe-js"
import type { ExpressCheckout_Test_Query } from "__generated__/ExpressCheckout_Test_Query.graphql"
import { graphql } from "react-relay"
import { ExpressCheckout } from ".."

jest.mock("react-tracking")

jest.unmock("react-relay")

const mockElements = Elements as jest.Mock

const { renderWithRelay } = setupTestWrapperTL<ExpressCheckout_Test_Query>({
  Component: ({ me }) => me?.order && <ExpressCheckout order={me.order!} />,
  query: graphql`
    query ExpressCheckout_Test_Query @raw_response_type {
      me {
        order(id: "123") {
          ...ExpressCheckout_order
        }
      }
    }
  `,
})

jest.mock("@stripe/react-stripe-js", () => {
  return {
    Elements: jest.fn(() => {
      return <button type="button" />
    }),
  }
})

describe("ExpressCheckout", () => {
  it("passes correct props to Stripe Elements", async () => {
    renderWithRelay({
      Order: () => ({ ...orderData }),
    })

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
