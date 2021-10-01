import { themeProps } from "@artsy/palette-tokens"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { useSticky } from "v2/Components/Sticky"
import { __internal__useMatchMedia } from "./useMatchMedia"

interface UseScrollTo {
  behavior?: ScrollBehavior
  offset?: number
  selectorOrRef: string | React.RefObject<HTMLElement | null>
}

/**
 * Accepts a DOM selector string or a ref to an element, along with some options,
 * and returns a `scrollTo` function that offsets based on the nav and the current
 * state of the sticky component.
 */
export const useScrollTo = ({
  behavior,
  offset = 0,
  selectorOrRef,
}: UseScrollTo) => {
  const el =
    typeof selectorOrRef === "string"
      ? document.querySelector(selectorOrRef)
      : selectorOrRef.current

  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const { mobile, desktop } = useNavBarHeight()
  const { offsetTop } = useSticky()

  const scrollTo = () => {
    if (!el) return

    const { top } = el.getBoundingClientRect()

    const position =
      top +
      window.scrollY -
      ((isMobile ? mobile : desktop) + offsetTop + offset)

    window.scrollTo({ top: position, behavior })
  }

  return { scrollTo }
}
