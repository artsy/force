import { useState, useEffect } from "react"

export const useTabVisible = () => {
  const [isVisible, setVisibilityChanged] = useState(true)

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setVisibilityChanged(false)
      } else {
        setVisibilityChanged(true)
      }
    }

    window.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return isVisible
}
