import type { HomeRailTrackingProps } from "Apps/Home/homeRailPositionY"
import { ContextModule } from "@artsy/cohesion"
import { Box } from "@artsy/palette"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { useRailImpressionTracking } from "Components/RailImpression/useRailImpressionTracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { extractNodes } from "Utils/extractNodes"
import type { HomeHeroUnits_heroUnits$data } from "__generated__/HomeHeroUnits_heroUnits.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnitFragmentContainer } from "./HomeHeroUnit"
import { HomeHeroUnitLoggedOut } from "./HomeHeroUnitLoggedOut"

interface HomeHeroUnitsProps extends HomeRailTrackingProps {
  heroUnits: HomeHeroUnits_heroUnits$data
}

export const HomeHeroUnits: React.FC<
  React.PropsWithChildren<HomeHeroUnitsProps>
> = ({ heroUnits, railPositionY }) => {
  const { isLoggedIn } = useSystemContext()
  const nodes = extractNodes(heroUnits)
  const { railImpressionRef } = useRailImpressionTracking({
    contextModule: ContextModule.heroUnitsRail,
    positionY: railPositionY,
  })

  return (
    <Box ref={railImpressionRef} width="100%">
      <HeroCarousel>
        {!isLoggedIn && <HomeHeroUnitLoggedOut index={0} />}
        {nodes.map((heroUnit, index) => {
          return (
            <HomeHeroUnitFragmentContainer
              heroUnit={heroUnit}
              // Increment index if we inserted the logged out unit
              index={!isLoggedIn ? index + 1 : index}
              key={index}
            />
          )
        })}
      </HeroCarousel>
    </Box>
  )
}

export const HomeHeroUnitsFragmentContainer = createFragmentContainer(
  HomeHeroUnits,
  {
    heroUnits: graphql`
      fragment HomeHeroUnits_heroUnits on HeroUnitConnection {
        edges {
          node {
            ...HomeHeroUnit_heroUnit
          }
        }
      }
    `,
  },
)
