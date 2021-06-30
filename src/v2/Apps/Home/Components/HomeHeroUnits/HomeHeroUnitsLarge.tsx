import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import {
  Box,
  Flex,
  ProgressDots,
  Spacer,
  FullBleed,
  ShelfNext,
  ShelfPrevious,
} from "@artsy/palette"
import { HomeHeroUnitsLarge_homePage } from "v2/__generated__/HomeHeroUnitsLarge_homePage.graphql"
import { HomeHeroUnitFragmentContainer } from "./HomeHeroUnit"
import { compact } from "lodash"
import { useCursor } from "use-cursor"
import { useRef, useEffect } from "react"
import { HomeCarousel } from "../HomeCarousel"
import { useSystemContext } from "v2/System"
import { HomeHeroUnitLoggedOut } from "./HomeHeroUnitLoggedOut"

interface HomeHeroUnitsLargeProps {
  homePage: HomeHeroUnitsLarge_homePage
}

const HomeHeroUnitsLarge: React.FC<HomeHeroUnitsLargeProps> = ({
  homePage,
}) => {
  const { isLoggedIn } = useSystemContext()

  const heroUnits = compact(homePage.heroUnits)

  const {
    index,
    handleNext: onNext,
    handlePrev: onPrev,
    setCursor,
  } = useCursor({ max: heroUnits.length })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAutoPlay = () => {
    intervalRef.current && clearInterval(intervalRef.current)
  }

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCursor(prevCursor => prevCursor + 1),
      10000
    )

    return stopAutoPlay
  }, [setCursor])

  const handleNext = () => {
    onNext()
    stopAutoPlay()
  }

  const handlePrev = () => {
    onPrev()
    stopAutoPlay()
  }

  const handleClick = (index: number) => {
    setCursor(index)
    stopAutoPlay()
  }

  if (!homePage.heroUnits) return null

  return (
    <>
      <FullBleed>
        <HomeCarousel initialIndex={index}>
          {!isLoggedIn && <HomeHeroUnitLoggedOut index={0} layout="b" />}

          {heroUnits.map((heroUnit, i) => {
            return (
              <HomeHeroUnitFragmentContainer
                key={i}
                index={i + (isLoggedIn ? 0 : 1)}
                heroUnit={heroUnit}
                layout={i % 2 === 0 ? "a" : "b"}
              />
            )
          })}
        </HomeCarousel>
      </FullBleed>

      <Spacer mt={4} />

      <Flex alignItems="center">
        <Box flex={1}>
          <ProgressDots
            variant="dash"
            amount={heroUnits.length}
            activeIndex={index}
            onClick={handleClick}
          />
        </Box>

        <Spacer ml={2} />

        <ShelfPrevious onClick={handlePrev} />

        <Spacer ml={1} />

        <ShelfNext onClick={handleNext} />
      </Flex>
    </>
  )
}

export const HomeHeroUnitsLargeFragmentContainer = createFragmentContainer(
  HomeHeroUnitsLarge,
  {
    homePage: graphql`
      fragment HomeHeroUnitsLarge_homePage on HomePage {
        heroUnits(platform: DESKTOP) {
          internalID
          ...HomeHeroUnit_heroUnit
        }
      }
    `,
  }
)
