import { screen } from "@testing-library/react"
import { SettingsAuctionsRouteFragmentContainer } from "Apps/Settings/Routes/Auctions/SettingsAuctionsRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { SettingsAuctionsRouteQuery_Test_Query } from "__generated__/SettingsAuctionsRouteQuery_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("SettingsAuctionsRoute", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<SettingsAuctionsRouteQuery_Test_Query>({
      Component: SettingsAuctionsRouteFragmentContainer,
      query: graphql`
        query SettingsAuctionsRouteQuery_Test_Query @relay_test_operation {
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
    expect(screen.getByText("Registration")).toBeInTheDocument()
  })
})
