import { Box, BoxProps, Flex } from "@artsy/palette"
import { FC } from "react"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

interface SplitLayoutProps {
  left: JSX.Element
  right: JSX.Element
  leftProps?: BoxProps
  rightProps?: BoxProps
  hideLogo?: boolean
}

export const SplitLayout: FC<SplitLayoutProps> = ({
  left,
  right,
  leftProps = {},
  rightProps = {},
  hideLogo = false,
}) => {
  return (
    <Flex height="100%" flexDirection={["column", "row"]}>
      <Box
        display={["none", "block"]}
        bg="black100"
        flexBasis="50%"
        position="relative"
        flexShrink={0}
        {...leftProps}
      >
        {left}

        {!hideLogo && (
          <ArtsyLogoIcon fill="white100" position="absolute" top={2} left={2} />
        )}
      </Box>

      <Flex
        flexBasis={["100%", "50%"]}
        flexGrow={0}
        minWidth={0}
        {...rightProps}
      >
        {right}
      </Flex>
    </Flex>
  )
}
