import { Spacer, Join } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeApp_featuredEventsOrderedSet } from "v2/__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeMeta } from "./Components/HomeMeta"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"
import { HomeFilters } from "./Components/HomeFilters"
import { HomeStartExploring } from "./Components/HomeStartExploring"
import { HomeValueProps } from "./Components/HomeValueProps"

import { HomeAccountCreation } from "./Components/HomeAccountCreation"
import { useSystemContext } from "v2/System"
import { HomeTroveArtworksRailQueryRenderer } from "./Components/HomeTroveArtworksRail"
import { HomeTrustedBy } from "./Components/HomeTrustedBy"

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

      <HomeFilters />

      <Join separator={<Spacer mt={[6, 12]} />}>
        <HomeStartExploring />
        <HomeValueProps />

        <HomeWorksForYouTabBar />

        {!user && <HomeTroveArtworksRailQueryRenderer />}

        <HomeTrustedBy />

        {!user && <HomeAccountCreation />}
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
