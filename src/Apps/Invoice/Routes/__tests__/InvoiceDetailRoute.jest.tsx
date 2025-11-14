import { InvoiceDetailRoute } from "Apps/Invoice/Routes/InvoiceDetailRoute"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { InvoiceDetailRoute_Test_Query } from "__generated__/InvoiceDetailRoute_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("System/Components/RouterLink", () => ({
  RouterLink: ({ to, children }) => <a href={to}>{children}</a>,
}))

const { renderWithRelay } = setupTestWrapperTL<InvoiceDetailRoute_Test_Query>({
  Component: props => {
    if (!props?.invoice) return null

    return (
      <MockBoot>
        <InvoiceDetailRoute invoice={props.invoice} />
      </MockBoot>
    )
  },
  query: graphql`
    query InvoiceDetailRoute_Test_Query @relay_test_operation {
      invoice(token: "cool-token") {
        ...InvoiceDetailRoute_invoice
      }
    }
  `,
})

describe("InvoiceDetailRoute", () => {
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
        name: "John Doe",
        email: "john@example.com",
        state: "READY",
        payments: [{ successful: false }],
        externalNote: "Cool Cat Art Auction",
        remaining: "$100.00",
        lineItems: [
          {
            description: "Item 1",
            amount: "$50.00",
          },
          { description: "Item 2", amount: "$50.00" },
        ],
      }),
    })
  })

  it("renders invoice details correctly", () => {
    expect(screen.getByText("John Doe <john@example.com>")).toBeInTheDocument()
    expect(screen.getByText("Cool Cat Art Auction")).toBeInTheDocument()
    expect(screen.getByText("$100.00")).toBeInTheDocument()
  })

  it("renders a 'Make Payment' button when invoice is unpaid", () => {
    expect(screen.getByText("Make Payment")).toBeInTheDocument()
  })

  it("navigates to the payment route when 'Make Payment' button is clicked", async () => {
    const makePaymentButton = screen.getByText("Make Payment")
    expect(makePaymentButton).toBeInTheDocument()

    await userEvent.click(makePaymentButton)

    expect(screen.getByRole("link", { name: "Make Payment" })).toHaveAttribute(
      "href",
      "/invoice/cool-token/payment",
    )
  })
})
