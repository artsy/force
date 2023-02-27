import { Flex, FlexProps, NoArtworkIcon } from "@artsy/palette"
import { FC } from "react"

const NO_ICON_SIZE = 18

export const SavesNoImage: FC<FlexProps> = props => {
  return (
    <Flex
      bg="black5"
      border="1px solid"
      borderColor="black15"
      aria-label="Image placeholder"
      justifyContent="center"
      alignItems="center"
      flexShrink={0}
      {...props}
    >
      <NoArtworkIcon
        width={NO_ICON_SIZE}
        height={NO_ICON_SIZE}
        fill="black60"
      />
    </Flex>
  )
}
