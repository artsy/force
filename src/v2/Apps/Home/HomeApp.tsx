import { Spacer, Join } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeApp_featuredEventsOrderedSet } from "v2/__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeMeta } from "./Components/HomeMeta"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"
import { HomeFilters } from "./Components/HomeFilters"
import { StartExploring } from "./Components/StartExploring"
import { HomeValueProps } from "./Components/HomeValueProps"

import { HomeAccountCreation } from "./Components/HomeAccountCreation"
import { useSystemContext } from "v2/System"
import { HomeTroveArtworksRailQueryRenderer } from "./Components/HomeTroveArtworksRail"

interface HomeAppProps {
  homePage: HomeApp_homePage | null
  featuredEventsOrderedSet: HomeApp_featuredEventsOrderedSet | null
}

export const HomeApp: React.FC<HomeAppProps> = ({
  homePage,
  featuredEventsOrderedSet,
}) => {
  const { user } = useSystemContext()

  return (
    <>
      <HomeMeta />

      <Spacer mt={[6, 12]} height={"1px"} />
      <Spacer mt={[6, 12]} height={"1px"} />
      <HomeFilters />
      <Spacer mt={[6, 12]} height={"1px"} />
      <Spacer mt={[6, 12]} height={"1px"} />

      <Join separator={<Spacer mt={[6, 12]} />}>
        <HomeWorksForYouTabBar />

        {!user && <HomeTroveArtworksRailQueryRenderer />}

        <HomeValueProps />

        <StartExploring />

        <HomeAccountCreation />
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
