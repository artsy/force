import { useState } from "react"
import { isTouch } from "Utils/device"

interface UseSaveButton {
  isSaved: boolean
  onMouseEnter?(event: React.MouseEvent<HTMLElement, MouseEvent>): void
  onMouseLeave?(event: React.MouseEvent<HTMLElement, MouseEvent>): void
}

export const useSaveButton = ({
  isSaved,
  onMouseEnter,
  onMouseLeave,
}: UseSaveButton) => {
  const [isHovered, setIsHovered] = useState(isSaved)

  const containerProps = {
    onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (isTouch) return
      setIsHovered(true)
      onMouseEnter?.(event)
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (isTouch) return
      !isSaved && setIsHovered(false)
      onMouseLeave?.(event)
    },
  }

  return { isSaveButtonVisible: isHovered && !isTouch, containerProps }
}
