import { useIsomorphicLayoutEffect, useMutationObserver } from "@artsy/palette"
import { debounce } from "lodash"
import { useCallback, useRef, useState } from "react"

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
  trackMutation?: boolean
  trackResize?: boolean
}

/**
 * Hook that returns the offset geometry of the ref.
 * Updates on resize by default.
 * Updates on mutation optionally.
 **/
export const useSizeAndPosition = ({
  debounce: debounceMs = 0,
  trackMutation = false,
  trackResize = true,
}: UseSizeAndPosition = {}) => {
  const ref = useRef<HTMLElement | null>(null)

  const [geometry, setGeometry] = useState<Geometry>(DEFAULT_GEOMETRY)

  const handleUpdate = useCallback(() => {
    if (!ref.current) return

    setGeometry({
      top: ref.current.offsetTop,
      left: ref.current.offsetLeft,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })
  }, [])

  const handler = debounceMs ? debounce(handleUpdate, debounceMs) : handleUpdate

  useMutationObserver({
    ref,
    onMutate: mutations => {
      if (!trackMutation) return

      mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
          handler()
        }
      })
    },
  })

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    setTimeout(handleUpdate, 0)

    const handleResize = () => {
      if (!trackResize) return
      handler()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref])

  return { ref, ...geometry }
}
