import { Box, THEME } from "@artsy/palette"
import { NAV_BAR_TRANSITION_DURATION } from "Apps/Components/Layouts/Components/LayoutNav"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type { ScrollDirection } from "Utils/Hooks/useScrollDirection"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import ReactSticky, { type Props as ReactStickyProps } from "react-stickynode"
import { useSticky } from "./StickyProvider"

type StickyStateContextValue = {
  stuck: boolean
  scrollDirection: ScrollDirection
}

const StickyStateContext = createContext<StickyStateContextValue | null>(null)

export const useStickyState = (): StickyStateContextValue => {
  const context = useContext(StickyStateContext)
  if (!context) {
    throw new Error("useStickyState must be used within a Sticky component")
  }

  return context
}

/**
 * Wrap a component to have it stick below the main nav.
 * Use render props `{({ stuck, scrollDirection }) => {}` to swap styles,
 * or use the `useStickyState()` hook from within children components.
 * See the stories for examples.
 *
 * FAQ:
 * - Q: Why can't I simply use `position: sticky`?
 * - A: We use `overflow-x: hidden` on the main layout container so that we can
 *      utilize the `FullBleed` component. When you set `overflow: hidden` on
 *      any ancestor of your sticky element, this element becomes the scrolling
 *      container for your sticky element.
 *
 *      See: https://github.com/w3c/csswg-drafts/issues/865 for more detail.
 *      TLDR: `overflow: clip` solves this and support is growing.
 *
 * - Q: How do I unstick an element once it reaches the end of its parent container?
 * - A: Just specify offset from the top of document using bottomBoundary prop and
 *      an element will be unsticked when the bottom of the element reaches at.
 *      If a selector to a target is specified (for example, bottomBoundary="#footer"),
 *      the offset will be the bottom of the target
 */
export const Sticky = ({
  children,
  bottomBoundary,
  withoutHeaderOffset,
  id,
  retractGlobalNav = false,
}: Pick<ReactStickyProps, "bottomBoundary"> & {
  id?: string
  // TODO: Remove this prop!
  withoutHeaderOffset?: boolean
  retractGlobalNav?: boolean
  children:
    | ReactNode
    | (({
        stuck,
        scrollDirection,
      }: {
        stuck: boolean
        scrollDirection: ScrollDirection
      }) => ReactNode)
}) => {
  const {
    id: stickyId,
    stickies,
    registerSticky,
    deregisterSticky,
    updateSticky,
    isGlobalNavRetracted,
    setGlobalNavRetraction,
    scrollDirection,
  } = useSticky({ id })

  const { desktop, mobile } = useNavBarHeight()

  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const [stuck, setStuck] = useState(false)

  // Track previous retraction state for smooth transitions
  const prevRetractedRef = useRef(isGlobalNavRetracted)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const headerOffset = withoutHeaderOffset ? 0 : isMobile ? mobile : desktop

  // Find this sticky's index in the stickies array (DOM order)
  const myIndex = useMemo(() => {
    return stickies.findIndex(s => s.id === stickyId)
  }, [stickies, stickyId])

  // Compute the offset from FIXED stickies that appear BEFORE this one in the DOM.
  // Used for correct sticking point when nav is retracted.
  const offsetFromFixedAbove = useMemo(() => {
    if (myIndex === -1) return 0

    const fixedAbove = stickies
      .slice(0, myIndex)
      .filter(s => s.status === "FIXED")

    return fixedAbove.reduce((sum, s) => sum + s.height, 0)
  }, [stickies, myIndex])

  // Z-index: stickies higher in the DOM (lower index) should layer on top of
  // stickies lower in the DOM (higher index) for correct visual stacking
  const zIndex = myIndex === -1 ? 1 : Math.max(1, 10 - myIndex)

  // Calculate the effective top position for stacking multiple stickies.
  // offsetFromFixedAbove sums the heights of FIXED stickies above this one in the DOM,
  // giving us a stable value that doesn't change based on this sticky's own status.
  const effectiveTop =
    isGlobalNavRetracted && !retractGlobalNav
      ? offsetFromFixedAbove
      : headerOffset + offsetFromFixedAbove

  useEffect(() => {
    registerSticky(containerRef.current?.clientHeight)
    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  // When retraction state changes while stuck, animate the transition
  // by directly manipulating the DOM (since `top` changes instantly)
  useEffect(() => {
    const wasRetracted = prevRetractedRef.current
    prevRetractedRef.current = isGlobalNavRetracted

    // Only for non-retractGlobalNav stickies that are stuck
    if (!retractGlobalNav && stuck && containerRef.current) {
      const el = containerRef.current

      if (!wasRetracted && isGlobalNavRetracted) {
        // Just retracted - top moved up, animate from old position
        el.style.transition = "none"
        el.style.transform = `translate3d(0, ${headerOffset}px, 0)`
        void el.offsetHeight // Force reflow
        el.style.transition = `transform ${NAV_BAR_TRANSITION_DURATION}`
        el.style.transform = "translate3d(0, 0, 0)"
      } else if (wasRetracted && !isGlobalNavRetracted) {
        // Just un-retracted - top moved down, animate from old position
        el.style.transition = "none"
        el.style.transform = `translate3d(0, ${-headerOffset}px, 0)`
        void el.offsetHeight // Force reflow
        el.style.transition = `transform ${NAV_BAR_TRANSITION_DURATION}`
        el.style.transform = "translate3d(0, 0, 0)"
      }
    }
  }, [isGlobalNavRetracted, stuck, retractGlobalNav, headerOffset])

  useEffect(() => {
    return () => {
      if (!retractGlobalNav) return
      setGlobalNavRetraction(false)
    }
  }, [retractGlobalNav, setGlobalNavRetraction])

  return (
    <ReactSticky
      top={effectiveTop}
      bottomBoundary={bottomBoundary}
      onStateChange={state => {
        switch (state.status) {
          case ReactSticky.STATUS_FIXED: {
            setStuck(true)
            updateSticky({ status: "FIXED" })
            if (retractGlobalNav) {
              setGlobalNavRetraction(true)
            }
            break
          }
          case ReactSticky.STATUS_ORIGINAL: {
            setStuck(false)
            updateSticky({ status: "ORIGINAL" })
            if (retractGlobalNav) {
              setGlobalNavRetraction(false)
            }
            break
          }
          case ReactSticky.STATUS_RELEASED: {
            setStuck(false)
            updateSticky({ status: "RELEASED" })
            if (retractGlobalNav) {
              setGlobalNavRetraction(false)
            }
            break
          }
        }
      }}
      innerZ={zIndex}
    >
      <StickyStateContext.Provider value={{ stuck, scrollDirection }}>
        <Box
          ref={containerRef as any}
          style={
            retractGlobalNav
              ? {
                  // retractGlobalNav stickies: transform up when retracted
                  transform:
                    isGlobalNavRetracted && stuck
                      ? `translate3d(0, -${headerOffset}px, 0)`
                      : "translate3d(0, 0, 0)",
                  transition: `transform ${NAV_BAR_TRANSITION_DURATION}`,
                }
              : {
                  // Other stickies: transitions handled via DOM manipulation in useEffect
                  // Don't set transform here to avoid React overwriting the animated value
                }
          }
        >
          {typeof children === "function"
            ? children({ stuck, scrollDirection })
            : children}
        </Box>
      </StickyStateContext.Provider>
    </ReactSticky>
  )
}
