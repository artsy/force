import { act, screen, waitFor } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2CheckoutRouteTestQuery } from "__generated__/Order2CheckoutRouteTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2CheckoutRoute } from "../Order2CheckoutRoute"

jest.unmock("react-relay")
jest.useFakeTimers()

const { renderWithRelay } = setupTestWrapperTL<Order2CheckoutRouteTestQuery>({
  Component: (props: any) => <Order2CheckoutRoute {...props} />,
  query: graphql`
    query Order2CheckoutRouteTestQuery @relay_test_operation {
      viewer {
        ...Order2CheckoutRoute_viewer @arguments(orderID: "order-id")
      }
    }
  `,
})

describe("Order2CheckoutRoute", () => {
  describe("loading process", () => {
    it("renders the Order2CheckoutRoute skeleton, then the real component after some time", async () => {
      await renderWithRelay({
        Viewer: () => ({
          ...baseProps,
        }),
      })

      expect(
        screen.getByLabelText("Checkout loading skeleton"),
      ).toBeInTheDocument()

      act(() => {
        jest.runAllTimers()
      })

      await waitFor(() => {
        expect(
          screen.queryByLabelText("Checkout loading skeleton"),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("with loading complete", () => {
    const renderWithLoadingComplete = async props => {
      const renderResult = await renderWithRelay({ Viewer: () => props })

      act(() => {
        jest.runAllTimers()
      })

      await waitFor(() => {
        expect(
          screen.queryByLabelText("Checkout loading skeleton"),
        ).not.toBeInTheDocument()
      })
      return renderResult
    }

    it("renders the Order2CheckoutRoute with order data", async () => {
      const props = { ...baseProps }
      props.me.order.lineItems[0].artworkVersion.title = "Supreme skateboard"
      props.me.order.lineItems[0].artworkVersion.artistNames = "Artist Name"
      props.me.order.lineItems[0].artworkVersion.date = "2023"

      await renderWithLoadingComplete(props)

      expect(screen.getAllByText("Supreme skateboard, 2023")).toHaveLength(2)
    })
  })
})

const baseProps = {
  me: {
    order: {
      internalID: "order-id",
      mode: "BUY",
      source: "ARTWORK_PAGE",
      pricingBreakdown: [
        {
          __typename: "SubtotalLine",
          displayName: "Subtotal",
          amount: { amount: "1000", currencySymbol: "$" },
        },
        {
          __typename: "ShippingLine",
          displayName: "Shipping",
          amountFallbackText: "Calculated at checkout",
          amount: null,
        },
        {
          __typename: "TaxLine",
          displayName: "Tax",
          amountFallbackText: "Calculated at checkout",
          amount: null,
        },
        {
          __typename: "TotalLine",
          displayName: "Total",
          amountFallbackText: "Waiting for final totals",
          amount: null,
        },
      ],
      lineItems: [
        {
          artwork: {
            slug: "artwork-slug",
          },
          artworkVersion: {
            internalID: "artwork-version-1",
            title: "Artwork Title",
            artistNames: "Artist Name",
            date: "2023",
            image: {
              resized: {
                width: 185,
                height: 138,
                url: "https://example.com/image.jpg",
              },
            },
          },
        },
      ],
    },
    addressConnection: {
      edges: [],
    },
  },
}
