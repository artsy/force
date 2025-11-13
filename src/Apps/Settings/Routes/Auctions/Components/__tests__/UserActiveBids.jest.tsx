import { UserActiveBidsFragmentContainer } from "Apps/Settings/Routes/Auctions/Components/UserActiveBids"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { UserActiveBids_Test_Query } from "__generated__/UserActiveBids_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("UserActiveBids", () => {
  const { renderWithRelay } = setupTestWrapperTL<UserActiveBids_Test_Query>({
    Component: UserActiveBidsFragmentContainer,
    query: graphql`
      query UserActiveBids_Test_Query @relay_test_operation {
        me {
          ...UserActiveBids_me
        }
      }
    `,
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Monk By The Sea",
      }),
    })

    expect(screen.getByText("Monk By The Sea")).toBeInTheDocument()
  })

  it("renders empty state message and button when no active bids", () => {
    renderWithRelay({
      Me: () => ({
        activeLotStandings: [],
      }),
    })

    expect(screen.getByText("Active Bids")).toBeInTheDocument()
    expect(screen.getByText("You have no active bids.")).toBeInTheDocument()

    const exploreButton = screen.getByRole("link", { name: "Explore Auctions" })
    expect(exploreButton).toBeInTheDocument()
    expect(exploreButton).toHaveAttribute("href", "/auctions")
  })

  it("when user is the highest bidder, renders -Highest bid- text", () => {
    renderWithRelay({
      LotStanding: () => ({
        isLeadingBidder: true,
      }),
    })

    expect(screen.getByText("Highest Bid")).toBeInTheDocument()
  })
})
