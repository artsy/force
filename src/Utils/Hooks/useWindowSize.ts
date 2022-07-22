import { useEffect, useState } from "react"
import { getViewportDimensions } from "Utils/viewport"

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function resize() {
      const { width, height } = getViewportDimensions()

      setSize({ width, height })
    }
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  if (typeof window === "undefined") {
    return { width: 0, height: 0 }
  }

  return size
}
