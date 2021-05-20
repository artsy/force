import { ChevronIcon, Text } from "@artsy/palette"
import React from "react"

interface ChevronButtonProps {
  direction?: "left" | "right"
}

export const ChevronButton: React.FC<ChevronButtonProps> = ({
  children,
  direction = "right",
}) => {
  return (
    <Text variant="md" fontWeight="bold" py={1}>
      {direction === "right" ? (
        <>
          {children} <Arrow direction={direction} />
        </>
      ) : (
        <>
          <Arrow direction={direction} /> {children}
        </>
      )}
    </Text>
  )
}

const Arrow: React.FC<ChevronButtonProps> = ({ direction }) => {
  return (
    <ChevronIcon
      title="Chevron Arrow Icon"
      direction={direction}
      color="black"
      height="15px"
      width="14px"
      top="3px"
    />
  )
}
