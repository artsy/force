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
import {
  HomeHeroUnitFragmentContainer,
  LOGGED_OUT_HERO_UNIT,
} from "./HomeHeroUnit"
import { compact } from "lodash"
import { useCursor } from "use-cursor"
import { useRef, useEffect } from "react"
import { HomeCarousel } from "../HomeCarousel"
import { useSystemContext } from "v2/System"
import { useCallback } from "react"
import { useNextPrevious } from "v2/Utils/Hooks/useNextPrevious"

interface HomeHeroUnitsLargeProps {
  homePage: HomeHeroUnitsLarge_homePage
}

const HomeHeroUnitsLarge: React.FC<HomeHeroUnitsLargeProps> = ({
  homePage,
}) => {
  const { isLoggedIn } = useSystemContext()

  const heroUnits = [
    ...(isLoggedIn ? [] : [LOGGED_OUT_HERO_UNIT]),
    ...compact(homePage.heroUnits),
  ]

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

  const handleNext = useCallback(() => {
    onNext()
    stopAutoPlay()
  }, [onNext])

  const handlePrev = useCallback(() => {
    onPrev()
    stopAutoPlay()
  }, [onPrev])

  const handleClick = (index: number) => {
    setCursor(index)
    stopAutoPlay()
  }

  const { containerRef } = useNextPrevious({
    onNext: handleNext,
    onPrevious: handlePrev,
  })

  if (!homePage.heroUnits) return null

  return (
    <div ref={containerRef as any}>
      <FullBleed>
        <HomeCarousel initialIndex={index}>
          {heroUnits.map((heroUnit, i) => {
            return (
              <HomeHeroUnitFragmentContainer
                key={i}
                index={i}
                heroUnit={heroUnit}
                layout={i % 2 === 0 ? "b" : "a"}
                bg={!isLoggedIn && i === 0 ? "black100" : "black5"}
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
    </div>
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
