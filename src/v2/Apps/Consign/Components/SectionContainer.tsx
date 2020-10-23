import { Color, Flex, FlexProps } from "@artsy/palette"
import React from "react"

interface SectionContainerProps extends FlexProps {
  background?: Color
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  background = "white100",
  ...rest
}) => {
  return (
    <Flex
      bg={background}
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
