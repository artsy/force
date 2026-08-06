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

interface Subscription {
  unsubscribe: () => void
  [key: string]: unknown
}

interface ActionCableConsumer {
  subscriptions: {
    create: (
      channelInfo: Record<string, unknown>,
      callbacks: Record<string, (...args: any[]) => void>,
    ) => Subscription
  }
  disconnect: () => void
}

export interface ChannelsHolder {
  setChannel: (key: string, subscription: Subscription) => Subscription
  getChannel: (key: string) => Subscription | undefined
  removeChannel: (key: string) => void
}

export interface ConversationsWebsocketContextValue {
  cable: ActionCableConsumer | null
  channelsHolder: ChannelsHolder
}

const createChannelsHolder = (): ChannelsHolder => {
  const channels = new Map<string, Subscription>()

  return {
    setChannel: (key, subscription) => {
      channels.set(key, subscription)
      return subscription
    },
    getChannel: key => channels.get(key),
    removeChannel: key => {
      channels.delete(key)
    },
  }
}

const noopChannelsHolder = createChannelsHolder()

export const ConversationsWebsocketContext =
  createContext<ConversationsWebsocketContextValue>({
    cable: null,
    channelsHolder: noopChannelsHolder,
  })

export const ConversationsWebsocketProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { user } = useSystemContext()
  const [cable, setCable] = useState<ActionCableConsumer | null>(null)
  const channelsHolderRef = useRef<ChannelsHolder>(createChannelsHolder())

  useEffect(() => {
    if (!user?.accessToken) {
      return
    }

    const ActionCable = require("actioncable")
    setCable(ActionCable.createConsumer(getENV("GRAVITY_WEBSOCKET_URL")))
  }, [user?.accessToken])

  const value = useMemo(
    () => ({ cable, channelsHolder: channelsHolderRef.current }),
    [cable],
  )

  return (
    <ConversationsWebsocketContext.Provider value={value}>
      {children}
    </ConversationsWebsocketContext.Provider>
  )
}

export const useCable = (): ConversationsWebsocketContextValue => {
  return useContext(ConversationsWebsocketContext)
}
