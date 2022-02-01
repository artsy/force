import * as React from "react"
import { Media } from "v2/Utils/Responsive"
import { DesktopCarousel } from "./DesktopCarousel"
import { ResponsiveValue } from "styled-system"
import { MobileCarousel } from "./MobileCarousel"

export interface CarouselProps {
  children: JSX.Element | JSX.Element[]
  onRailOverflowChange?: (value: boolean) => void
  itemsPerViewport?: ResponsiveValue<number>
}

export const Carousel: React.FC<CarouselProps> = ({ children, ...rest }) => {
  return (
    <>
      <Media greaterThan="xs">
        <DesktopCarousel {...rest}>{children}</DesktopCarousel>
      </Media>
      <Media at="xs">
        <MobileCarousel {...rest}>{children}</MobileCarousel>
      </Media>
    </>
  )
}
