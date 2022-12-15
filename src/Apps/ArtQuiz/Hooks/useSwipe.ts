import { useEffect } from "react"

interface UseSwipe {
  onLeft: () => void
  onRight: () => void
  /** Distance in pixels to trigger swipe */
  distance?: number
}

export const useSwipe = ({ onLeft, onRight, distance = 50 }: UseSwipe) => {
  useEffect(() => {
    let startX = 0
    let endX = 0
    let numberOfFingers = 0

    const handleTouchStart = (event: TouchEvent) => {
      numberOfFingers = event.touches.length
      startX = event.changedTouches[0].clientX
    }

    const handleTouchEnd = (event: TouchEvent) => {
      endX = event.changedTouches[0].clientX

      // Ignore multi-touch
      if (numberOfFingers !== 1) return

      if (endX < startX && startX - endX > distance) {
        onLeft()
        return
      }

      if (endX > startX && endX - startX > distance) {
        onRight()
        return
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [distance, onLeft, onRight])
}
