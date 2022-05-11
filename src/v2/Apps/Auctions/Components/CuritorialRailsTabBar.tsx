import { Join, Spacer, Tab, Tabs } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { CuritorialRailsTabBar_viewer } from "v2/__generated__/CuritorialRailsTabBar_viewer.graphql"
import { AuctionsZeroState } from "./AuctionsZeroState"
import { MyBidsFragmentContainer } from "./MyBids/MyBids"
import { StandoutLotsRailFragmentContainer } from "./StandoutLotsRail"
import { TrendingLotsRailFragmentContainer } from "./TrendingLotsRail"
import { WorksByArtistsYouFollowRailFragmentContainer } from "./WorksByArtistsYouFollowRail"

interface CuritorialRailsTabBarProps {
  viewer: CuritorialRailsTabBar_viewer
}

export const CuritorialRailsTabBar: React.FC<CuritorialRailsTabBarProps> = ({
  viewer,
}) => {
  // const { user } = useSystemContext()
  const isFollowingArtists = !!viewer.me?.followsAndSaves?.artistsConnection
    ?.totalCount!

  return (
    <Tabs mb={4}>
      {isFollowingArtists && (
        <Tab name="Works For You">
          <Join separator={<Spacer mt={2} />}>
            <MyBidsFragmentContainer me={viewer.me!} />
            <WorksByArtistsYouFollowRailFragmentContainer viewer={viewer} />
          </Join>
        </Tab>
      )}
      <Tab name="Current Highlights">
        <StandoutLotsRailFragmentContainer viewer={viewer} />
      </Tab>
      <Tab name="Trending Lots">
        <TrendingLotsRailFragmentContainer viewer={viewer} />
      </Tab>
    </Tabs>
  )
}

export const CuritorialRailsTabBarFragmentContainer = createFragmentContainer(
  CuritorialRailsTabBar,
  {
    viewer: graphql`
      fragment CuritorialRailsTabBar_viewer on Viewer {
        ...WorksByArtistsYouFollowRail_viewer
        ...TrendingLotsRail_viewer
        ...StandoutLotsRail_viewer

        me {
          ...MyBids_me
          followsAndSaves {
            artistsConnection {
              totalCount
            }
          }
        }
      }
    `,
  }
)

export const CuratorialRailsZeroState: React.FC = () => {
  return <AuctionsZeroState>No Works To Show</AuctionsZeroState>
}
