import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "Apps/Auction/Components/AuctionWorksByFollowedArtistsRail"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import type { AuctionWorksByFollowedArtistsRailTestQuery } from "__generated__/AuctionWorksByFollowedArtistsRailTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("AuctionWorksByFollowedArtistsRail", () => {
  const { getWrapper } =
    setupTestWrapper<AuctionWorksByFollowedArtistsRailTestQuery>({
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
    const { wrapper } = getWrapper()
    expect(wrapper.find("Rail")).toHaveLength(1)
  })

  it("renders correct title", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.text()).toContain("Works By Artists You Follow")
  })
})
