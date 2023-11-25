import React, { FC, useRef } from "react"
import { Button, ButtonProps } from "@artsy/palette"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"

interface LatestMessagesFlyOutProps {
  visible: boolean
  onClick: ButtonProps["onClick"]
}

export const LatestMessagesFlyOut: FC<LatestMessagesFlyOutProps> = ({
  visible,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Button
      bottom={4}
      marginBottom={-4}
      variant="primaryBlue"
      position="sticky"
      alignSelf="center"
      opacity={visible ? 1 : 0}
      onClick={e => {
        if (!visible) {
          return
        }

        onClick?.(e)
        buttonRef.current?.blur()
      }}
      style={{
        transition: "all .25s cubic-bezier(0.45, 0, 0.55, 1)",
        transform: visible ? "" : "translateY(-30px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      zIndex={2}
      ref={buttonRef as any}
    >
      Latest Messages
      <ChevronSmallDownIcon ml={0.5} />
    </Button>
  )
}
