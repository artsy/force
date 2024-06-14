import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CuritorialRailsTabBar_viewer$data } from "__generated__/CuritorialRailsTabBar_viewer.graphql"
import { AuctionsZeroState } from "./AuctionsZeroState"
import { StandoutLotsRailFragmentContainer } from "./StandoutLotsRail"
import { TrendingLotsRailFragmentContainer } from "./TrendingLotsRail"
import { HomeAuctionLotsForYouRailQueryRenderer } from "Apps/Home/Components/HomeAuctionLotsForYouRail"
import { useSystemContext } from "System/Hooks/useSystemContext"

interface CuritorialRailsTabBarProps {
  viewer: CuritorialRailsTabBar_viewer$data
}

export const CuritorialRailsTabBar: React.FC<CuritorialRailsTabBarProps> = ({
  viewer,
}) => {
  const { user } = useSystemContext()

  return (
    <Tabs mb={4}>
      {!user ? null : (
        <Tab name="Lots for You">
          <Text variant="lg-display">Lots for You</Text>
          <Text variant="lg-display" color="black60">
            Works recommended for you
          </Text>
          <Spacer y={4} />
          <HomeAuctionLotsForYouRailQueryRenderer />
        </Tab>
      )}
      <Tab name="Curators’ Picks">
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
        ...TrendingLotsRail_viewer
        ...StandoutLotsRail_viewer
      }
    `,
  }
)

export const CuratorialRailsZeroState: React.FC = () => {
  return <AuctionsZeroState>No Works To Show</AuctionsZeroState>
}
