import * as React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import {
  exactDate,
  relativeDate,
} from "Apps/Conversations/components/Message/Utils/dateFormatters"

interface ConversationTimeSinceProps extends Omit<BoxProps, "color"> {
  message: any
  exact?: boolean
  style?: React.CSSProperties
}

export const ConversationTimeSince: React.FC<ConversationTimeSinceProps> = ({
  message,
  exact,
  ...props
}) => {
  if (message.__typename !== "Message") {
    return null
  }

  const time = message.createdAt ?? ""

  if (!time) {
    return null
  }

  return (
    <Box {...props}>
      <Text variant="xs" color="black60">
        {exact ? exactDate(time) : relativeDate(time)}
      </Text>
    </Box>
  )
}
