import { Box, BoxProps } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { useClickOutside } from "v2/Utils/Hooks/useClickOutside"

interface PopoverActions {
  onVisible(): void
  onHide(): void
}

interface MediocrePopoverProps extends BoxProps {
  popover: ({ onVisible, onHide }: PopoverActions) => JSX.Element
  children: ({ onVisible, onHide }: PopoverActions) => JSX.Element
}

// A real popover should be more configurable, detect the edges of the browser window,
// trap focus, etc. This doesn't do that — thought it is an improvement for now.
export const MediocrePopover: React.FC<MediocrePopoverProps> = ({
  children,
  popover,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)

  const onVisible = () => {
    setVisible(true)
  }

  const onHide = () => {
    setVisible(false)
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onHide()
      }
    }

    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  const popoverRef = useRef<HTMLDivElement | null>(null)

  useClickOutside({
    ref: popoverRef,
    onClickOutside: onHide,
    when: visible,
    type: "click",
  })

  return (
    <Box position="relative" {...rest}>
      {children({ onVisible, onHide })}

      {visible && (
        <Box
          ref={popoverRef as any}
          position="absolute"
          bottom="100%"
          left="50%"
          style={{ transform: "translateX(-50%)" }}
          zIndex={1}
        >
          {popover({ onVisible, onHide })}
        </Box>
      )}
    </Box>
  )
}
