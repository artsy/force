import { Spacer, Join } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_featuredEventsOrderedSet$data } from "__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeApp_heroUnitsConnection$data } from "__generated__/HomeApp_heroUnitsConnection.graphql"
import { HomeFeaturedMarketNewsQueryRenderer } from "./Components/HomeFeaturedMarketNews"
import { HomeFeaturedEventsRailFragmentContainer } from "./Components/HomeFeaturedEventsRail"
import { HomeMeta } from "./Components/HomeMeta"
import { FlashBannerQueryRenderer } from "Components/FlashBanner"
import { HomeFeaturedGalleriesRailQueryRenderer } from "./Components/HomeFeaturedGalleriesRail"
import { HomeFeaturedShowsRailQueryRenderer } from "./Components/HomeFeaturedShowsRail"
import { HomeCurrentFairsQueryRenderer } from "./Components/HomeCurrentFairs"
import { HomeTrendingArtistsRailQueryRenderer } from "./Components/HomeTrendingArtistsRail"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"
import { MyBidsQueryRenderer } from "Apps/Auctions/Components/MyBids/MyBids"
import { HomeEmergingPicksArtworksRailQueryRenderer } from "./Components/HomeEmergingPicksArtworksRail"
import { HomeHeroUnitsFragmentContainer } from "./Components/HomeHeroUnits"
import { HomeNewWorksFromGalleriesYouFollowRailQueryRenderer } from "Apps/Home/Components/HomeNewWorksFromGalleriesYouFollowRail"
import { HomeAuctionLotsTabBar } from "Apps/Home/Components/HomeAuctionLotsTabBar"

interface HomeAppProps {
  featuredEventsOrderedSet: HomeApp_featuredEventsOrderedSet$data | null
  heroUnitsConnection: HomeApp_heroUnitsConnection$data
}

export const HomeApp: React.FC<HomeAppProps> = ({
  featuredEventsOrderedSet,
  heroUnitsConnection,
}) => {
  return (
    <>
      <HomeMeta />

      <FlashBannerQueryRenderer />

      <Spacer y={[2, 0]} />

      <HomeHeroUnitsFragmentContainer heroUnits={heroUnitsConnection} />

      <Spacer y={[4, 6]} />

      <Join separator={<Spacer y={[6, 12]} />}>
        {featuredEventsOrderedSet && (
          <>
            <HomeFeaturedEventsRailFragmentContainer
              orderedSet={featuredEventsOrderedSet}
            />
          </>
        )}

        <MyBidsQueryRenderer />

        <HomeWorksForYouTabBar />

        <HomeEmergingPicksArtworksRailQueryRenderer />

        <HomeFeaturedMarketNewsQueryRenderer />

        <HomeAuctionLotsTabBar />

        <HomeFeaturedShowsRailQueryRenderer />

        <HomeCurrentFairsQueryRenderer />

        <HomeFeaturedGalleriesRailQueryRenderer />

        <HomeNewWorksFromGalleriesYouFollowRailQueryRenderer />

        <HomeTrendingArtistsRailQueryRenderer />
      </Join>
    </>
  )
}

export const HomeAppFragmentContainer = createFragmentContainer(HomeApp, {
  featuredEventsOrderedSet: graphql`
    fragment HomeApp_featuredEventsOrderedSet on OrderedSet {
      ...HomeFeaturedEventsRail_orderedSet
    }
  `,
  heroUnitsConnection: graphql`
    fragment HomeApp_heroUnitsConnection on HeroUnitConnection {
      ...HomeHeroUnits_heroUnits
    }
  `,
})
