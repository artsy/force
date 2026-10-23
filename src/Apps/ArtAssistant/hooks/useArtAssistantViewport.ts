import { useEffect, useRef } from "react"

export const useArtAssistantViewport = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return
    const update = (): void => {
      const element = ref.current
      if (!element) return
      const top = element.getBoundingClientRect().top
      element.style.height = `${Math.max(200, viewport.height + viewport.offsetTop - top)}px`
    }
    update()
    viewport.addEventListener("resize", update)
    viewport.addEventListener("scroll", update)
    window.addEventListener("resize", update)
    return () => {
      viewport.removeEventListener("resize", update)
      viewport.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])
  return ref
}
