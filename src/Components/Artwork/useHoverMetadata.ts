import { isTouch } from "Utils/device"
import { useState } from "react"

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
