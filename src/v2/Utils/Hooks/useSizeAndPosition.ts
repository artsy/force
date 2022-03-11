import { useIsomorphicLayoutEffect } from "@artsy/palette"
import { debounce } from "lodash"
import { useRef, useState } from "react"

interface Geometry {
  top: number
  left: number
  width: number
  height: number
}

const DEFAULT_GEOMETRY: Geometry = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
}

interface UseSizeAndPosition {
  debounce?: number
}

/** Hook that returns the offset geometry of the ref. Updates on resize. */
export const useSizeAndPosition = (
  { debounce: debounceMs }: UseSizeAndPosition = { debounce: 0 }
) => {
  const ref = useRef<HTMLElement | null>(null)

  const [geometry, setGeometry] = useState<Geometry>(DEFAULT_GEOMETRY)

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const handleResize = () => {
      setTimeout(() => {
        if (!ref.current) return

        setGeometry({
          top: ref.current.offsetTop,
          left: ref.current.offsetLeft,
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        })
      }, 0)
    }

    handleResize()

    const handler = debounceMs
      ? debounce(handleResize, debounceMs)
      : handleResize

    window.addEventListener("resize", handler)

    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [ref])

  return { ref, ...geometry }
}
