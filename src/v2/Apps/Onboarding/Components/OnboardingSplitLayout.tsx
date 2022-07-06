import { ArtsyLogoIcon, Box, BoxProps, Flex } from "@artsy/palette"
import { FC } from "react"

interface OnboardingSplitLayoutProps {
  left: JSX.Element
  right: JSX.Element
  leftProps?: BoxProps
  rightProps?: BoxProps
}

export const OnboardingSplitLayout: FC<OnboardingSplitLayoutProps> = ({
  left,
  right,
  leftProps = {},
  rightProps = {},
}) => {
  return (
    <Flex height="100%" flexDirection={["column", "row"]}>
      <Box
        display={["none", "block"]}
        bg="black100"
        flexBasis="50%"
        position="relative"
        {...leftProps}
      >
        {left}

        <ArtsyLogoIcon fill="white100" position="absolute" top={2} left={2} />
      </Box>

      <Flex flexBasis={["100%", "50%"]} {...rightProps}>
        {right}
      </Flex>
    </Flex>
  )
}
