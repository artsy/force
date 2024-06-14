import { createContext, useContext, useEffect, useState } from "react"
import { getENV } from "Utils/getENV"

interface ReceivedData {
  [key: string]: string
}

interface WebsocketContextProps {
  data: ReceivedData
}

interface WebsocketContextProviderProps {
  enabled: boolean
  channelInfo: {
    channel: string
    [id: string]: string | undefined
  }
}

const initialValues = {
  data: {} as ReceivedData,
}

const WebsocketContext = createContext<WebsocketContextProps>(initialValues)

export const WebsocketContextProvider: React.FC<WebsocketContextProviderProps> = ({
  channelInfo,
  enabled,
  children,
}) => {
  const [receivedData, setReceivedData] = useState(initialValues)
  const xapp_token = getENV("ARTSY_XAPP_TOKEN")
  useEffect(() => {
    if (!enabled) return
    const actionCable = require("actioncable")
    const cable = actionCable.createConsumer(getENV("GRAVITY_WEBSOCKET_URL"))
    cable.subscriptions.create(
      {
        ...channelInfo,
        xapp_token,
      },
      {
        received: data => {
          setReceivedData({ data })
        },
      }
    )
  }, [])

  return (
    <WebsocketContext.Provider value={receivedData}>
      {children}
    </WebsocketContext.Provider>
  )
}

export const useWebsocketContext = () => {
  const websocketContext = useContext(WebsocketContext) ?? {}
  return websocketContext
}
