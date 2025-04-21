import { Box, type BoxProps, Text } from "@artsy/palette"
import {
  exactDate,
  relativeDate,
} from "Apps/Conversations/components/Message/Utils/dateFormatters"
import type * as React from "react"

interface ConversationTimeSinceProps extends Omit<BoxProps, "color"> {
  message: any
  exact?: boolean
  style?: React.CSSProperties
}

export const ConversationTimeSince: React.FC<
  React.PropsWithChildren<ConversationTimeSinceProps>
> = ({ message, exact, ...props }) => {
  if (message.__typename !== "Message") {
    return null
  }

  const time = message.createdAt ?? ""

  if (!time) {
    return null
  }

  return (
    <Box {...props}>
      <Text variant="xs" color="mono60">
        {exact ? exactDate(time) : relativeDate(time)}
      </Text>
    </Box>
  )
}
