import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

/**
 * The subset of an ActionCable subscription this module relies on.
 */
export interface CableSubscription {
  unsubscribe: () => void
}

export interface ActionCableConsumer {
  subscriptions: {
    create: (
      channelInfo: Record<string, unknown>,
      callbacks: { received: (payload: any) => void },
    ) => CableSubscription
  }
  disconnect: () => void
}

/**
 * A callback fired for every payload arriving on a given key. Payloads are
 * untyped here on purpose: this module owns the cable and the registry, and
 * knows nothing about the channels or event shapes built on top of it.
 */
export type ChannelListener = (payload: unknown) => void

interface SubscribeParams {
  key: string
  listener: ChannelListener
  /**
   * Called only when `key` has no physical subscription yet. The returned
   * subscription is shared by every listener registered under that key, and
   * `onMessage` must be wired to its inbound events.
   */
  createSubscription: (onMessage: ChannelListener) => CableSubscription
}

export interface ChannelsHolder {
  /**
   * Registers a listener under `key`, creating the physical subscription if it
   * is the first one. Returns a function that deregisters this listener, and
   * tears the physical subscription down once it was the last one.
   */
  subscribe: (params: SubscribeParams) => () => void
  hasSubscription: (key: string) => boolean
  /**
   * Drops the registry without unsubscribing, for when the underlying consumer
   * goes away and its subscriptions are already invalid.
   */
  reset: () => void
}

export interface ConversationsWebsocketContextValue {
  cable: ActionCableConsumer | null
  channelsHolder: ChannelsHolder
  accessToken: string | null
}

interface ChannelEntry {
  subscription: CableSubscription
  listeners: Set<ChannelListener>
}

export const createChannelsHolder = (): ChannelsHolder => {
  const entries = new Map<string, ChannelEntry>()

  return {
    subscribe: ({ key, listener, createSubscription }) => {
      let entry = entries.get(key)

      if (!entry) {
        const listeners = new Set<ChannelListener>()

        const subscription = createSubscription(payload => {
          listeners.forEach(registeredListener => {
            registeredListener(payload)
          })
        })

        entry = { subscription, listeners }
        entries.set(key, entry)
      }

      entry.listeners.add(listener)

      return () => {
        const currentEntry = entries.get(key)

        if (!currentEntry) {
          return
        }

        currentEntry.listeners.delete(listener)

        if (currentEntry.listeners.size === 0) {
          currentEntry.subscription.unsubscribe()
          entries.delete(key)
        }
      }
    },
    hasSubscription: key => {
      return entries.has(key)
    },
    reset: () => {
      entries.clear()
    },
  }
}

/**
 * Used when there is no provider above us: registering a listener is a no-op,
 * so nothing ever subscribes and callers fall back to polling.
 */
const inertChannelsHolder: ChannelsHolder = Object.freeze({
  subscribe: () => {
    return () => {}
  },
  hasSubscription: () => {
    return false
  },
  reset: () => {},
})

export const ConversationsWebsocketContext =
  createContext<ConversationsWebsocketContextValue>({
    cable: null,
    channelsHolder: inertChannelsHolder,
    accessToken: null,
  })

export const ConversationsWebsocketProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { user } = useSystemContext()
  const accessToken = user?.accessToken ?? null
  const [cable, setCable] = useState<ActionCableConsumer | null>(null)
  const channelsHolderRef = useRef<ChannelsHolder>(createChannelsHolder())

  useEffect(() => {
    if (!accessToken) {
      return
    }

    const ActionCable = require("actioncable")
    const consumer: ActionCableConsumer = ActionCable.createConsumer(
      getENV("GRAVITY_WEBSOCKET_URL"),
    )

    setCable(consumer)

    return () => {
      // Any subscription created on this consumer dies with it, so drop the
      // registry too rather than leaving stale entries behind.
      channelsHolderRef.current.reset()
      consumer.disconnect()
    }
  }, [accessToken])

  const value = useMemo(() => {
    return { cable, channelsHolder: channelsHolderRef.current, accessToken }
  }, [cable, accessToken])

  return (
    <ConversationsWebsocketContext.Provider value={value}>
      {children}
    </ConversationsWebsocketContext.Provider>
  )
}

export const useCable = (): ConversationsWebsocketContextValue => {
  return useContext(ConversationsWebsocketContext)
}
