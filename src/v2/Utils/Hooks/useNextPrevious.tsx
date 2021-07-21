import { useRef, useEffect } from "react"

export interface UseNextPrevious {
  onNext(): void
  onPrevious(): void
}

/**
 * Binds left and right keyboard arrows to next/previous functions if the element
 * with `containerRef` if anything within it is in focus.
 */
export const useNextPrevious = ({ onNext, onPrevious }: UseNextPrevious) => {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (!containerRef.current) return

      // Only triggers keyboard navigation if component is in focus
      if (!containerRef.current.contains(document.activeElement)) {
        return
      }

      switch (key) {
        case "ArrowRight":
          onNext()
          break
        case "ArrowLeft":
          onPrevious()
          break
        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [containerRef, onNext, onPrevious])

  return { containerRef }
}
