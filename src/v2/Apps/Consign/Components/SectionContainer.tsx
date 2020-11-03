import { Color, Flex, FlexProps, breakpoints } from "@artsy/palette"
import React from "react"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface SectionContainerProps extends FlexProps {
  background?: Color
  constrain?: boolean
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  background = "white100",
  constrain = true,
  ...rest
}) => {
  return (
    <Flex
      bg={background}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      px={[2, 4]}
      py={6}
      position="relative"
      top={-1}
      {...rest}
    >
      {constrain ? (
        <HorizontalPadding maxWidth={breakpoints.xl} width="100%">
          {children}
        </HorizontalPadding>
      ) : (
        <>{children}</>
      )}
    </Flex>
  )
}
