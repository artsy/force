import { Flex, type FlexProps, Text } from "@artsy/palette"
import type { FC } from "react"

interface ConversationEventRowProps extends FlexProps {
  Icon: FC<{ fill?: string }>
  iconFill: string
  message: string
  textColor: string
}

/**
 * The shared presentational row for an event line in a conversation thread: a
 * centered icon followed by a short status message. Used by both the order /
 * offer events (ConversationOrderUpdate) and partner offers
 * (ConversationPartnerOfferUpdate), which derive their icon, color, and message
 * from different data sources.
 */
export const ConversationEventRow: FC<
  React.PropsWithChildren<ConversationEventRowProps>
> = ({ Icon, iconFill, message, textColor, ...flexProps }) => {
  return (
    <Flex px={2} justifyContent="center" flexDirection="row" {...flexProps}>
      <Icon fill={iconFill} />

      <Flex flexDirection="column" pl={1}>
        <Text color={textColor} variant="xs">
          {message}
        </Text>
      </Flex>
    </Flex>
  )
}
