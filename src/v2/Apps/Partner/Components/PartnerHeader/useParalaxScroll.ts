import { useEffect, useRef } from "react"

export function useParallaxScroll<T>(
  updateElement: (element: T, currentPosition: number) => void
) {
  const ref = useRef<T>(null)
  const lastPosition = useRef(0)
  const frame = useRef<number>(null)

  useEffect(() => {
    handleFrame()

    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current)
      }
    }
  }, [])

  const handleFrame = () => {
    const currentPosition = window.scrollY

    if (lastPosition.current === currentPosition || !ref.current) {
      frame.current = window.requestAnimationFrame(handleFrame)

      return
    }

    lastPosition.current = currentPosition

    updateElement(ref.current, currentPosition)

    frame.current = window.requestAnimationFrame(handleFrame)
  }

  return ref
}
