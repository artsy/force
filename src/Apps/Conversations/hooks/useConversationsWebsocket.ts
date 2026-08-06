import { useCable } from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useEffect, useRef } from "react"

export interface ConversationMessageSentEvent {
  type: "message.sent"
  conversation_id: string
  message_id: string
  created_at: string
}

interface UseConversationsWebsocketProps {
  subscriptionKey: string
  enabled: boolean
  onEvent: (event: ConversationMessageSentEvent) => void
}

export const useConversationsWebsocket = ({
  subscriptionKey,
  enabled,
  onEvent,
}: UseConversationsWebsocketProps) => {
  const { cable, channelsHolder } = useCable()
  const onEventRef = useRef(onEvent)
  onEventRef.current = onEvent

  useEffect(() => {
    if (!enabled || !cable) {
      return
    }

    const channelKey = `conversations:${subscriptionKey}`

    if (channelsHolder.getChannel(channelKey)) {
      return
    }

    const subscription = cable.subscriptions.create(
      { channel: "ConversationsChannel", key: subscriptionKey },
      {
        received: (event: ConversationMessageSentEvent) => {
          onEventRef.current(event)
        },
      },
    )

    channelsHolder.setChannel(channelKey, subscription)

    return () => {
      subscription.unsubscribe()
      channelsHolder.removeChannel(channelKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, cable, channelsHolder, subscriptionKey])
}
