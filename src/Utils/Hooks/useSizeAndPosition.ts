import { useMutationObserver, useResizeObserver } from "@artsy/palette"
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

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
  trackMutation?: boolean
  targetRef?: MutableRefObject<HTMLElement | null>
}

/**
 * Hook that returns the offset geometry of the ref.
 * Updates on resize by default.
 * Updates on mutation optionally.
 **/
export const useSizeAndPosition = ({
  trackMutation = false,
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

  useMutationObserver({
    ref,
    onMutate: mutations => {
      if (!trackMutation) return

      mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
          handleUpdate()
        }
      })
    },
  })

  // Ensures that if the node is mounted after the hook is called,
  // we still update the geometry.
  useEffect(() => {
    if (typeof MutationObserver === "undefined") {
      requestAnimationFrame(handleUpdate)
      return
    }

    const observer = new MutationObserver((_, self) => {
      handleUpdate()
      self.disconnect()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [handleUpdate])

  useResizeObserver({
    target: ref,
    onResize: handleUpdate,
  })

  return { ref, ...geometry }
}
