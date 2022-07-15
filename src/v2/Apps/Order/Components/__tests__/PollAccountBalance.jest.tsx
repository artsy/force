import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { PollAccountBalanceRefetchContainer } from "../PollAccountBalance"
import { PollAccountBalanceQuery_Test_Query } from "v2/__generated__/PollAccountBalanceQuery_Test_Query.graphql"

jest.unmock("react-relay")

const mockBalanceCheckComplete = jest.fn()
mockBalanceCheckComplete.mockImplementation(arg => arg)

const { renderWithRelay } = setupTestWrapperTL<
  PollAccountBalanceQuery_Test_Query
>({
  Component: ({ commerceBankAccountBalance }) => {
    return (
      <PollAccountBalanceRefetchContainer
        setupIntentId={"setupIntentId"}
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

    expect(
      screen.getByTestId("account-balance-placeholder")
    ).toBeInTheDocument()
  })
})
