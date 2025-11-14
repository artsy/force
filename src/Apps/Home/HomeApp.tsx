import { MyBidsQueryRenderer } from "Apps/Auctions/Components/MyBids/MyBids"
import { HomeArtworkRecommendationsRailQueryRenderer } from "Apps/Home/Components/HomeArtworkRecommendationsRail"
import { HomeAuctionLotsTabBar } from "Apps/Home/Components/HomeAuctionLotsTabBar"
import { HomeNewWorksFromGalleriesYouFollowRailQueryRenderer } from "Apps/Home/Components/HomeNewWorksFromGalleriesYouFollowRail"
import { HomeRecommendedArtistsRailQueryRenderer } from "Apps/Home/Components/HomeRecommendedArtistsRail"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { FlashBannerQueryRenderer } from "Components/FlashBanner"
import { Join, Spacer } from "@artsy/palette"
import type { HomeApp_featuredEventsOrderedSet$data } from "__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import type { HomeApp_heroUnitsConnection$data } from "__generated__/HomeApp_heroUnitsConnection.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeCurrentFairsQueryRenderer } from "./Components/HomeCurrentFairs"
import { HomeEmergingPicksArtworksRailQueryRenderer } from "./Components/HomeEmergingPicksArtworksRail"
import { HomeFeaturedEventsRailFragmentContainer } from "./Components/HomeFeaturedEventsRail"
import { HomeFeaturedGalleriesRailQueryRenderer } from "./Components/HomeFeaturedGalleriesRail"
import { HomeFeaturedMarketNewsQueryRenderer } from "./Components/HomeFeaturedMarketNews"
import { HomeFeaturedShowsRailQueryRenderer } from "./Components/HomeFeaturedShowsRail"
import { HomeHeroUnitsFragmentContainer } from "./Components/HomeHeroUnits"
import { HomeMeta } from "./Components/HomeMeta"
import { HomeStructuredData } from "./Components/HomeStructuredData"
import { HomeTrendingArtistsRailQueryRenderer } from "./Components/HomeTrendingArtistsRail"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"

interface HomeAppProps {
  featuredEventsOrderedSet: HomeApp_featuredEventsOrderedSet$data | null
  heroUnitsConnection: HomeApp_heroUnitsConnection$data
}

export const HomeApp: React.FC<React.PropsWithChildren<HomeAppProps>> = ({
  featuredEventsOrderedSet,
  heroUnitsConnection,
}) => {
  return (
    <>
      <HomeMeta />

      <HomeStructuredData />

      <FlashBannerQueryRenderer />

      <Spacer y={[2, 0]} />

      <HomeHeroUnitsFragmentContainer heroUnits={heroUnitsConnection} />

      <Spacer y={[4, 6]} />
      <ArtworkGridContextProvider>
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

          <HomeArtworkRecommendationsRailQueryRenderer />

          <ArtworkGridContextProvider hideSignals>
            <HomeEmergingPicksArtworksRailQueryRenderer />
          </ArtworkGridContextProvider>

          <HomeFeaturedMarketNewsQueryRenderer />

          <HomeAuctionLotsTabBar />

          <HomeFeaturedShowsRailQueryRenderer />

          <HomeCurrentFairsQueryRenderer />

          <HomeFeaturedGalleriesRailQueryRenderer />

          <HomeNewWorksFromGalleriesYouFollowRailQueryRenderer />

          <HomeRecommendedArtistsRailQueryRenderer />

          <HomeTrendingArtistsRailQueryRenderer />
        </Join>
      </ArtworkGridContextProvider>
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
