import { useState } from "react"

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

  // Handle touch...

  const containerProps = {
    onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setIsHovered(true)
      onMouseEnter?.(event)
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      !isSaved && setIsHovered(false)
      onMouseLeave?.(event)
    },
  }

  return { isSaveButtonVisible: isHovered, containerProps }
}
