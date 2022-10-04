import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { UserActiveBidsFragmentContainer } from "Apps/Settings/Routes/Auctions/Components/UserActiveBids"
import { UserActiveBids_Test_Query } from "__generated__/UserActiveBids_Test_Query.graphql"
import { screen } from "@testing-library/react"

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

  it("renders -Nothing to Show- message when no sale found", () => {
    renderWithRelay({
      Me: () => ({
        activeLotStandings: [],
      }),
    })

    expect(screen.getByText("Active Bids")).toBeInTheDocument()
    expect(screen.getByText("Nothing to Show")).toBeInTheDocument()
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
