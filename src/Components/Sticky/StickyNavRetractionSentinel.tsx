import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useEffect, useRef } from "react"
import { useSticky } from "./StickyProvider"

/**
 * An invisible sentinel component that triggers global nav retraction
 * when scrolled past. Place this at the point where you want retraction to begin.
 *
 * When the sentinel reaches the bottom edge of the global nav (scrolled past),
 * retraction activates. When it drops back below the nav, retraction deactivates.
 *
 * While retraction is active, the nav retracts/un-retracts based on scroll direction.
 */
export const StickyNavRetractionSentinel: React.FC = () => {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const { setGlobalNavRetraction } = useSticky()
  const { computedHeight } = useNavBarHeight()

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      return
    }

    // Use rootMargin to offset the intersection boundary to the bottom of the nav bar.
    // A negative top margin shrinks the root's bounding box, making the trigger line
    // effectively at the bottom of the nav rather than the top of the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is above the nav's bottom edge (scrolled past), activate retraction
        const isPastSentinel =
          !entry.isIntersecting && entry.boundingClientRect.top < computedHeight
        setGlobalNavRetraction(isPastSentinel)
      },
      {
        threshold: 0,
        rootMargin: `-${computedHeight}px 0px 0px 0px`,
      },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      setGlobalNavRetraction(false)
    }
  }, [setGlobalNavRetraction, computedHeight])

  return <div ref={sentinelRef} aria-hidden="true" />
}
