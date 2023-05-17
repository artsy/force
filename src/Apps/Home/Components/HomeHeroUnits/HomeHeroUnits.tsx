import React from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { HomeHeroUnitFragmentContainer } from "./HomeHeroUnit"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnits_heroUnits$data } from "__generated__/HomeHeroUnits_heroUnits.graphql"
import { extractNodes } from "Utils/extractNodes"

interface HomeHeroUnitsProps {
  heroUnits: HomeHeroUnits_heroUnits$data
}

export const HomeHeroUnits: React.FC<HomeHeroUnitsProps> = ({ heroUnits }) => {
  const nodes = extractNodes(heroUnits)

  return (
    <HeroCarousel>
      {nodes.map((heroUnit, index) => {
        return (
          <HomeHeroUnitFragmentContainer
            heroUnit={heroUnit}
            index={index}
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
