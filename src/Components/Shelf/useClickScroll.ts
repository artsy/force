import { useEffect } from "react"

interface UseClickScroll {
  trackRef?: React.MutableRefObject<HTMLElement | null>
  thumbRef?: React.MutableRefObject<HTMLElement | null>
  viewport?: HTMLElement | null
  scrollWidth: number
  trackWidth: number
}

export const useClickScroll = ({
  trackRef,
  thumbRef,
  viewport,
  scrollWidth,
  trackWidth,
}: UseClickScroll) => {
  useEffect(() => {
    if (!viewport || !trackRef?.current || !thumbRef?.current) return

    const { current: thumb } = thumbRef
    const { current: track } = trackRef

    const handleMouseDown = (event: MouseEvent) => {
      const x =
        // Where you clicked
        event.pageX -
        // Offset by where the track sits on the page
        track.getBoundingClientRect().left -
        // Then center the thumb
        thumb.clientWidth / 2

      viewport.scrollLeft = (x * scrollWidth) / trackWidth
    }

    track.addEventListener("mousedown", handleMouseDown)

    return () => {
      track.removeEventListener("mousedown", handleMouseDown)
    }
  }, [scrollWidth, thumbRef, trackRef, trackWidth, viewport])
}
