import { Spacer, Join, FullBleed } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeApp_featuredEventsOrderedSet } from "v2/__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeFeaturedMarketNewsQueryRenderer } from "./Components/HomeFeaturedMarketNews"
import { HomeMeta } from "./Components/HomeMeta"
import { FlashBannerQueryRenderer } from "v2/Components/FlashBanner"
import { HomeTrendingArtistsRailQueryRenderer } from "./Components/HomeTrendingArtistsRail"
import { HomeAuctionLotsRailQueryRenderer } from "./Components/HomeAuctionLotsRail"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"
import { MyBidsQueryRenderer } from "../Auctions/Components/MyBids/MyBids"
import { HomeTroveArtworksRailQueryRenderer } from "./Components/HomeTroveArtworksRail"
import { HomeFilters } from "./Components/HomeFilters"
import { StartExploring } from "./Components/StartExploring"
import { HomeValueProps } from "./Components/HomeValueProps"

interface HomeAppProps {
  homePage: HomeApp_homePage | null
  featuredEventsOrderedSet: HomeApp_featuredEventsOrderedSet | null
}

export const HomeApp: React.FC<HomeAppProps> = ({
  homePage,
  featuredEventsOrderedSet,
}) => {
  return (
    <>
      <HomeMeta />

      <FullBleed>
        <FlashBannerQueryRenderer />
      </FullBleed>

      <Spacer mt={[2, 0]} />

      <Spacer mt={[4, 6]} />

      <HomeFilters />

      <Spacer mt={[4, 6]} />

      <StartExploring />

      <HomeValueProps />

      <Join separator={<Spacer mt={[6, 12]} />}>
        <MyBidsQueryRenderer />

        <HomeWorksForYouTabBar />

        <HomeTroveArtworksRailQueryRenderer />

        <HomeFeaturedMarketNewsQueryRenderer />

        <HomeAuctionLotsRailQueryRenderer />

        <HomeTrendingArtistsRailQueryRenderer />
      </Join>
    </>
  )
}

export const HomeAppFragmentContainer = createFragmentContainer(HomeApp, {
  homePage: graphql`
    fragment HomeApp_homePage on HomePage {
      ...HomeHeroUnits_homePage
    }
  `,
  featuredEventsOrderedSet: graphql`
    fragment HomeApp_featuredEventsOrderedSet on OrderedSet {
      ...HomeFeaturedEventsRail_orderedSet
    }
  `,
})
