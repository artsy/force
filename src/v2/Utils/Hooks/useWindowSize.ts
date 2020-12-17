import { useEffect, useState } from "react"
import { getViewportDimensions } from "v2/Utils/viewport"

export const useWindowSize = () => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  useEffect(() => {
    function resize() {
      const { width, height } = getViewportDimensions()

      setSize({ height, width })
    }
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  if (typeof window === "undefined") {
    return { height: 0, width: 0 }
  }

  return size
}
