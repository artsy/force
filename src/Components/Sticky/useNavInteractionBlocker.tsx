import { Box } from "@artsy/palette"
import { NAV_BAR_TRANSITION_DURATION } from "Apps/Components/Layouts/Components/LayoutNav"
import { Z } from "Apps/Components/constants"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useSticky } from "Components/Sticky/StickyProvider"
import {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

const HOVER_ACTIVATION_DELAY = 500 // ms before blocking activates on hover
const DEACTIVATION_DELAY = 700 // ms after leaving before deactivating
const CLICK_BLOCK_DURATION = 1200 // ms to keep blocking after a click

interface UseNavInteractionBlockerOptions {
  /** Whether the blocker functionality is enabled */
  enabled?: boolean
}

interface UseNavInteractionBlockerResult {
  /** Props to spread on the nav container */
  containerProps: {
    onMouseEnter: MouseEventHandler
    onMouseLeave: MouseEventHandler
    onClick: MouseEventHandler
  }
  /** The blocker component to render (uses portal) */
  NavBlocker: React.FC
}

/**
 * Hook to block interactions with the global nav while interacting with a sub-nav.
 *
 * Problem: When a sticky sub-nav causes the global nav to retract/change position,
 * this can trigger erroneous hover events on the global nav, causing dropdowns
 * to overlay and interfere with the sub-nav.
 *
 * Solution: After a brief hover or on click, render an invisible blocking overlay
 * that covers the global nav area and prevents pointer events from reaching it.
 */
export const useNavInteractionBlocker = ({
  enabled = true,
}: UseNavInteractionBlockerOptions = {}): UseNavInteractionBlockerResult => {
  const [isBlocking, setIsBlocking] = useState(false)

  const isHoveringRef = useRef(false)

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const deactivationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAllTimers = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    if (deactivationTimerRef.current) {
      clearTimeout(deactivationTimerRef.current)
      deactivationTimerRef.current = null
    }

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
      clickTimerRef.current = null
    }
  }, [])

  const handleMouseEnter: MouseEventHandler = useCallback(() => {
    if (!enabled) return

    isHoveringRef.current = true

    // Clear any pending deactivation
    if (deactivationTimerRef.current) {
      clearTimeout(deactivationTimerRef.current)
      deactivationTimerRef.current = null
    }

    // Start activation timer if not already blocking
    if (!hoverTimerRef.current) {
      hoverTimerRef.current = setTimeout(() => {
        setIsBlocking(true)
        hoverTimerRef.current = null
      }, HOVER_ACTIVATION_DELAY)
    }
  }, [enabled])

  const handleMouseLeave: MouseEventHandler = useCallback(() => {
    if (!enabled) return

    isHoveringRef.current = false

    // Clear pending activation
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    // Start deactivation timer (unless a click timer is active)
    if (!clickTimerRef.current) {
      deactivationTimerRef.current = setTimeout(() => {
        setIsBlocking(false)
        deactivationTimerRef.current = null
      }, DEACTIVATION_DELAY)
    }
  }, [enabled])

  const handleClick: MouseEventHandler = useCallback(() => {
    if (!enabled) return

    // Immediately activate blocking
    setIsBlocking(true)

    // Clear any existing click timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
    }

    // Keep blocking for a duration after click
    clickTimerRef.current = setTimeout(() => {
      // Only deactivate if we've also left the area
      if (!isHoveringRef.current) {
        setIsBlocking(false)
      }
      clickTimerRef.current = null
    }, CLICK_BLOCK_DURATION)
  }, [enabled])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  const NavBlocker: React.FC = useCallback(() => {
    if (!isBlocking || typeof document === "undefined") {
      return null
    }

    return createPortal(<NavBlockerOverlay />, document.body)
  }, [isBlocking])

  return {
    containerProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
    NavBlocker,
  }
}

/**
 * Invisible overlay that blocks pointer events to the global nav area.
 * Transforms along with the global nav when it retracts.
 */
const NavBlockerOverlay: React.FC = () => {
  const { computedHeight } = useNavBarHeight()
  const { isGlobalNavRetracted } = useSticky()

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      height={computedHeight}
      // Z-index just above global nav but below dropdowns
      zIndex={Z.globalNav + 1}
      style={{
        pointerEvents: "all",
        // Transform along with global nav when retracted
        transform: isGlobalNavRetracted
          ? `translate3d(0, -${computedHeight}px, 0)`
          : "translate3d(0, 0, 0)",
        transition: `transform ${NAV_BAR_TRANSITION_DURATION}`,
      }}
      aria-hidden="true"
    />
  )
}
