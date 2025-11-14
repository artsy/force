import { OrderDetailsPaymentInfo } from "Apps/Order/Routes/Details/Components/OrderDetailsPaymentInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { OrderDetailsPaymentInfo_TestQuery } from "__generated__/OrderDetailsPaymentInfo_TestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("OrderDetailsPaymentInfo", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<OrderDetailsPaymentInfo_TestQuery>({
      Component: ({ me }) => <OrderDetailsPaymentInfo order={me!.order!} />,
      query: graphql`
        query OrderDetailsPaymentInfo_TestQuery @relay_test_operation {
          me {
            order(id: "order-id") {
              ...OrderDetailsPaymentInfo_order
            }
          }
        }
      `,
    })

  it("renders Apple Pay payment details", () => {
    renderWithRelay({ Order: () => ({ creditCardWalletType: "APPLE_PAY" }) })

    expect(screen.getByText("Apple Pay")).toBeInTheDocument()
  })

  it("renders Google Pay payment details", () => {
    renderWithRelay({ Order: () => ({ creditCardWalletType: "GOOGLE_PAY" }) })

    expect(screen.getByText("Google Pay")).toBeInTheDocument()
  })

  it("renders credit card order payment details", () => {
    renderWithRelay({
      Order: () => ({
        creditCardWalletType: null,
        paymentMethodDetails: {
          __typename: "CreditCard",
          lastDigits: "1234",
          brand: "Visa",
          expirationYear: "2029",
          expirationMonth: "2",
        },
      }),
    })

    expect(screen.getByText(/1234/)).toBeInTheDocument()
    expect(screen.getByText(/Exp 02\/29/)).toBeInTheDocument()
  })

  it("renders bank transfer order payment details", () => {
    renderWithRelay({
      Order: () => ({
        creditCardWalletType: null,
        paymentMethodDetails: { __typename: "BankAccount", last4: 2468 },
      }),
    })

    expect(screen.getByText("Bank transfer •••• 2468")).toBeInTheDocument()
  })

  it("renders wire transfer order payment details", () => {
    renderWithRelay({
      Order: () => ({
        creditCardWalletType: null,
        paymentMethodDetails: { __typename: "WireTransfer" },
      }),
    })

    expect(screen.getByText("Wire transfer")).toBeInTheDocument()
  })

  it("does not render anything when there is no data", () => {
    renderWithRelay({
      Order: () => ({
        creditCardWalletType: null,
        paymentMethodDetails: null,
      }),
    })

    expect(screen.queryByText(/Pay/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Exp/)).not.toBeInTheDocument()
    expect(screen.queryByText("Bank transfer")).not.toBeInTheDocument()
    expect(screen.queryByText("Wire transfer")).not.toBeInTheDocument()
  })
})
