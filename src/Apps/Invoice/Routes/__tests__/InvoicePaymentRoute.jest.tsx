import { InvoicePaymentRoute } from "Apps/Invoice/Routes/InvoicePaymentRoute"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { screen } from "@testing-library/react"
import type { InvoicePaymentRoute_Test_Query } from "__generated__/InvoicePaymentRoute_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL<InvoicePaymentRoute_Test_Query>({
  Component: props => {
    if (!props?.invoice) return null

    return (
      <MockBoot>
        <InvoicePaymentRoute invoice={props.invoice} />
      </MockBoot>
    )
  },
  query: graphql`
    query InvoicePaymentRoute_Test_Query @relay_test_operation {
      invoice(token: "cool-token") {
        ...InvoicePaymentRoute_invoice
      }
    }
  `,
})

describe("InvoicePaymentRoute", () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      match: {
        params: {
          token: "cool-token",
        },
      },
    })

    renderWithRelay({
      Invoice: () => ({
        remaining: "$100.00",
      }),
    })
  })

  it("renders invoice details correctly", () => {
    expect(screen.getByText("Make a payment: $100.00")).toBeInTheDocument()
  })
})
