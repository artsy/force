import { Tab, Tabs } from "@artsy/palette"
import * as React from "react"
import { useSystemContext } from "v2/System"
import { HomeNewWorksForYouRailQueryRenderer } from "./HomeNewWorksForYouRail"
import { HomeRecentlyViewedRailQueryRenderer } from "./HomeRecentlyViewedRail"
import { HomeWorksByArtistsYouFollowRailQueryRenderer } from "./HomeWorksByArtistsYouFollowRail"

export const HomeWorksForYouTabBar: React.FC = () => {
  const { user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <Tabs>
      <Tab name="New Works For You">
        <HomeNewWorksForYouRailQueryRenderer />
      </Tab>
      <Tab name="New Works by Artists You Follow">
        <HomeWorksByArtistsYouFollowRailQueryRenderer />
      </Tab>
      <Tab name="Recently Viewed">
        <HomeRecentlyViewedRailQueryRenderer />
      </Tab>
    </Tabs>
  )
}
