import { HomeAuctionLotsForYouRailQueryRenderer } from "Apps/Home/Components/HomeAuctionLotsForYouRail"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import type * as React from "react"
import { AuctionsZeroState } from "./AuctionsZeroState"
import { StandoutLotsRailQueryRenderer } from "./StandoutLotsRail"
import { TrendingLotsRailQueryRenderer } from "./TrendingLotsRail"

export const CuritorialRailsTabBar: React.FC<
  React.PropsWithChildren<unknown>
> = ({}) => {
  const { user } = useSystemContext()

  return (
    <Tabs mb={4}>
      {!user ? null : (
        <Tab name="Lots for You">
          <Text variant="lg-display">Lots for You</Text>
          <Text variant="lg-display" color="mono60">
            Works recommended for you
          </Text>
          <Spacer y={4} />
          <HomeAuctionLotsForYouRailQueryRenderer />
        </Tab>
      )}
      <Tab name="Curators’ Picks">
        <StandoutLotsRailQueryRenderer />
      </Tab>
      <Tab name="Trending Lots">
        <TrendingLotsRailQueryRenderer />
      </Tab>
    </Tabs>
  )
}

export const CuratorialRailsZeroState: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <AuctionsZeroState>No Works To Show</AuctionsZeroState>
}
