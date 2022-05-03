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
 * Returns a `scrollTo` function that offsets based on the nav and the current
 * state of the sticky component.
 */
export const useScrollTo = ({
  behavior,
  offset = 0,
}: Omit<UseScrollTo, "selectorOrRef"> = {}) => {
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const { mobile, desktop } = useNavBarHeight()
  const { offsetTop } = useSticky()

  const scrollTo = (elOrSelector: HTMLElement | string | null) => {
    const el =
      typeof elOrSelector === "string"
        ? document.querySelector(elOrSelector)
        : elOrSelector

    if (!el) return null

    const { top } = el.getBoundingClientRect()

    const position =
      top +
      window.scrollY -
      ((isMobile ? mobile : desktop) + offsetTop + offset)

    window.scrollTo({ top: position, behavior })
  }

  return { scrollTo, isReadyForUse: isMobile !== null }
}

/**
 * Accepts a DOM selector string or a ref to an element, along with some options,
 * and returns a `scrollTo` function that offsets based on the nav and the current
 * state of the sticky component.
 */
export const useScrollToElement = ({
  behavior,
  offset = 0,
  selectorOrRef,
}: UseScrollTo) => {
  const { scrollTo: _scrollTo, ...rest } = useScrollTo({ behavior, offset })

  const scrollTo = () => {
    _scrollTo(
      typeof selectorOrRef === "string" ? selectorOrRef : selectorOrRef.current
    )
  }

  return { scrollTo, ...rest }
}
