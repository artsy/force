import { screen } from "@testing-library/react"
import type { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { DeepPartial } from "Utils/typeSupport"
import type { Order2CheckoutPricingBreakdownTestQuery } from "__generated__/Order2CheckoutPricingBreakdownTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2CheckoutPricingBreakdown } from "../Order2CheckoutPricingBreakdown"

jest.unmock("react-relay")

let mockCheckoutContext: DeepPartial<ReturnType<typeof useCheckoutContext>>
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => {
    const checkoutTracking = useCheckoutTracking({
      source: "artwork page",
      mode: "BUY",
    })
    return {
      checkoutTracking,
      ...mockCheckoutContext,
    }
  },
}))

beforeEach(() => {
  mockCheckoutContext = {}
})

const { renderWithRelay } =
  setupTestWrapperTL<Order2CheckoutPricingBreakdownTestQuery>({
    Component: props => {
      const order = props.me!.order!
      return <Order2CheckoutPricingBreakdown order={order} />
    },
    query: graphql`
      query Order2CheckoutPricingBreakdownTestQuery @relay_test_operation {
        me {
          order(id: "test-order") {
            ...Order2CheckoutPricingBreakdown_order
          }
        }
      }
    `,
  })

describe("Order2PricingBreakdown", () => {
  it("renders pricing breakdown lines with fallback text if amount is null", () => {
    renderWithRelay({
      Me: () => ({
        order: {
          pricingBreakdownLines: [
            {
              __typename: "SubtotalLine",
              displayName: "Subtotal",
              amount: { amount: 1000, currencySymbol: "$" },
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
        },
      }),
    })

    // Subtotal
    const subtotalRow = screen.getByText("Subtotal").parentElement
    expect(subtotalRow).toHaveTextContent("$1000")

    // Shipping
    const shippingRow = screen.getByText("Shipping").parentElement
    expect(shippingRow).toHaveTextContent("Calculated at checkout")

    // Tax
    const taxRow = screen.getByText("Tax*").parentElement
    expect(taxRow).toHaveTextContent("Calculated at checkout")

    // Total
    const totalRow = screen.getByText("Total").parentElement
    expect(totalRow).toHaveTextContent("Waiting for final totals")
  })

  it("renders pricing breakdown lines with prices", () => {
    renderWithRelay({
      Me: () => ({
        order: {
          pricingBreakdownLines: [
            {
              __typename: "SubtotalLine",
              displayName: "Subtotal",
              amount: {
                amount: "1000",
                currencySymbol: "$",
              },
            },
            {
              __typename: "ShippingLine",
              displayName: "Shipping",
              amount: {
                amount: "42.99",
                currencySymbol: "$",
              },
            },
            {
              __typename: "TaxLine",
              displayName: "Tax",
              amountFallbackText: null,
              amount: { amount: "99.58", currencySymbol: "$" },
            },
            {
              __typename: "TotalLine",
              displayName: "Total",
              amount: {
                display: "$US 1052.57",
              },
            },
          ],
        },
      }),
    })

    // Subtotal
    const subtotalRow = screen.getByText("Subtotal").parentElement
    expect(subtotalRow).toHaveTextContent("$1000")

    // Shipping
    const shippingRow = screen.getByText("Shipping").parentElement
    expect(shippingRow).toHaveTextContent("$42.99")

    // Tax
    const taxRow = screen.getByText("Tax*").parentElement
    expect(taxRow).toHaveTextContent("$99.58")

    // Total
    const totalRow = screen.getByText("Total").parentElement
    expect(totalRow).toHaveTextContent("$US 1052.57")
  })

  it("renders the partner offer timer if present", () => {
    mockCheckoutContext.partnerOffer = {
      timer: {
        remainingTime: "2d 3h",
        isExpired: false,
      },
    }

    renderWithRelay({
      Me: () => ({
        order: {
          source: "PARTNER_OFFER",
          pricingBreakdownLines: [
            {
              __typename: "SubtotalLine",
              displayName: "Gallery offer",
              amount: {
                amount: "1000",
                currencySymbol: "$",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Exp. 2d 3h")).toBeInTheDocument()
  })

  it("does not render a partner offer if the timer is somehow invalid", () => {
    mockCheckoutContext.partnerOffer = {
      timer: {
        remainingTime: "NaNh NaNm",
        isExpired: false,
      },
    }

    renderWithRelay({
      Me: () => ({
        order: {
          source: "PARTNER_OFFER",
          pricingBreakdownLines: [
            {
              __typename: "SubtotalLine",
              displayName: "Gallery offer",
              amount: {
                amount: "1000",
                currencySymbol: "$",
              },
            },
          ],
        },
      }),
    })

    expect(screen.queryByText("Exp.", { exact: false })).not.toBeInTheDocument()
  })
  it("does not render a partner offer if the timer is somehow expired", () => {
    mockCheckoutContext.partnerOffer = {
      timer: {
        remainingTime: "Expired",
        isExpired: true,
      },
    }

    renderWithRelay({
      Me: () => ({
        order: {
          source: "PARTNER_OFFER",
          pricingBreakdownLines: [
            {
              __typename: "SubtotalLine",
              displayName: "Gallery offer",
              amount: {
                amount: "1000",
                currencySymbol: "$",
              },
            },
          ],
        },
      }),
    })

    expect(screen.queryByText("Exp.", { exact: false })).not.toBeInTheDocument()
  })
})
