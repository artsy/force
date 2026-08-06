import { useCable } from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useEffect, useRef, useState } from "react"

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

interface UseConversationsWebsocketResult {
  /**
   * True once this caller has a live listener on the channel. Callers use it to
   * decide whether their polling fallback can stand down: the flag being on is
   * not enough, since the cable is created asynchronously and may never connect.
   */
  isSubscribed: boolean
}

export const useConversationsWebsocket = ({
  subscriptionKey,
  enabled,
  onEvent,
}: UseConversationsWebsocketProps): UseConversationsWebsocketResult => {
  const { cable, channelsHolder, accessToken } = useCable()
  const onEventRef = useRef(onEvent)
  onEventRef.current = onEvent

  const [isSubscribed, setIsSubscribed] = useState(false)

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

    setIsSubscribed(true)

    return () => {
      deregister()
      setIsSubscribed(false)
    }
  }, [enabled, cable, channelsHolder, subscriptionKey, accessToken])

  return { isSubscribed }
}
