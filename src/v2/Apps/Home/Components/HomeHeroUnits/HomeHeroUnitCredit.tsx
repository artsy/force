import React from "react"
import { Text } from "@artsy/palette"
import { useState } from "react"

export const HomeHeroUnitCredit: React.FC = ({ children }) => {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  return (
    <Text
      variant="xs"
      color="rgba(255, 255, 255, 0.7)"
      style={{ textShadow: "0 0 3px rgba(0, 0, 0, 0.25)" }}
      lineClamp={hover ? undefined : 2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Text>
  )
}
