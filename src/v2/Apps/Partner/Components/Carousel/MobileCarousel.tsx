import { Children, useRef } from "react"
import * as React from "react"
import { Box, Swiper, SwiperRail } from "@artsy/palette"
import { CarouselProps } from "./Carousel"
import { useRailOverflow } from "./useRailOverflow"

const CAROUSEL_MARGIN_SIZE = 2

export const MobileCarousel: React.FC<CarouselProps> = ({
  children,
  onRailOverflowChange,
  ...rest
}) => {
  const cells = Children.toArray(children)
  const railRef = useRef<HTMLDivElement | null>(null)

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  useRailOverflow(railRef, showMore => {
    onRailOverflowChange && onRailOverflowChange(showMore)
  })

  return (
    <Swiper
      Rail={props => <SwiperRail ref={railRef as any} {...props} />}
      mx={-CAROUSEL_MARGIN_SIZE}
      {...rest}
    >
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
    </Swiper>
  )
}
