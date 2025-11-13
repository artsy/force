import { UserBidHistoryFragmentContainer } from "Apps/Settings/Routes/Auctions/Components/UserBidHistory"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { UserBidHistory_Test_Query } from "__generated__/UserBidHistory_Test_Query.graphql"
import { graphql } from "react-relay"

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
        collectorSignals: {
          partnerOffer: null,
        },
      }),
    })

    expect(screen.getByText("Lot 1")).toBeInTheDocument()
    expect(screen.getByText("Example Sale")).toBeInTheDocument()
    expect(screen.getByText("Bid")).toBeInTheDocument()
  })

  it("renders empty state message when no bid history", () => {
    renderWithRelay({
      Me: () => ({
        inactiveLotStandings: [],
      }),
    })

    expect(screen.getByText("Bid History")).toBeInTheDocument()
    expect(screen.getByText("You have no bidding history.")).toBeInTheDocument()
  })
})
