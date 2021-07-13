import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnitsLargeFragmentContainer } from "./HomeHeroUnitsLarge"
import { HomeHeroUnitsSmallFragmentContainer } from "./HomeHeroUnitsSmall"
import { HomeHeroUnits_homePage } from "v2/__generated__/HomeHeroUnits_homePage.graphql"
import { Media } from "v2/Utils/Responsive"

interface HomeHeroUnitsProps {
  homePage: HomeHeroUnits_homePage
}

const HomeHeroUnits: React.FC<HomeHeroUnitsProps> = ({ homePage }) => {
  return (
    <>
      <Media at="xs">
        <HomeHeroUnitsSmallFragmentContainer homePage={homePage} />
      </Media>

      <Media greaterThan="xs">
        <HomeHeroUnitsLargeFragmentContainer homePage={homePage} />
      </Media>
    </>
  )
}

export const HomeHeroUnitsFragmentContainer = createFragmentContainer(
  HomeHeroUnits,
  {
    homePage: graphql`
      fragment HomeHeroUnits_homePage on HomePage {
        ...HomeHeroUnitsSmall_homePage
        ...HomeHeroUnitsLarge_homePage
      }
    `,
  }
)
