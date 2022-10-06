import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnits_homePage$data } from "__generated__/HomeHeroUnits_homePage.graphql"
import { useSystemContext } from "System"
import {
  HomeHeroUnit,
  HomeHeroUnitFragmentContainer,
  LOGGED_OUT_HERO_UNIT,
  StaticHeroUnit,
} from "./HomeHeroUnit"
import { compact } from "lodash"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"

interface HomeHeroUnitsProps {
  homePage: HomeHeroUnits_homePage$data
}

const HomeHeroUnits: React.FC<HomeHeroUnitsProps> = ({ homePage }) => {
  const { isLoggedIn } = useSystemContext()

  const heroUnits = [
    ...(isLoggedIn ? [] : [LOGGED_OUT_HERO_UNIT]),
    ...compact(homePage.heroUnits),
  ]

  return (
    <HeroCarousel>
      {heroUnits.map((heroUnit, i) => {
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
      })}
    </HeroCarousel>
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
