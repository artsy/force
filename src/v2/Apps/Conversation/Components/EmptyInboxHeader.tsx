import { FC } from "react"
import { Flex, Text } from "@artsy/palette"
import { color } from "styled-system"

import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"

export const EmptyInboxHeader: FC = () => {
  return (
    <Flex
      height={LARGE_SCREEN_HEADER_HEIGHT}
      px={2}
      py={1}
      alignItems="flex-end"
      borderBottom={`1px solid ${color("black10")}`}
    >
      <Text variant="lg-display">Inbox</Text>
    </Flex>
  )
}
