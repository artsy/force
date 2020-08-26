import React from "react"
import { BoxProps } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { SmallCarousel } from "./SmallCarousel"
import { LargeCarousel } from "./LargeCarousel"

export const CAROUSEL_MARGIN_SIZE = 2

export interface CarouselProps extends BoxProps {
  children: JSX.Element | JSX.Element[]
  arrowHeight?: number
  onChange?(index: number): void
}

/**
 * `Carousel` wraps up the `Carousel` and `Swiper` components from `@artsy/palette` into
 * a single surface. It makes some assumptions about the design and layout of the page.
 * Primarily: that the component is displayed at 100% width, and with the expectation
 * the page has a size `2` outer margin and `sm` breakpoints. Vertical margins and other
 * `BoxProps` can be mixed into the container at the call sites.
 *
 * @param arrowHeight arrows are vertically centered — passing an arrow height allows you
 * to center the arrows optically — for instance anchored around a thumbnail.
 */
export const Carousel: React.FC<CarouselProps> = props => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <LargeCarousel {...props} />
      </Media>

      <Media lessThan="sm">
        <SmallCarousel {...props} />
      </Media>
    </>
  )
}
