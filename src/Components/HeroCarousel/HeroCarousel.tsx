import { Media } from "Utils/Responsive"
import {
  Children,
  type FC,
  type ReactNode,
  isValidElement,
  useMemo,
} from "react"
import { HeroCarouselLarge } from "./HeroCarouselLarge"
import { HeroCarouselSmall } from "./HeroCarouselSmall"

export interface HeroCarouselProps {
  children: ReactNode
  /** Only utilizes full-bleed at desktop sizes */
  fullBleed?: boolean
  progressbarVariant?: "dot" | "dash"
  onChange?: (index) => void
}

export const HeroCarousel: FC<React.PropsWithChildren<HeroCarouselProps>> = ({
  children,
  fullBleed = true,
  progressbarVariant,
  onChange,
}) => {
  const cells = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  )

  return (
    <>
      <Media at="xs">
        <HeroCarouselSmall
          onChange={onChange}
          progressbarVariant={progressbarVariant}
        >
          {cells}
        </HeroCarouselSmall>
      </Media>

      <Media greaterThan="xs">
        <HeroCarouselLarge
          onChange={onChange}
          fullBleed={fullBleed}
          progressbarVariant={progressbarVariant}
        >
          {cells}
        </HeroCarouselLarge>
      </Media>
    </>
  )
}
