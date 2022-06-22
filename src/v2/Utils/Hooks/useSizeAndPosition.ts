import { useIsomorphicLayoutEffect, useMutationObserver } from "@artsy/palette"
import { debounce } from "lodash"
import { MutableRefObject, useCallback, useRef, useState } from "react"

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
  targetRef?: MutableRefObject<HTMLElement | null>
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
  targetRef,
}: UseSizeAndPosition = {}) => {
  const ref = useRef<HTMLElement | null>(null)

  const [geometry, setGeometry] = useState<Geometry>(DEFAULT_GEOMETRY)

  const handleUpdate = useCallback(() => {
    const el = targetRef?.current || ref.current

    if (!el) return

    setGeometry({
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
    })
  }, [targetRef])

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
