import * as React from "react"
import { Text, useTheme } from "@artsy/palette"
import { useState } from "react"

export const HomeHeroUnitCredit: React.FC = ({ children }) => {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  const { theme } = useTheme()

  const rgb = theme.name === "light" ? "255, 255, 255" : "0, 0, 0"

  return (
    <Text
      variant="xs"
      color={`rgba(${rgb}, 0.7)`}
      style={{ textShadow: theme.effects.textShadow }}
      lineClamp={hover ? undefined : 2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Text>
  )
}
