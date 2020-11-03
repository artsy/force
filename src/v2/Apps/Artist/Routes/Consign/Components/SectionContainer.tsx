import { Color, Flex, FlexProps, color } from "@artsy/palette"
import React from "react"

// Doesn't exist in design system
export const LightPurpleColor = "#DDDADC"

interface SectionContainerProps extends FlexProps {
  background?: Color | typeof LightPurpleColor
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  background = "white100",
  ...rest
}) => {
  // For sections with bg-colors outside of our design system
  const bg =
    background === LightPurpleColor ? LightPurpleColor : color(background)

  return (
    <Flex
      background={bg}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={[2, 4]}
      py={6}
      position="relative"
      top={-1}
      {...rest}
    >
      {children}
    </Flex>
  )
}
