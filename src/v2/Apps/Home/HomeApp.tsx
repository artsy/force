import { Spacer, Join, Separator, FullBleed } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System/useSystemContext"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeApp_orderedSet } from "v2/__generated__/HomeApp_orderedSet.graphql"
import { HomeArtworkModulesFragmentContainer } from "./Components/HomeArtworkModules"
import { HomeFeaturedCategoriesRailQueryRenderer } from "./Components/HomeFeaturedCategoriesRail"
import { HomeHeroUnitsFragmentContainer } from "./Components/HomeHeroUnits/HomeHeroUnits"
import { HomeFeaturedShowsLazyQueryRenderer } from "./Components/HomeFeaturedShows"
import { HomeFeaturedArticlesLazyQueryRenderer } from "./Components/HomeFeaturedArticles"
import { HomeFeaturedEventsRailFragmentContainer } from "./Components/HomeFeaturedEventsRail"
import { HomeMeta } from "./Components/HomeMeta"
import { FlashBannerQueryRenderer } from "v2/Components/FlashBanner"

interface HomeAppProps {
  homePage: HomeApp_homePage | null
  orderedSet: HomeApp_orderedSet | null
}

export const HomeApp: React.FC<HomeAppProps> = ({ homePage, orderedSet }) => {
  const { isLoggedIn } = useSystemContext()

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
        {orderedSet && (
          <>
            <HomeFeaturedEventsRailFragmentContainer orderedSet={orderedSet} />

            <Separator />
          </>
        )}

        {!isLoggedIn && <HomeFeaturedCategoriesRailQueryRenderer />}

        {homePage && (
          <HomeArtworkModulesFragmentContainer homePage={homePage} />
        )}

        <HomeFeaturedShowsLazyQueryRenderer />

        <HomeFeaturedArticlesLazyQueryRenderer />
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
  orderedSet: graphql`
    fragment HomeApp_orderedSet on OrderedSet {
      ...HomeFeaturedEventsRail_orderedSet
    }
  `,
})
