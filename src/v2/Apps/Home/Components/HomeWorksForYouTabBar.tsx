import { Tab, Tabs } from "@artsy/palette"
import React from "react"
import { HomeRecentlyViewedRailQueryRenderer } from "./HomeRecentlyViewedRail"
import { HomeWorksByArtistsYouFollowRailQueryRenderer } from "./HomeWorksByArtistsYouFollowRail"

export const HomeWorksForYouTabBar: React.FC = () => {
  return (
    <Tabs>
      <Tab name="New Works by Artists You Follow">
        <HomeWorksByArtistsYouFollowRailQueryRenderer />
      </Tab>
      <Tab name="Recently Viewed">
        <HomeRecentlyViewedRailQueryRenderer />
      </Tab>
    </Tabs>
  )
}
