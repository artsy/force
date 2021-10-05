import { Box, Join, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { CuritorialRailsTabBar_viewer } from "v2/__generated__/CuritorialRailsTabBar_viewer.graphql"
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
  const { user } = useSystemContext()

  return (
    <Tabs mb={4}>
      {user && (
        <Tab name="Works For You">
          <Join separator={<Spacer mt={2} />}>
            {viewer.me && <MyBidsFragmentContainer me={viewer.me} />}
            <WorksByArtistsYouFollowRailFragmentContainer viewer={viewer} />
          </Join>
        </Tab>
      )}
      <Tab name="Trending Lots">
        <TrendingLotsRailFragmentContainer viewer={viewer} />
      </Tab>
      <Tab name="Standout Lots">
        <StandoutLotsRailFragmentContainer viewer={viewer} />
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
        }
      }
    `,
  }
)

export const CuratorialRailsZeroState: React.FC = () => {
  return (
    <Box>
      <Text
        as="h3"
        color="black60"
        mb={12}
        mt={6}
        textAlign="center"
        variant="mediumText"
      >
        No Works To Show
      </Text>
    </Box>
  )
}
