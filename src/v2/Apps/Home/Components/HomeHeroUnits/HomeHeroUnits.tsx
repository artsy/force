import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnits_homePage } from "v2/__generated__/HomeHeroUnits_homePage.graphql"
import { useSystemContext } from "v2/System"
import {
  HomeHeroUnit,
  HomeHeroUnitFragmentContainer,
  LOGGED_OUT_HERO_UNIT,
  StaticHeroUnit,
} from "./HomeHeroUnit"
import { compact } from "lodash"
import { HeroCarousel } from "v2/Components/HeroCarousel/HeroCarousel"

interface HomeHeroUnitsProps {
  homePage: HomeHeroUnits_homePage
}

const HomeHeroUnits: React.FC<HomeHeroUnitsProps> = ({ homePage }) => {
  // TODO: Remove after SSS sale ends
  const skipHomeHero = true
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
          if (skipHomeHero) return

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
