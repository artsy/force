import { Column, GridColumns, Spacer } from "@artsy/palette"
import { compact } from "lodash"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System/useSystemContext"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homePage.graphql"
import { HomeHeroUnitFragmentContainer } from "./Components/HomeHeroUnit"
import { HomeInfoBlurb } from "./Components/HomeInfoBlurb"

interface HomeAppProps {
  homePage: HomeApp_homePage
}

export const HomeApp: React.FC<HomeAppProps> = ({ homePage }) => {
  const heroUnits = compact(homePage.heroUnits?.slice(0, 2)) ?? []

  const { isLoggedIn } = useSystemContext()

  return (
    <>
      <Title>Artsy - Discover & Buy Art</Title>

      <Spacer mt={4} />

      {!isLoggedIn && (
        <>
          <HomeInfoBlurb />

          <Spacer mt={6} />
        </>
      )}

      <GridColumns gridRowGap={6}>
        {heroUnits.map(heroUnit => {
          return (
            <Column key={heroUnit.internalID} span={6}>
              <HomeHeroUnitFragmentContainer heroUnit={heroUnit} />
            </Column>
          )
        })}
      </GridColumns>

      <Spacer mt={6} />
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
    }
  `,
})
