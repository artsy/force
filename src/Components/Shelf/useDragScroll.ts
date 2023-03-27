import { useEffect, useRef } from "react"

interface UseDragScroll {
  viewport?: HTMLElement | null
  thumbRef?: React.MutableRefObject<HTMLElement | null>
  scrollWidth: number
  trackWidth: number
  scrollLeft: number
  clientWidth: number
}

export const useDragScroll = ({
  viewport,
  thumbRef,
  scrollWidth,
  trackWidth,
  scrollLeft,
  clientWidth,
}: UseDragScroll) => {
  const isDown = useRef(false)
  const startX = useRef(0)
  const offsetX = useRef(0)

  useEffect(() => {
    if (!viewport || !thumbRef?.current) return

    const { current: thumb } = thumbRef

    const handleMouseDown = (event: MouseEvent) => {
      event.stopPropagation()
      isDown.current = true
      startX.current = event.pageX
      offsetX.current = viewport.scrollLeft
    }

    const handleMouseUp = () => {
      isDown.current = false
      startX.current = 0
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDown.current) return
      const delta = ((event.pageX - startX.current) * scrollWidth) / trackWidth
      viewport.scrollLeft = offsetX.current + delta
    }

    thumb.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      thumb.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [viewport, clientWidth, scrollWidth, scrollLeft, trackWidth, thumbRef])
}
