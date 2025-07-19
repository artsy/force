import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "Apps/Auction/Components/AuctionWorksByFollowedArtistsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { AuctionWorksByFollowedArtistsRailTestQuery } from "__generated__/AuctionWorksByFollowedArtistsRailTestQuery.graphql"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AuctionWorksByFollowedArtistsRail", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<AuctionWorksByFollowedArtistsRailTestQuery>({
      Component: (props: any) => {
        return <AuctionWorksByFollowedArtistsRailFragmentContainer {...props} />
      },
      query: graphql`
        query AuctionWorksByFollowedArtistsRailTestQuery {
          viewer {
            ...AuctionWorksByFollowedArtistsRail_viewer
          }
        }
      `,
    })

  it("renders correct components", () => {
    expect(() => renderWithRelay()).not.toThrow()
  })

  it("renders correct title", () => {
    renderWithRelay()
    expect(screen.getByText("Works By Artists You Follow")).toBeInTheDocument()
  })
})
