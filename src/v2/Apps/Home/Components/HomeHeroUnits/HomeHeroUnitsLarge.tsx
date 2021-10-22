import { Children } from "react";
import * as React from "react";
import {
  Box,
  Flex,
  ProgressDots,
  Spacer,
  FullBleed,
  ShelfNext,
  ShelfPrevious,
} from "@artsy/palette"
import { useCursor } from "use-cursor"
import { useRef, useEffect } from "react"
import { HomeCarousel } from "../HomeCarousel"
import { useCallback } from "react"
import { useNextPrevious } from "v2/Utils/Hooks/useNextPrevious"

export const HomeHeroUnitsLarge: React.FC = ({ children }) => {
  const length = Children.count(children)

  const {
    index,
    handleNext: onNext,
    handlePrev: onPrev,
    setCursor,
  } = useCursor({ max: length })

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

  if (!children) return null

  return (
    <div ref={containerRef as any}>
      <FullBleed>
        <HomeCarousel initialIndex={index}>{children}</HomeCarousel>
      </FullBleed>

      <Spacer my={2} />

      <Flex alignItems="center">
        <Box flex={1}>
          <ProgressDots
            variant="dash"
            amount={length}
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
