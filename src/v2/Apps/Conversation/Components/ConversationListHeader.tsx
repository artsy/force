import { FC } from "react"
import { Flex, Text, Separator } from "@artsy/palette"

import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"

export const ConversationListHeader: FC = props => {
  return (
    <Flex
      justifyContent="flex-end"
      flexDirection="column"
      mt="1px"
      height={LARGE_SCREEN_HEADER_HEIGHT}
      {...props}
    >
      <Text variant="lg-display" ml={1}>
        Inbox
      </Text>
      <Separator mt={1} />
    </Flex>
  )
}
