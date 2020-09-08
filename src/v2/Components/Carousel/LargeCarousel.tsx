import React from "react"
import {
  CarouselNext,
  CarouselPrevious,
  Carousel as PointerCarousel,
  Swiper as TouchCarousel,
} from "@artsy/palette"
import { isServer } from "lib/isServer"
import { CarouselProps } from "./Carousel"

const detectTouch = () =>
  !isServer && ("ontouchstart" in window || "onmsgesturechange" in window)

export const LargeCarousel: React.FC<CarouselProps> = ({
  children,
  arrowHeight,
  ...rest
}) => {
  const isTouch = detectTouch()

  return (
    <>
      {isTouch ? (
        <TouchCarousel {...rest}>{children}</TouchCarousel>
      ) : (
        <PointerCarousel
          {...rest}
          Next={props => <CarouselNext height={arrowHeight} {...props} />}
          Previous={props => (
            <CarouselPrevious height={arrowHeight} {...props} />
          )}
        >
          {children}
        </PointerCarousel>
      )}
    </>
  )
}
