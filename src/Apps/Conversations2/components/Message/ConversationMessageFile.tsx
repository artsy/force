import { Box, Clickable, Flex, Text } from "@artsy/palette"
import { FC } from "react"

interface ConversationMessageFileProps {
  src: string
  name: string
  size: string
}

export const ConversationMessageFile: FC<ConversationMessageFileProps> = ({
  src,
  name,
  size,
}) => {
  return (
    <Clickable
      display="flex"
      flex={1}
      overflow="hidden"
      width="100%"
      onClick={() => window?.open(src, "_blank")}
    >
      <Flex width="100%">
        <Box
          size={50}
          borderRadius={10}
          flex="none"
          backgroundColor="black60"
        />

        <Flex
          ml={1}
          flexDirection="column"
          overflow="hidden"
          style={{ whiteSpace: "nowrap" }}
        >
          <Text overflowEllipsis>{name}</Text>
          <Text variant="xs">{size}</Text>
        </Flex>
      </Flex>
    </Clickable>
  )
}
