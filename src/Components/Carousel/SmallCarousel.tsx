import { Children } from "react"
import * as React from "react"
import { Box, Swiper as TouchCarousel } from "@artsy/palette"
import { CarouselProps, CAROUSEL_MARGIN_SIZE } from "./Carousel"

export const SmallCarousel: React.FC<CarouselProps> = ({
  children,
  arrowHeight,
  ...rest
}) => {
  const cells = Children.toArray(children)

  return (
    <TouchCarousel mx={-CAROUSEL_MARGIN_SIZE} {...rest}>
      {cells.map((child, i) => {
        // First cell
        if (i === 0) {
          return (
            <Box key={i} pl={CAROUSEL_MARGIN_SIZE}>
              {child}
            </Box>
          )
        }

        // Last cell
        if (i === cells.length - 1) {
          return (
            <Box key={i} pr={CAROUSEL_MARGIN_SIZE}>
              {child}
            </Box>
          )
        }

        return <React.Fragment key={i}>{child}</React.Fragment>
      })}
    </TouchCarousel>
  )
}
