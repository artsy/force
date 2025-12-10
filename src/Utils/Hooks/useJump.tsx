import { THEME } from "@artsy/palette-tokens"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { getOffsetTopForSticky, useSticky } from "Components/Sticky"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { scrollToAwaitable } from "Utils/scrollToAwaitable"
import { type FC, useCallback, useEffect } from "react"

interface UseJump {
  behavior?: ScrollBehavior
  offset?: number
}

const NAMESPACE = "JUMP"

/**
 * Returns a `jumpTo` function that scrolls with an automatically calculated offset
 * based on the nav and the current state of the sticky component.
 */
export const useJump = ({ behavior = "smooth", offset = 0 }: UseJump = {}) => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const { mobile, desktop } = useNavBarHeight()

  const { stickies, isGlobalNavRetracted } = useSticky()

  const jumpTo = useCallback(
    (
      id: string,
      options: {
        behavior?: ScrollBehavior
        offset?: number
        onComplete?: () => void
      } = {},
    ) => {
      const el = document.querySelector(`#${NAMESPACE}--${id}`)

      if (!el) {
        console.warn(`No element found for jumpTo: "${id}"`)
        return null
      }

      const offsetTop = getOffsetTopForSticky({ id, stickies }) ?? 0

      const { top } = el.getBoundingClientRect()

      const navHeight = isMobile ? mobile : desktop

      // Determine if we're scrolling up - the element is above the current scroll position
      const isScrollingUp = top < 0

      // When scrolling up and nav is retracted, the nav will expand back down during the scroll,
      // pushing content (including stickies) down by navHeight. We need to account for this
      // by adding extra offset to compensate for the movement.
      const retractionCompensation =
        isScrollingUp && isGlobalNavRetracted ? navHeight : 0

      const position =
        top +
        window.scrollY -
        (navHeight +
          offsetTop +
          retractionCompensation +
          (options.offset ?? offset))

      scrollToAwaitable({
        target: position,
        behavior: options.behavior ?? behavior,
        onComplete: options.onComplete,
      })
    },
    [
      behavior,
      desktop,
      isMobile,
      mobile,
      offset,
      stickies,
      isGlobalNavRetracted,
    ],
  )

  return { jumpTo }
}

interface JumpProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  id: string
  children?: React.ReactNode
}

/**
 * Jump should be used along with a Sticky stacking context in order to automatically
 * calculate the correct offset to compensate for stuck elements. The `id` is used
 * for both the DOM element ID (namespaced) as well as the Sticky context ID.
 */
export const Jump: FC<React.PropsWithChildren<JumpProps>> = ({
  id,
  ...rest
}) => {
  const { registerSticky, deregisterSticky } = useSticky({ id })

  useEffect(() => {
    // Always register a 0px height to ensure we skip jump elements in
    // the offset calculation.
    registerSticky(0)

    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  return <div id={`${NAMESPACE}--${id}`} {...rest} />
}
