import React, { FC } from "react"
import { Flex, Sans, Separator } from "@artsy/palette"
import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"

export const ConversationListHeader: FC = props => {
  return (
    <Flex
      justifyContent="flex-end"
      flexDirection="column"
      height={LARGE_SCREEN_HEADER_HEIGHT}
      {...props}
    >
      <Sans size="6" weight="medium" ml={1}>
        Inbox
      </Sans>
      <Separator mt={1} />
    </Flex>
  )
}
