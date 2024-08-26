import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { UserBidHistoryFragmentContainer } from "Apps/Settings/Routes/Auctions/Components/UserBidHistory"
import { UserBidHistory_Test_Query } from "__generated__/UserBidHistory_Test_Query.graphql"

jest.unmock("react-relay")

describe("UserBidHistory", () => {
  const { renderWithRelay } = setupTestWrapperTL<UserBidHistory_Test_Query>({
    Component: UserBidHistoryFragmentContainer,
    query: graphql`
      query UserBidHistory_Test_Query @relay_test_operation {
        me {
          ...UserBidHistory_me
        }
      }
    `,
  })

  it("renders correctly", () => {
    renderWithRelay({
      SaleArtwork: () => ({
        lotLabel: "1",
      }),
      Artwork: () => ({
        sale_message: "Example Sale",
      }),
    })

    expect(screen.getByText("Lot 1")).toBeInTheDocument()
    expect(screen.getByText("Example Sale")).toBeInTheDocument()
    expect(screen.getByText("Bid")).toBeInTheDocument()
  })

  it("renders -Nothing to Show- message when no sale found", () => {
    renderWithRelay({
      Me: () => ({
        inactiveLotStandings: [],
      }),
    })

    expect(screen.getByText("Bid History")).toBeInTheDocument()
    expect(screen.getByText("Nothing to Show")).toBeInTheDocument()
  })
})
