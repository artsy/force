import { screen } from "@testing-library/react"
import { SettingsOrdersRowFragmentContainer } from "Apps/Settings/Routes/Orders/Components/SettingsOrdersRow"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <SettingsOrdersRowFragmentContainer order={props.me?.order} />
  ),
  query: graphql`
    query SettingsOrdersRow_Test_Query @relay_test_operation {
      me {
        order(id: "test-id") {
          ...SettingsOrdersRow_order
        }
      }
    }
  `,
})

describe("SettingsOrdersRow", () => {
  it("renders correctly with basic order data", () => {
    renderWithRelay({
      Order: () => ({
        displayTexts: {
          stateName: "Confirmed",
          actionPrompt: null,
        },
      }),
    })

    expect(screen.getByText(/Need Help?/)).toBeInTheDocument()
    expect(screen.getByText("Contact Us.")).toBeInTheDocument()
  })

  describe("private sale orders", () => {
    it("renders correct help email address for private sale orders", () => {
      renderWithRelay({
        Order: () => ({
          source: "PRIVATE_SALE",
          displayTexts: {
            stateName: "Confirmed",
            actionPrompt: null,
          },
        }),
      })

      expect(screen.getByText("privatesales@artsy.net")).toBeInTheDocument()
    })
  })

  describe("order payment failed", () => {
    it("renders payment failed status from displayTexts", () => {
      renderWithRelay({
        Order: () => ({
          buyerState: "PAYMENT_FAILED",
          displayTexts: {
            stateName: "Payment failed",
            actionPrompt: "Update Payment Method",
          },
        }),
      })

      expect(screen.getByText("Payment failed")).toBeInTheDocument()
    })

    it("renders the order number with a link to enter new payment", () => {
      renderWithRelay({
        Order: () => ({
          code: "123",
          internalID: "123",
          buyerState: "PAYMENT_FAILED",
          displayTexts: {
            stateName: "Payment failed",
            actionPrompt: "Update Payment Method",
          },
        }),
      })

      const link = screen.getByRole("link", { name: /123/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/orders/123/payment/new")
    })

    it("renders a button to update payment method", () => {
      renderWithRelay({
        Order: () => ({
          code: "123",
          internalID: "123",
          buyerState: "PAYMENT_FAILED",
          displayTexts: {
            stateName: "Payment failed",
            actionPrompt: "Update Payment Method",
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
    it("renders offer received status from displayTexts", () => {
      renderWithRelay({
        Order: () => ({
          buyerState: "OFFER_RECEIVED",
          displayTexts: {
            stateName: "Counteroffer received",
            actionPrompt: "Respond to Counteroffer",
          },
        }),
      })

      expect(screen.getByText("Counteroffer received")).toBeInTheDocument()
    })

    it("renders the order number with a link to respond", () => {
      renderWithRelay({
        Order: () => ({
          code: "123",
          internalID: "123",
          buyerState: "OFFER_RECEIVED",
          displayTexts: {
            stateName: "Counteroffer received",
            actionPrompt: "Respond to Counteroffer",
          },
        }),
      })

      const link = screen.getByRole("link", { name: /123/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/orders/123/respond")
    })

    it("renders a button to respond to the offer", () => {
      renderWithRelay({
        Order: () => ({
          code: "123",
          internalID: "123",
          buyerState: "OFFER_RECEIVED",
          displayTexts: {
            stateName: "Counteroffer received",
            actionPrompt: "Respond to Counteroffer",
          },
        }),
      })

      const button = screen.getByRole("link", {
        name: /Respond to Counteroffer/i,
      })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("href", "/orders/123/respond")
    })
  })

  describe("Payment Methods", () => {
    it("renders basic order information", () => {
      renderWithRelay({
        Order: () => ({
          displayTexts: {
            stateName: "Confirmed",
            actionPrompt: null,
          },
        }),
      })

      expect(screen.getByText("Order No.")).toBeInTheDocument()
      expect(screen.getByText("Total")).toBeInTheDocument()
      expect(screen.getByText("Payment Method")).toBeInTheDocument()
      expect(screen.getByText("Delivery method")).toBeInTheDocument()
    })

    // Note: Payment method detail testing is complex due to relay mock limitations
    // Payment methods are tested manually and through integration tests
  })

  describe("Fulfillment Options", () => {
    it("renders Delivery when selectedFulfillmentOption type is ARTSY_STANDARD", () => {
      renderWithRelay({
        Order: () => ({
          selectedFulfillmentOption: {
            type: "ARTSY_STANDARD",
          },
          pricingBreakdownLines: [
            {
              __typename: "ShippingLine",
              displayName: "Delivery",
            },
          ],
          displayTexts: {
            stateName: "Confirmed",
            actionPrompt: null,
          },
        }),
      })

      expect(screen.getByText("Delivery")).toBeInTheDocument()
    })

    it("renders Pickup when selectedFulfillmentOption type is PICKUP", () => {
      renderWithRelay({
        Order: () => ({
          selectedFulfillmentOption: {
            type: "PICKUP",
          },
          displayTexts: {
            stateName: "Confirmed",
            actionPrompt: null,
          },
        }),
      })

      expect(screen.getByText("Pickup")).toBeInTheDocument()
    })

    it("renders Delivery as default when selectedFulfillmentOption is null", () => {
      renderWithRelay({
        Order: () => ({
          selectedFulfillmentOption: null,
          pricingBreakdownLines: [],
          displayTexts: {
            stateName: "Confirmed",
            actionPrompt: null,
          },
        }),
      })

      expect(screen.getByText("Delivery")).toBeInTheDocument()
    })

    it("renders shipping line displayName when available", () => {
      renderWithRelay({
        Order: () => ({
          selectedFulfillmentOption: {
            type: "ARTSY_STANDARD",
          },
          pricingBreakdownLines: [
            {
              __typename: "ShippingLine",
              displayName: "Standard Shipping",
            },
          ],
          displayTexts: {
            stateName: "Confirmed",
            actionPrompt: null,
          },
        }),
      })

      expect(screen.getByText("Standard Shipping")).toBeInTheDocument()
    })
  })
})
