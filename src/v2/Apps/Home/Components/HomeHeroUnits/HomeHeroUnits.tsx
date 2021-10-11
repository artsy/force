import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnitsLarge } from "./HomeHeroUnitsLarge"
import { HomeHeroUnitsSmall } from "./HomeHeroUnitsSmall"
import { HomeHeroUnits_homePage } from "v2/__generated__/HomeHeroUnits_homePage.graphql"
import { Media } from "v2/Utils/Responsive"
import { useSystemContext } from "v2/System"
import {
  HomeHeroUnit,
  HomeHeroUnitFragmentContainer,
  LOGGED_OUT_HERO_UNIT,
  StaticHeroUnit,
} from "./HomeHeroUnit"
import { compact } from "lodash"

interface HomeHeroUnitsProps {
  homePage: HomeHeroUnits_homePage
}

const HomeHeroUnits: React.FC<HomeHeroUnitsProps> = ({ homePage }) => {
  const { isLoggedIn } = useSystemContext()

  const heroUnits = [
    ...(isLoggedIn ? [] : [LOGGED_OUT_HERO_UNIT]),
    ...compact(homePage.heroUnits),
  ]

  const rendered = heroUnits.map((heroUnit, i) => {
    // If logged out, the first hero unit is static and
    // needs to be rendered without the fragment container
    if (!isLoggedIn && i === 0) {
      return (
        <HomeHeroUnit
          key={i}
          index={i}
          heroUnit={heroUnit as StaticHeroUnit}
          layout={i % 2 === 0 ? "b" : "a"}
        />
      )
    }

    return (
      <HomeHeroUnitFragmentContainer
        key={i}
        index={i}
        heroUnit={heroUnit}
        layout={i % 2 === 0 ? "b" : "a"}
      />
    )
  })

  return (
    <>
      <Media at="xs">
        <HomeHeroUnitsSmall>{rendered}</HomeHeroUnitsSmall>
      </Media>

      <Media greaterThan="xs">
        <HomeHeroUnitsLarge>{rendered}</HomeHeroUnitsLarge>
      </Media>
    </>
  )
}

export const HomeHeroUnitsFragmentContainer = createFragmentContainer(
  HomeHeroUnits,
  {
    homePage: graphql`
      fragment HomeHeroUnits_homePage on HomePage {
        heroUnits(platform: DESKTOP) {
          internalID
          ...HomeHeroUnit_heroUnit
        }
      }
    `,
  }
)
