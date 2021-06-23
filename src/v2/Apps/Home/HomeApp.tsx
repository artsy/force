import { Column, GridColumns, Spacer, Join } from "@artsy/palette"
import { compact } from "lodash"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System/useSystemContext"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeArtworkModulesFragmentContainer } from "./Components/HomeArtworkModules"
import { HomeFeaturedCategoriesRailQueryRenderer } from "./Components/HomeFeaturedCategoriesRail"
import { HomeHeroUnitFragmentContainer } from "./Components/HomeHeroUnit"
import { HomeInfoBlurb } from "./Components/HomeInfoBlurb"
import { HomeFeaturedShowsLazyQueryRenderer } from "./Components/HomeFeaturedShows"
import { HomeFeaturedArticlesLazyQueryRenderer } from "./Components/HomeFeaturedArticles"

interface HomeAppProps {
  homePage: HomeApp_homePage
}

export const HomeApp: React.FC<HomeAppProps> = ({ homePage }) => {
  const { isLoggedIn } = useSystemContext()

  const heroUnits = compact(homePage.heroUnits?.slice(0, 2)) ?? []

  return (
    <>
      <Title>Artsy - Discover & Buy Art</Title>

      <Spacer mt={4} />

      <Join separator={<Spacer mt={6} />}>
        {!isLoggedIn && <HomeInfoBlurb />}

        <GridColumns gridRowGap={6}>
          {heroUnits.map(heroUnit => {
            return (
              <Column key={heroUnit.internalID} span={6}>
                <HomeHeroUnitFragmentContainer heroUnit={heroUnit} />
              </Column>
            )
          })}
        </GridColumns>

        {!isLoggedIn && <HomeFeaturedCategoriesRailQueryRenderer />}

        <HomeArtworkModulesFragmentContainer homePage={homePage} />

        <HomeFeaturedShowsLazyQueryRenderer />

        <HomeFeaturedArticlesLazyQueryRenderer />
      </Join>
    </>
  )
}

export const HomeAppFragmentContainer = createFragmentContainer(HomeApp, {
  homePage: graphql`
    fragment HomeApp_homePage on HomePage {
      heroUnits(platform: DESKTOP) {
        internalID
        ...HomeHeroUnit_heroUnit
      }
      ...HomeArtworkModules_homePage
    }
  `,
})
