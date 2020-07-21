import React, { useState } from "react"
import { Carousel } from "v2/Components/Carousel"
import { flowRight } from "lodash"

import {
  Box,
  ChevronIcon,
  Flex,
  ProgressBar,
  breakpoints,
} from "@artsy/palette"

interface ViewingRoomCarouselProps {
  items: any
  itemRender: any
  height: any
  maxWidth?
  justifyCarousel?
}

export const ViewingRoomCarousel: React.FC<ViewingRoomCarouselProps> = ({
  items,
  itemRender,
  height,
  maxWidth,
  justifyCarousel,
}) => {
  const computeScrollPercent = selectedIndex =>
    ((selectedIndex + 1) / items.length) * 100
  const [scrollPercent, setScrollPercent] = useState(computeScrollPercent(0))
  const update = flowRight(setScrollPercent, computeScrollPercent)
  const showProgressBar = items.length > 1

  return (
    <Box width="100%">
      <Flex
        height={height}
        maxWidth={maxWidth ? maxWidth : breakpoints.lg}
        m="auto"
        my={2}
        position="relative"
        justifyContent={justifyCarousel ? justifyCarousel : "center"}
      >
        <Carousel
          options={{
            cellAlign: "center",
            draggable: showProgressBar,
            freeScroll: true,
            groupCells: 1,
            pageDots: false,
          }}
          data={items}
          height={height}
          onDragEnd={({ flickity }) => update(flickity.selectedIndex)}
          render={itemRender}
          renderLeftArrow={({ currentSlideIndex, flickity }) => {
            const opacity = currentSlideIndex === 0 ? 0 : 1
            return (
              <Arrow
                direction="left"
                opacity={opacity}
                onClick={() => {
                  flickity.previous()
                  update(flickity.selectedIndex)
                }}
              />
            )
          }}
          renderRightArrow={({ currentSlideIndex, flickity }) => {
            const opacity = currentSlideIndex === items.length - 1 ? 0 : 1
            return (
              <Arrow
                direction="right"
                opacity={opacity}
                onClick={() => {
                  flickity.next()
                  update(flickity.selectedIndex)
                }}
              />
            )
          }}
        />
      </Flex>

      {showProgressBar && (
        <Box maxWidth={["100%", 470]} mx={[2, "auto"]}>
          <ProgressBar
            highlight="black100"
            percentComplete={scrollPercent}
            transition="width .30s ease-out"
          />
        </Box>
      )}
    </Box>
  )
}

export const Arrow: React.FC<{
  direction: "left" | "right"
  onClick: () => void
  opacity: number
}> = ({ direction, onClick, opacity }) => {
  const position = { [direction]: 0 }

  return (
    <Flex
      alignItems="center"
      display={["none", "inherit"]}
      height="100%"
      justifyContent="center"
      onClick={() => onClick()}
      position="absolute"
      width={50}
      style={{
        transition: "opacity .2s ease-out",
        backgroundColor: "rgba(255,255,255,.95)",
        cursor: opacity ? "pointer" : "inherit",
        zIndex: 1,
        opacity,
        ...position,
      }}
    >
      <ChevronIcon direction={direction} />
    </Flex>
  )
}
