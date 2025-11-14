import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "Apps/Auction/Components/AuctionWorksByFollowedArtistsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { AuctionWorksByFollowedArtistsRailQuery } from "__generated__/AuctionWorksByFollowedArtistsRailQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("AuctionWorksByFollowedArtistsRail", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<AuctionWorksByFollowedArtistsRailQuery>({
      Component: (props: any) => {
        return <AuctionWorksByFollowedArtistsRailFragmentContainer {...props} />
      },
      query: graphql`
        query AuctionWorksByFollowedArtistsRailQuery {
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
