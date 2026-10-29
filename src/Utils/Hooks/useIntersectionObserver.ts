import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

interface UseIntersectionObserverProperties {
  ref?: RefObject<Element> | null
  once?: boolean
  options?: {
    threshold: number | number[]
    root?: Element
    rootMargin?: string
  }
  onIntersection?: (entries: IntersectionObserverEntry[]) => void
  onOffIntersection?: (entries: IntersectionObserverEntry[]) => void
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>({
  once = true,
  options = { threshold: 0 },
  onIntersection,
  onOffIntersection,
}: UseIntersectionObserverProperties) => {
  const nodeRef = useRef<T | null>(null)
  const hasIntersectedRef = useRef(false)

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!observer) return

    if (once) {
      const hasIntersected = entries.some(
        ({ isIntersecting }) => isIntersecting,
      )

      if (hasIntersected) {
        hasIntersectedRef.current = true
        onIntersection?.(entries)
        observer.disconnect()
      } else {
        onOffIntersection?.(entries)
      }

      return
    }

    const isIntersecting = entries[entries.length - 1].isIntersecting

    if (!isIntersecting) {
      onOffIntersection?.(entries)
      return
    }

    onIntersection?.(entries)
  }

  const [observer] = useState(() =>
    isClientSide
      ? new IntersectionObserver(handleIntersect, options)
      : undefined,
  )

  // A callback ref, rather than observing `ref.current` once on mount, so the
  // node that's actually in the DOM is observed even when it attaches after
  // mount or gets replaced (e.g. a wrapper above it changes type).
  const ref = useCallback(
    (node: T | null) => {
      if (!observer) return

      if (nodeRef.current) {
        observer.unobserve(nodeRef.current)
      }

      nodeRef.current = node

      if (!node || (once && hasIntersectedRef.current)) return

      observer.observe(node)
    },
    [observer, once],
  )

  useEffect(() => {
    return () => {
      observer?.disconnect()
    }
  }, [observer])

  return { ref }
}

const isClientSide = typeof window !== "undefined"
