import { Media } from "v2/Utils/Responsive"
import { FC, ReactNode } from "react"
import { HeroCarouselLarge } from "./HeroCarouselLarge"
import { HeroCarouselSmall } from "./HeroCarouselSmall"

export interface HeroCarouselProps {
  children: ReactNode
  /** Only utilizes full-bleed at desktop sizes */
  fullBleed?: boolean
}

export const HeroCarousel: FC<HeroCarouselProps> = ({
  children,
  fullBleed = true,
}) => {
  return (
    <>
      <Media at="xs">
        <HeroCarouselSmall>{children}</HeroCarouselSmall>
      </Media>

      <Media greaterThan="xs">
        <HeroCarouselLarge fullBleed={fullBleed}>{children}</HeroCarouselLarge>
      </Media>
    </>
  )
}
