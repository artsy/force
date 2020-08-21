import React, { FC } from "react"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"
import { color } from "styled-system"

export const EmptyInboxHeader: FC = () => {
  return (
    <Flex
      height={LARGE_SCREEN_HEADER_HEIGHT}
      px={2}
      py={1}
      alignItems="flex-end"
      borderBottom={`1px solid ${color("black10")}`}
    >
      <Sans size="6" weight="medium">
        Inbox
      </Sans>
    </Flex>
  )
}
