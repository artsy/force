import { useEffect, MutableRefObject, useState } from "react"

export default function useOnScreen<T extends HTMLElement | null>(
  ref: MutableRefObject<T>
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    if (!ref || ref.current === null) return

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })

    observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref.current])

  return isIntersecting
}
