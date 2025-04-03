import { getViewportDimensions } from "Utils/viewport"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const debouncedResize = useDebouncedCallback(() => {
    const { width, height } = getViewportDimensions()
    setSize({ width, height })
  }, 100)

  useEffect(() => {
    window.addEventListener("resize", debouncedResize)
    debouncedResize()
    return () => window.removeEventListener("resize", debouncedResize)
  }, [debouncedResize])

  if (typeof window === "undefined") {
    return { width: 0, height: 0 }
  }

  return size
}
