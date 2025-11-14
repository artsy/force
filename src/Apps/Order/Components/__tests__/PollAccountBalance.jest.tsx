import { screen } from "@testing-library/react"
import { PollAccountBalanceRefetchContainer } from "Apps/Order/Components/PollAccountBalance"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { PollAccountBalanceQuery_Test_Query } from "__generated__/PollAccountBalanceQuery_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockBalanceCheckComplete = jest.fn()
mockBalanceCheckComplete.mockImplementation(arg => arg)

const { renderWithRelay } =
  setupTestWrapperTL<PollAccountBalanceQuery_Test_Query>({
    Component: ({ commerceBankAccountBalance }) => {
      return (
        <PollAccountBalanceRefetchContainer
          setupIntentId={"setupIntentId"}
          bankAccountId={"bankAccountId"}
          commerceBankAccountBalance={commerceBankAccountBalance}
          onBalanceCheckComplete={mockBalanceCheckComplete}
          buyerTotalCents={100}
          orderCurrencyCode={"USD"}
        />
      )
    },
    query: graphql`
      query PollAccountBalanceQuery_Test_Query($setupIntentId: ID!)
      @relay_test_operation {
        commerceBankAccountBalance(setupIntentId: $setupIntentId) {
          ...PollAccountBalance_commerceBankAccountBalance
        }
      }
    `,
  })

describe("Poll account balance", () => {
  it("renders placeholder", () => {
    renderWithRelay({
      CommerceBankAccountBalance: () => ({
        commerceBankAccountBalance: {
          balanceCents: 200,
          currencyCode: "USD",
        },
      }),
    })

    expect(screen.getByText("Saving payment preferences")).toBeInTheDocument()
  })
})
