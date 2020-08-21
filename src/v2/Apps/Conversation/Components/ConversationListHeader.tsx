import React, { FC } from "react"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { Separator } from "@artsy/palette/dist/elements/Separator"
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
