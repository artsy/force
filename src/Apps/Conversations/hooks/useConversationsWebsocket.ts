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
}: UseConversationsWebsocketProps): void => {
  const { cable, channelsHolder, accessToken } = useCable()
  const onEventRef = useRef(onEvent)
  onEventRef.current = onEvent

  useEffect(() => {
    if (!enabled || !cable || !accessToken) {
      return
    }

    const channelKey = `conversations:${subscriptionKey}`

    // Route through a ref so the callback never runs against a stale closure.
    const listener = (payload: unknown) => {
      onEventRef.current(payload as ConversationMessageSentEvent)
    }

    const deregister = channelsHolder.subscribe({
      key: channelKey,
      listener,
      createSubscription: onMessage => {
        return cable.subscriptions.create(
          {
            channel: "ConversationsChannel",
            key: subscriptionKey,
            access_token: accessToken,
          },
          { received: onMessage },
        )
      },
    })

    return () => {
      deregister()
    }
  }, [enabled, cable, channelsHolder, subscriptionKey, accessToken])
}
