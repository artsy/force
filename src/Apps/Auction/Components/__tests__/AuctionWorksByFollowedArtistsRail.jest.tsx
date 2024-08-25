import { graphql } from "react-relay"
import { DateTime } from "luxon"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "Apps/Auction/Components/AuctionWorksByFollowedArtistsRail"
import { AuctionWorksByFollowedArtistsRailTestQuery } from "__generated__/AuctionWorksByFollowedArtistsRailTestQuery.graphql"

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
    const { wrapper } = getWrapper()
    expect(wrapper.find("Rail")).toHaveLength(1)
  })

  it("renders correct title", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.text()).toContain("Works By Artists You Follow")
  })

  it("renders the countdown timer label", () => {
    const baseDate = DateTime.local()
    const startDate = baseDate.minus({ hours: 1 })
    const endDate = baseDate.plus({ hours: 1 })

    const { wrapper } = getWrapper({
      Viewer: () => ({
        saleArtworksConnection: {
          edges: [
            {
              node: {
                sale: {
                  cascadingEndTimeIntervalMinutes: 1,
                  extendedBiddingIntervalMinutes: 2,
                  startAt: startDate.toString(),
                  endAt: endDate.toString(),
                  is_auction: true,
                  is_closed: false,
                },
                sale_artwork: {
                  lotLabel: "123",
                  endAt: endDate.toString(),
                  extendedBiddingEndAt: null,
                },
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Closes in 59m 59s")
  })
})
