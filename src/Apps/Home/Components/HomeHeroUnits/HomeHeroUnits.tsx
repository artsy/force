import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { extractNodes } from "Utils/extractNodes"
import type { HomeHeroUnits_heroUnits$data } from "__generated__/HomeHeroUnits_heroUnits.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnitFragmentContainer } from "./HomeHeroUnit"
import { HomeHeroUnitLoggedOut } from "./HomeHeroUnitLoggedOut"

interface HomeHeroUnitsProps {
  heroUnits: HomeHeroUnits_heroUnits$data
}

export const HomeHeroUnits: React.FC<
  React.PropsWithChildren<HomeHeroUnitsProps>
> = ({ heroUnits }) => {
  const { isLoggedIn } = useSystemContext()
  const nodes = extractNodes(heroUnits)

  return (
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
  }
)
