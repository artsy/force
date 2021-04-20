import React, { useCallback, useState } from "react"
import { FullBleed } from "../FullBleed"

import {
  Box,
  Swiper,
  SwiperProps,
  CarouselBar,
  splitBoxProps,
  SwiperRail,
} from "@artsy/palette"

interface SwiperWithProgressProps extends SwiperProps {
  verticalAlign?: "top" | "bottom"
}

export const SwiperWithProgress: React.FC<SwiperWithProgressProps> = ({
  children,
  verticalAlign = "bottom",
  ...rest
}) => {
  const count = React.Children.count(children)
  const [boxProps, swiperProps] = splitBoxProps(rest)
  const [index, setIndex] = useState(0)
  const progress = (index * 100) / (count - 1)

  const Rail = useCallback(
    props => {
      return (
        <SwiperRail
          {...props}
          alignItems={verticalAlign === "top" ? "flex-start" : "flex-end"}
          px={4}
          mx={4}
        />
      )
    },
    [verticalAlign]
  )

  return (
    <Box {...boxProps}>
      <FullBleed>
        <Swiper onChange={setIndex} mb={6} Rail={Rail} {...swiperProps}>
          {React.Children.map(children, (child: any, i) => {
            return (
              <Box
                ml={i === 0 ? [2, 4] : undefined}
                mr={i === count - 1 ? [2, 4] : undefined}
              >
                {child}
              </Box>
            )
          })}
        </Swiper>
      </FullBleed>

      <CarouselBar percentComplete={progress} />
    </Box>
  )
}
