import { screen } from "@testing-library/react"
import { SettingsPurchasesFragmentContainer } from "Apps/Settings/Routes/Purchases/Components/SettingsPurchases"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

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

  it("renders correct help email address for non private sale orders", () => {
    renderWithRelay()

    expect(screen.getByText("Contact Us.")).toBeInTheDocument()
  })

  describe("with private sale orders", () => {
    it("renders correct help email address for private sale orders", () => {
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
    it("renders Counteroffer received status for regular offer received", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
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

    it("renders Counteroffer received status for offer received on originally incomplete offer", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  displayState: "SUBMITTED",
                  buyerAction: "OFFER_RECEIVED_CONFIRM_NEEDED",
                },
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Counteroffer received")).toBeInTheDocument()
    })

    it("renders Counteroffer received status when partner confirms originally incomplete offer", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  displayState: "SUBMITTED",
                  buyerAction: "OFFER_ACCEPTED_CONFIRM_NEEDED",
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
      expect(link).toHaveAttribute("href", "/orders/123/details")
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
      expect(button).toHaveAttribute("href", "/orders/123/details")
    })
  })

  describe("Payment Methods", () => {
    it("renders credit card payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          paymentMethodDetails: { __typename: "CreditCard" },
        }),
        CreditCard: () => ({ lastDigits: "1234" }),
      })

      expect(screen.getByText("Credit card •••• 1234")).toBeInTheDocument()
    })

    it("renders wire transfer payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          paymentMethodDetails: { __typename: "WireTransfer" },
        }),
      })

      expect(screen.getByText("Wire transfer")).toBeInTheDocument()
    })

    it("renders bank transfer payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          paymentMethodDetails: { __typename: "BankAccount" },
        }),
        BankAccount: () => ({ last4: "1234" }),
      })

      expect(screen.getByText("Bank transfer •••• 1234")).toBeInTheDocument()
    })

    it("renders Apple Pay payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          paymentMethodDetails: { __typename: "CreditCard" },
          creditCardWalletType: "apple_pay",
        }),
        CreditCard: () => ({ lastDigits: "1234" }),
      })

      expect(screen.getByText("Apple Pay")).toBeInTheDocument()
    })

    it("renders Google Pay payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          paymentMethodDetails: { __typename: "CreditCard" },
          creditCardWalletType: "google_pay",
        }),
        CreditCard: () => ({ lastDigits: "1234" }),
      })

      expect(screen.getByText("Google Pay")).toBeInTheDocument()
    })

    it("skips credit card wallet type if not recognized", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          paymentMethodDetails: { __typename: "CreditCard" },
          creditCardWalletType: "new_payment",
        }),
        CreditCard: () => ({ lastDigits: "1234" }),
      })

      expect(screen.getByText("Credit card •••• 1234")).toBeInTheDocument()
    })
  })
})
