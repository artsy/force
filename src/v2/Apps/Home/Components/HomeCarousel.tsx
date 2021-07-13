import React from "react"
import {
  Carousel,
  CarouselCell,
  CarouselCellProps,
  CarouselProps,
  CarouselRail,
  CarouselRailProps,
} from "@artsy/palette"

interface HomeCarouselProps extends CarouselProps {}

export const HomeCarousel: React.FC<HomeCarouselProps> = props => {
  return (
    <Carousel
      Cell={Cell}
      Rail={Rail}
      Next={Disable}
      Previous={Disable}
      {...props}
    />
  )
}

const Cell: React.ForwardRefExoticComponent<CarouselCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <CarouselCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        width="100%"
        verticalAlign="top"
        pr={0}
      />
    )
  }
)

const Rail: React.FC<CarouselRailProps> = props => {
  return <CarouselRail {...props} display="block" />
}

const Disable: React.FC = () => {
  return <></>
}
