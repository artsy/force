import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { OrderDetailsPricingBreakdownTestQuery } from "__generated__/OrderDetailsPricingBreakdownTestQuery.graphql"
import { graphql } from "react-relay"
import { OrderDetailsPricingBreakdown } from "../OrderDetailsPricingBreakdown"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<OrderDetailsPricingBreakdownTestQuery>({
    Component: props => {
      const order = props.me!.order!
      return <OrderDetailsPricingBreakdown order={order} />
    },
    query: graphql`
      query OrderDetailsPricingBreakdownTestQuery @relay_test_operation {
        me {
          order(id: "test-order") {
            ...OrderDetailsPricingBreakdown_order
          }
        }
      }
    `,
  })

describe("OrderDetailsPricingBreakdown", () => {
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
})
