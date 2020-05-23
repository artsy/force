import React, { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCarousel_artwork } from "v2/__generated__/ViewingRoomCarousel_artwork.graphql"
import { Carousel } from "v2/Components/Carousel"
import { flowRight } from "lodash"

import {
  Box,
  ChevronIcon,
  Flex,
  Image,
  ProgressBar,
  breakpoints,
} from "@artsy/palette"

interface ViewingRoomCarouselProps {
  artwork: ViewingRoomCarousel_artwork
}

const ViewingRoomCarousel: React.FC<ViewingRoomCarouselProps> = ({
  artwork: { images },
}) => {
  const computeScrollPercent = selectedIndex =>
    ((selectedIndex + 1) / images.length) * 100
  const [scrollPercent, setScrollPercent] = useState(computeScrollPercent(0))
  const update = flowRight(setScrollPercent, computeScrollPercent)
  const showProgressBar = images.length > 1

  const CarouselHeight = [350, 550]

  return (
    <Box width="100%">
      <Flex
        height={CarouselHeight}
        maxWidth={breakpoints.lg}
        m="auto"
        my={2}
        position="relative"
        justifyContent="center"
      >
        <Carousel
          options={{
            cellAlign: "center",
            draggable: showProgressBar,
            freeScroll: true,
            groupCells: 1,
            pageDots: false,
          }}
          data={images}
          height={CarouselHeight}
          onDragEnd={({ flickity }) => update(flickity.selectedIndex)}
          render={({ resized: { url, width, height }, internalID }) => {
            return (
              <Box key={internalID} width="auto" height={CarouselHeight}>
                <Image src={url} width="auto" height={CarouselHeight} />
              </Box>
            )
          }}
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
            const opacity = currentSlideIndex === images.length - 1 ? 0 : 1
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

export const ViewingRoomCarouselFragmentContainer = createFragmentContainer(
  ViewingRoomCarousel,
  {
    artwork: graphql`
      fragment ViewingRoomCarousel_artwork on Artwork {
        images {
          internalID
          resized(height: 550) {
            url
            width
            height
          }
        }
      }
    `,
  }
)

const Arrow: React.FC<{
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
