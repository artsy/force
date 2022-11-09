import { throttle } from "lodash"
import { useEffect, useMemo, useRef, useState } from "react"

interface UseDetectActivity {
  waitTime: number
}

/**
 * Detect when user is idle within a component
 */
export const useDetectActivity = (
  { waitTime }: UseDetectActivity = { waitTime: 2500 }
) => {
  const [isActive, setIsActive] = useState(true)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const detectActivity = useMemo(
    () =>
      throttle(() => {
        setIsActive(true)

        timeoutRef.current && clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setIsActive(false), waitTime)
      }, 500),
    [waitTime]
  )

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setIsActive(false), waitTime)

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [waitTime])

  return {
    detectActivity: detectActivity,
    isActive,
    // Spread on target element
    detectActivityProps: {
      onMouseMove: detectActivity,
      onWheel: detectActivity,
      onTouchStart: detectActivity,
      onTouchMove: detectActivity,
      onClick: detectActivity,
    },
  }
}
