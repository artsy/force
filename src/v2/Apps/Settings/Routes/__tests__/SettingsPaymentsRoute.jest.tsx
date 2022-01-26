import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SettingsPaymentsRouteFragmentContainer } from "../Payments/SettingsPaymentsRoute"
import { SettingsPaymentsRoute_Test_Query } from "v2/__generated__/SettingsPaymentsRoute_Test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  SettingsPaymentsRoute_Test_Query
>({
  Component: ({ me }) => {
    return <SettingsPaymentsRouteFragmentContainer me={me as any} />
  },
  query: graphql`
    query SettingsPaymentsRoute_Test_Query @relay_test_operation {
      me {
        ...SettingsPaymentsRoute_me
      }
    }
  `,
})

describe("SettingsPaymentsRoute", () => {
  it("renders an empty state", () => {
    renderWithRelay({
      Me: () => ({
        creditCards: {
          edges: [],
        },
      }),
    })

    expect(screen.getByText("Saved Cards")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Please add a payment card for a faster checkout experience in future."
      )
    ).toBeInTheDocument()
  })

  it("renders the credit cards", () => {
    renderWithRelay({
      CreditCard: () => ({
        name: "Example Name",
        lastDigits: "1234",
      }),
    })

    expect(screen.getByText("Saved Cards")).toBeInTheDocument()
    expect(screen.getByText("Example Name")).toBeInTheDocument()
    expect(screen.getByText("••••1234")).toBeInTheDocument()
  })
})
