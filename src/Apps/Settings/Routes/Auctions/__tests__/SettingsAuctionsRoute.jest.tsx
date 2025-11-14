import { screen } from "@testing-library/react"
import { SettingsAuctionsRouteFragmentContainer } from "Apps/Settings/Routes/Auctions/SettingsAuctionsRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { SettingsAuctionsRouteQueryTestQuery } from "__generated__/SettingsAuctionsRouteQueryTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("SettingsAuctionsRoute", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<SettingsAuctionsRouteQueryTestQuery>({
      Component: SettingsAuctionsRouteFragmentContainer,
      query: graphql`
        query SettingsAuctionsRouteQueryTestQuery @relay_test_operation {
          me {
            ...SettingsAuctionsRoute_me
          }
        }
      `,
    })

  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Me: () => {},
    })

    expect(container.firstChild).not.toBeNull()
  })

  it("renders 3 correct children", () => {
    renderWithRelay({
      Me: () => {},
    })

    expect(screen.getByText("Active Bids")).toBeInTheDocument()
    expect(screen.getByText("Bid History")).toBeInTheDocument()
    expect(
      screen.getByText("Registration for Upcoming Auctions"),
    ).toBeInTheDocument()
  })
})
