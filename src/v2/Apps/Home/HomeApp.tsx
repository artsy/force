import { Spacer, Join, Separator, FullBleed } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeApp_featuredEventsOrderedSet } from "v2/__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeArtworkModulesFragmentContainer } from "./Components/HomeArtworkModules"
import { HomeHeroUnitsFragmentContainer } from "./Components/HomeHeroUnits/HomeHeroUnits"
import { HomeFeaturedMarketNewsLazyQueryRenderer } from "./Components/HomeFeaturedMarketNews"
import { HomeFeaturedEventsRailFragmentContainer } from "./Components/HomeFeaturedEventsRail"
import { HomeMeta } from "./Components/HomeMeta"
import { FlashBannerQueryRenderer } from "v2/Components/FlashBanner"
import { HomeFeaturedGalleriesRailQueryRenderer } from "./Components/HomeFeaturedGalleriesRail"

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

      {homePage && <HomeHeroUnitsFragmentContainer homePage={homePage} />}

      <Spacer mt={4} />

      <Join separator={<Spacer mt={6} />}>
        {featuredEventsOrderedSet && (
          <>
            <HomeFeaturedEventsRailFragmentContainer
              orderedSet={featuredEventsOrderedSet}
            />

            <Separator />
          </>
        )}

        {homePage && (
          <HomeArtworkModulesFragmentContainer homePage={homePage} />
        )}

        <HomeFeaturedMarketNewsLazyQueryRenderer />

        <HomeFeaturedGalleriesRailQueryRenderer />
      </Join>
    </>
  )
}

export const HomeAppFragmentContainer = createFragmentContainer(HomeApp, {
  homePage: graphql`
    fragment HomeApp_homePage on HomePage {
      ...HomeHeroUnits_homePage
      ...HomeArtworkModules_homePage
    }
  `,
  featuredEventsOrderedSet: graphql`
    fragment HomeApp_featuredEventsOrderedSet on OrderedSet {
      ...HomeFeaturedEventsRail_orderedSet
    }
  `,
})
