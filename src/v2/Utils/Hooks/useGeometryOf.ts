import { useIsomorphicLayoutEffect } from "@artsy/palette"
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

/** Hook that returns the offset geometry of the ref. Updates on resize. */
export const useGeometryOf = () => {
  const ref = useRef<HTMLElement | null>(null)

  const [geometry, setGeometry] = useState<Geometry>(DEFAULT_GEOMETRY)

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const handleResize = () => {
      if (!ref.current) return

      setGeometry({
        top: ref.current.offsetTop,
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref])

  return { ref, geometry }
}
