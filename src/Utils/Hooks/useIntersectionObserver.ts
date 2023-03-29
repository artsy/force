import { useEffect, useState, RefObject, useRef } from "react"

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

export const useIntersectionObserver = ({
  once = true,
  options = { threshold: 0 },
  onIntersection,
  onOffIntersection,
}: UseIntersectionObserverProperties) => {
  const ref = useRef<HTMLElement | null>(null)

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!observer) return

    if (once) {
      const hasIntersected = entries.some(
        ({ isIntersecting }) => isIntersecting
      )

      if (hasIntersected) {
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
      : undefined
  )

  useEffect(() => {
    if (!ref.current || !observer) return

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return { ref }
}

const isClientSide = typeof window !== "undefined"
