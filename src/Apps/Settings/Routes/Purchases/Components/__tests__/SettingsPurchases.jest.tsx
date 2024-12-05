import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SettingsPurchasesFragmentContainer } from "Apps/Settings/Routes/Purchases/Components/SettingsPurchases"

jest.unmock("react-relay")
jest.mock("Components/Pagination/CommercePagination", () => ({
  CommercePaginationFragmentContainer: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsPurchasesFragmentContainer,
  query: graphql`
    query SettingsPurchases_Test_Query @relay_test_operation {
      me {
        ...SettingsPurchases_me
      }
    }
  `,
})

describe("SettingsPurchases", () => {
  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByText("Track Order")).toBeInTheDocument()
    expect(screen.getByText("Need Help?")).toBeInTheDocument()
  })

  it("renders correct help email address for non-PS orders", () => {
    renderWithRelay()

    expect(screen.getByText("Contact Us.")).toBeInTheDocument()
  })

  describe("with private sale orders", () => {
    it("renders correct help email address for PS orders", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  source: "private_sale",
                },
              },
            ],
          },
        }),
      })

      expect(screen.getByText("privatesales@artsy.net")).toBeInTheDocument()
    })
  })

  describe("order payment failed", () => {
    it("renders payment failed status", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  state: "SUBMITTED",
                  displayState: "PAYMENT_FAILED",
                },
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Payment failed")).toBeInTheDocument()
    })

    it("renders the order number with a link to enter new payment", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  internalID: "123",
                  state: "SUBMITTED",
                  displayState: "PAYMENT_FAILED",
                },
              },
            ],
          },
        }),
      })

      const link = screen.getByRole("link", { name: /123/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/orders/123/payment/new")
    })

    it("renders a button to update payment method", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  internalID: "123",
                  state: "SUBMITTED",
                  displayState: "PAYMENT_FAILED",
                },
              },
            ],
          },
        }),
      })

      const button = screen.getByRole("link", {
        name: /Update Payment Method/i,
      })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("href", "/orders/123/payment/new")
    })
  })

  describe("order with offer awaiting for collector reply", () => {
    it("renders Counteroffer received status", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  state: "SUBMITTED",
                  displayState: "SUBMITTED",
                  buyerAction: "OFFER_RECEIVED",
                },
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Counteroffer received")).toBeInTheDocument()
    })

    it("renders the order number with a link to respond to the offer", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  internalID: "123",
                  state: "SUBMITTED",
                  displayState: "SUBMITTED",
                  buyerAction: "OFFER_RECEIVED",
                },
              },
            ],
          },
        }),
      })

      const link = screen.getByRole("link", { name: /123/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/orders/123/status")
    })

    it("renders a button to respond to the offer", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  internalID: "123",
                  state: "SUBMITTED",
                  displayState: "SUBMITTED",
                  buyerAction: "OFFER_RECEIVED",
                },
              },
            ],
          },
        }),
      })

      const button = screen.getByRole("link", {
        name: /Respond to Counteroffer/i,
      })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("href", "/orders/123/status")
    })
  })
})
