import { ArtsyLogoIcon, Box, Flex } from "@artsy/palette"
import { FC } from "react"

interface OnboardingSplitLayoutProps {
  left: JSX.Element
  right: JSX.Element
}

export const OnboardingSplitLayout: FC<OnboardingSplitLayoutProps> = ({
  left,
  right,
}) => {
  return (
    <Flex height="100%">
      <Box
        display={["none", "block"]}
        bg="black100"
        flexBasis="50%"
        position="relative"
      >
        {left}

        <ArtsyLogoIcon fill="white100" position="absolute" top={2} left={2} />
      </Box>

      <Flex flexBasis={["100%", "50%"]}>{right}</Flex>
    </Flex>
  )
}
