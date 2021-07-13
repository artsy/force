import { ProgressDots, Spacer } from "@artsy/palette"
import { compact } from "lodash"
import React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { HomeHeroUnitsSmall_homePage } from "v2/__generated__/HomeHeroUnitsSmall_homePage.graphql"
import { HomeSwiper } from "../HomeSwiper"
import {
  HomeHeroUnitFragmentContainer,
  LOGGED_OUT_HERO_UNIT,
} from "./HomeHeroUnit"

interface HomeHeroUnitsSmallProps {
  homePage: HomeHeroUnitsSmall_homePage
}

const HomeHeroUnitsSmall: React.FC<HomeHeroUnitsSmallProps> = ({
  homePage,
}) => {
  const { isLoggedIn } = useSystemContext()
  const [index, setIndex] = useState(0)

  const heroUnits = [
    ...(isLoggedIn ? [] : [LOGGED_OUT_HERO_UNIT]),
    ...compact(homePage.heroUnits),
  ]

  return (
    <>
      <HomeSwiper onChange={setIndex}>
        {heroUnits.map((heroUnit, i) => {
          return (
            <HomeHeroUnitFragmentContainer
              key={i}
              index={i}
              heroUnit={heroUnit}
              layout="a"
              bg={!isLoggedIn && i === 0 ? "black100" : "black5"}
            />
          )
        })}
      </HomeSwiper>

      <Spacer mt={4} />

      <ProgressDots
        variant="dash"
        amount={heroUnits.length}
        activeIndex={index}
      />
    </>
  )
}

export const HomeHeroUnitsSmallFragmentContainer = createFragmentContainer(
  HomeHeroUnitsSmall,
  {
    homePage: graphql`
      fragment HomeHeroUnitsSmall_homePage on HomePage {
        heroUnits(platform: DESKTOP) {
          internalID
          ...HomeHeroUnit_heroUnit
        }
      }
    `,
  }
)
