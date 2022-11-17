import { Media } from "Utils/Responsive"
import { FC, ReactNode } from "react"
import { HeroCarouselLarge } from "./HeroCarouselLarge"
import { HeroCarouselSmall } from "./HeroCarouselSmall"

export interface HeroCarouselProps {
  children: ReactNode
  /** Only utilizes full-bleed at desktop sizes */
  fullBleed?: boolean
  onChange?: (index) => void
}

export const HeroCarousel: FC<HeroCarouselProps> = ({
  children,
  fullBleed = true,
  onChange,
}) => {
  return (
    <>
      <Media at="xs">
        <HeroCarouselSmall onChange={onChange}>{children}</HeroCarouselSmall>
      </Media>

      <Media greaterThan="xs">
        <HeroCarouselLarge onChange={onChange} fullBleed={fullBleed}>
          {children}
        </HeroCarouselLarge>
      </Media>
    </>
  )
}
