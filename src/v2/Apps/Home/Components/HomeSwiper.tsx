import React from "react"
import {
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperProps,
  SwiperRail,
  SwiperRailProps,
} from "@artsy/palette"

interface HomeSwiperProps extends SwiperProps {}

export const HomeSwiper: React.FC<HomeSwiperProps> = props => {
  return (
    <Swiper
      bg="black5"
      borderRadius={3}
      snap="center"
      Cell={Cell}
      Rail={Rail}
      {...props}
    />
  )
}

const Cell: React.ForwardRefExoticComponent<SwiperCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
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

const Rail: React.FC<SwiperRailProps> = props => {
  return <SwiperRail {...props} display="block" />
}
