import { useEffect, useState } from "react"

export type ScrollDirection = "up" | "down"

export const useScrollDirection = ({
  enabled = true,
  initialDirection = "down",
}: {
  enabled?: boolean
  initialDirection?: ScrollDirection
} = {}) => {
  const [direction, setDirection] = useState<ScrollDirection>(initialDirection)

  useEffect(() => {
    if (!enabled) return
    if (typeof window === "undefined") return

    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const nextScrollY = window.scrollY
        const nextDirection: ScrollDirection =
          nextScrollY > lastScrollY ? "down" : "up"

        lastScrollY = nextScrollY

        setDirection(prev => {
          if (prev === nextDirection) return prev
          return nextDirection
        })

        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [enabled])

  return {
    direction,
    isScrollingDown: direction === "down",
  }
}
