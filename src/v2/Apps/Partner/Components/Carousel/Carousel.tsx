import React from "react"
import { Media } from "v2/Utils/Responsive"
import { Swiper } from "@artsy/palette"
import { DesktopCarousel } from "./DesktopCarousel"

export interface CarouselProps {
  children: (itemsPerViewport: number) => JSX.Element | JSX.Element[]
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return (
    <>
      <Media greaterThan="md">
        <DesktopCarousel itemsPerViewport={4}>{children(4)}</DesktopCarousel>
      </Media>
      <Media at="md">
        <DesktopCarousel itemsPerViewport={3}>{children(3)}</DesktopCarousel>
      </Media>
      <Media at="sm">
        <DesktopCarousel itemsPerViewport={2}>{children(2)}</DesktopCarousel>
      </Media>
      <Media at="xs">
        <Swiper>{children(2)}</Swiper>
      </Media>
    </>
  )
}
