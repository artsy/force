import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import { getENV } from "Utils/getENV"
import { useEffect } from "react"

interface ReceivedData {
  [key: string]: string
}

export interface WebsocketContextProps {
  data: ReceivedData
}

interface WebsocketContextProviderProps {
  enabled: boolean
  channelInfo: {
    channel: string
    [id: string]: string | undefined
  }
}

// Store model interface
interface WebsocketStoreModel {
  // State
  data: ReceivedData

  // Actions
  setData: Action<WebsocketStoreModel, ReceivedData>
  receiveData: Thunk<WebsocketStoreModel, ReceivedData>
}

// Create the context store
export const WebsocketStore = createContextStore<WebsocketStoreModel>(
  runtimeModel => ({
    // State
    data: runtimeModel?.data || {},

    // Actions
    setData: action((state, payload) => {
      state.data = payload
    }),

    receiveData: thunk((actions, payload) => {
      actions.setData(payload)
    }),
  }),
)

// Provider component with websocket logic
export const WebsocketContextProvider: React.FC<
  React.PropsWithChildren<WebsocketContextProviderProps>
> = ({ channelInfo, enabled, children }) => {
  const receiveData = WebsocketStore.useStoreActions(
    actions => actions.receiveData,
  )
  const xapp_token = getENV("ARTSY_XAPP_TOKEN")

  useEffect(() => {
    if (!enabled) return

    const actionCable = require("actioncable")
    const cable = actionCable.createConsumer(getENV("GRAVITY_WEBSOCKET_URL"))
    const subscription = cable.subscriptions.create(
      {
        ...channelInfo,
        xapp_token,
      },
      {
        received: data => {
          receiveData(data)
        },
      },
    )

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [enabled, xapp_token, channelInfo, receiveData])

  return <WebsocketStore.Provider>{children}</WebsocketStore.Provider>
}

// Backward compatible hook
export const useWebsocketContext = () => {
  const data = WebsocketStore.useStoreState(state => state.data)

  return {
    data,
  }
}

// Export alias for migration compatibility
export const WebsocketContext = WebsocketStore
