import * as React from "react"
import { Tab, Tabs } from "@artsy/palette"
import { HomeAuctionLotsForYouRailQueryRenderer } from "Apps/Home/Components/HomeAuctionLotsForYouRail"
import { HomeAuctionLotsRailQueryRenderer } from "Apps/Home/Components/HomeAuctionLotsRail"
import { useSystemContext } from "System/useSystemContext"

export const HomeAuctionLotsTabBar: React.FC = () => {
  const { user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <Tabs>
      <Tab name="Auction Lots">
        <HomeAuctionLotsRailQueryRenderer />
      </Tab>
      <Tab name="Auction Lots for You">
        <HomeAuctionLotsForYouRailQueryRenderer />
      </Tab>
    </Tabs>
  )
}
