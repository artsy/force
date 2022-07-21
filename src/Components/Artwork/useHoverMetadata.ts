import { useState } from "react"
import { isTouch } from "Utils/device"

export const useHoverMetadata = () => {
  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = () => {
    if (!isTouch) {
      setIsHovered(true)
    }
  }

  const onMouseLeave = () => {
    if (!isTouch) {
      setIsHovered(false)
    }
  }

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  }
}
