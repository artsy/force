import { Spacer, Join } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_homePage$data } from "__generated__/HomeApp_homePage.graphql"
import { HomeApp_featuredEventsOrderedSet$data } from "__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeHeroUnitsFragmentContainer } from "./Components/HomeHeroUnits/HomeHeroUnits"
import { HomeFeaturedMarketNewsQueryRenderer } from "./Components/HomeFeaturedMarketNews"
import { HomeFeaturedEventsRailFragmentContainer } from "./Components/HomeFeaturedEventsRail"
import { HomeMeta } from "./Components/HomeMeta"
import { FlashBannerQueryRenderer } from "Components/FlashBanner"
import { HomeFeaturedGalleriesRailQueryRenderer } from "./Components/HomeFeaturedGalleriesRail"
import { HomeFeaturedShowsRailQueryRenderer } from "./Components/HomeFeaturedShowsRail"
import { HomeCurrentFairsQueryRenderer } from "./Components/HomeCurrentFairs"
import { HomeTrendingArtistsRailQueryRenderer } from "./Components/HomeTrendingArtistsRail"
import { HomeAuctionLotsRailQueryRenderer } from "./Components/HomeAuctionLotsRail"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"
import { MyBidsQueryRenderer } from "Apps/Auctions/Components/MyBids/MyBids"
import { HomeTroveArtworksRailQueryRenderer } from "./Components/HomeTroveArtworksRail"
import { useRouter } from "System/Router/useRouter"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"
import { HomeContentCards } from "./Components/HomeContentCards"

interface HomeAppProps {
  homePage: HomeApp_homePage$data | null
  featuredEventsOrderedSet: HomeApp_featuredEventsOrderedSet$data | null
}

export const HomeApp: React.FC<HomeAppProps> = ({
  homePage,
  featuredEventsOrderedSet,
}) => {
  const { match } = useRouter()
  const { brazeContentCards } = paramsToCamelCase(match?.location.query) as {
    brazeContentCards?: boolean
  }
  const showBrazeContentCards = !!brazeContentCards
  const showHomeHeroUnits = !showBrazeContentCards && !!homePage

  return (
    <>
      <HomeMeta />

      <FlashBannerQueryRenderer />

      <Spacer mt={[2, 0]} />

      {showBrazeContentCards && <HomeContentCards />}

      {showHomeHeroUnits && (
        <HomeHeroUnitsFragmentContainer homePage={homePage} />
      )}

      <Spacer mt={[4, 6]} />

      <Join separator={<Spacer mt={[6, 12]} />}>
        {featuredEventsOrderedSet && (
          <>
            <HomeFeaturedEventsRailFragmentContainer
              orderedSet={featuredEventsOrderedSet}
            />
          </>
        )}

        <MyBidsQueryRenderer />

        <HomeWorksForYouTabBar />

        <HomeTroveArtworksRailQueryRenderer />

        <HomeFeaturedMarketNewsQueryRenderer />

        <HomeAuctionLotsRailQueryRenderer />

        <HomeFeaturedShowsRailQueryRenderer />

        <HomeCurrentFairsQueryRenderer />

        <HomeFeaturedGalleriesRailQueryRenderer />

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
