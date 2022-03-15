import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "../AuctionWorksByFollowedArtistsRail"
import { AuctionWorksByFollowedArtistsRailTestQuery } from "v2/__generated__/AuctionWorksByFollowedArtistsRailTestQuery.graphql"

jest.unmock("react-relay")

describe("AuctionWorksByFollowedArtistsRail", () => {
  const { getWrapper } = setupTestWrapper<
    AuctionWorksByFollowedArtistsRailTestQuery
  >({
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
    const wrapper = getWrapper()
    expect(wrapper.find("Rail")).toHaveLength(1)
  })

  it("renders correct title", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Works By Artists You Follow")
  })
})
