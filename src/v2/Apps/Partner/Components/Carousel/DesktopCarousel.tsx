import { useRef } from "react"
import * as React from "react"
import {
  Carousel,
  CarouselCell,
  CarouselCellProps,
  CarouselRail,
} from "@artsy/palette"
import { ResponsiveValue, system } from "styled-system"
import styled from "styled-components"
import { CarouselProps } from "./Carousel"
import { useRailOverflow } from "./useRailOverflow"

export interface DesktopCarouselCellProps extends CarouselCellProps {
  itemsPerViewport?: ResponsiveValue<number>
}

const carouselCellFlexBasis = system({
  itemsPerViewport: {
    property: "flexBasis",
    transform: n => `calc((100% - ${n - 1} * 20px) / ${n})`,
  },
})

const DesktopCarouselCell = styled(CarouselCell)<DesktopCarouselCellProps>`
  box-sizing: initial;
  ${props =>
    props.itemsPerViewport && {
      ...carouselCellFlexBasis(props),
    }};
`

export const DesktopCarousel: React.FC<CarouselProps> = ({
  children,
  itemsPerViewport,
  onRailOverflowChange,
  ...rest
}) => {
  const railRef = useRef<HTMLDivElement | null>(null)

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  useRailOverflow(railRef, showMore => {
    onRailOverflowChange && onRailOverflowChange(showMore)
  })

  return (
    <Carousel
      Rail={props => <CarouselRail ref={railRef as any} {...props} />}
      Cell={React.forwardRef((props, ref) => {
        return (
          <DesktopCarouselCell
            display="inline-flex"
            flexGrow={0}
            flexShrink={0}
            itemsPerViewport={itemsPerViewport}
            {...props}
            ref={ref as any}
          />
        )
      })}
      {...rest}
    >
      {children}
    </Carousel>
  )
}
