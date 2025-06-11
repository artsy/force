import { screen } from "@testing-library/react"
import { Order2DetailsPaymentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsPaymentInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "relay-runtime"

import type { Order2DetailsPaymentInfo_TestQuery } from "__generated__/Order2DetailsPaymentInfo_TestQuery.graphql"

jest.unmock("react-relay")

describe("Order2DetailsPaymentInfo", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<Order2DetailsPaymentInfo_TestQuery>({
      Component: ({ me }) => <Order2DetailsPaymentInfo order={me!.order!} />,
      query: graphql`
        query Order2DetailsPaymentInfo_TestQuery @relay_test_operation {
          me {
            order(id: "order-id") {
              ...Order2DetailsPaymentInfo_order
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
