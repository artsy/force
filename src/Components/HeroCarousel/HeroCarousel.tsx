import { Media } from "Utils/Responsive"
import { FC, ReactNode } from "react"
import { HeroCarouselLarge } from "./HeroCarouselLarge"
import { HeroCarouselSmall } from "./HeroCarouselSmall"

export interface HeroCarouselProps {
  children: ReactNode
  /** Only utilizes full-bleed at desktop sizes */
  fullBleed?: boolean
  progressbarVariant?: "dot" | "dash"
  onChange?: (index) => void
}

export const HeroCarousel: FC<HeroCarouselProps> = ({
  children,
  fullBleed = true,
  progressbarVariant,
  onChange,
}) => {
  return (
    <>
      <Media at="xs">
        <HeroCarouselSmall
          onChange={onChange}
          progressbarVariant={progressbarVariant}
        >
          {children}
        </HeroCarouselSmall>
      </Media>

      <Media greaterThan="xs">
        <HeroCarouselLarge
          onChange={onChange}
          fullBleed={fullBleed}
          progressbarVariant={progressbarVariant}
        >
          {children}
        </HeroCarouselLarge>
      </Media>
    </>
  )
}
