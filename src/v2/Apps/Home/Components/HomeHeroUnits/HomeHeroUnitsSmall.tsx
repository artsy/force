import { ProgressDots, Spacer } from "@artsy/palette"
import { compact } from "lodash"
import React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { HomeHeroUnitsSmall_homePage } from "v2/__generated__/HomeHeroUnitsSmall_homePage.graphql"
import { HomeSwiper } from "../HomeSwiper"
import { HomeHeroUnitFragmentContainer } from "./HomeHeroUnit"
import { HomeHeroUnitLoggedOut } from "./HomeHeroUnitLoggedOut"

interface HomeHeroUnitsSmallProps {
  homePage: HomeHeroUnitsSmall_homePage
}

const HomeHeroUnitsSmall: React.FC<HomeHeroUnitsSmallProps> = ({
  homePage,
}) => {
  const { isLoggedIn } = useSystemContext()
  const [index, setIndex] = useState(0)

  const heroUnits = compact(homePage.heroUnits)
  return (
    <>
      <HomeSwiper onChange={setIndex}>
        {!isLoggedIn && <HomeHeroUnitLoggedOut index={0} layout="a" />}

        {heroUnits.map((heroUnit, i) => {
          return (
            <HomeHeroUnitFragmentContainer
              key={i}
              index={i + (isLoggedIn ? 0 : 1)}
              heroUnit={heroUnit}
              layout="a"
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
