import { getENV } from "Utils/getENV"
import { createContext, useEffect, useState } from "react"

interface ReceivedData {
  [key: string]: string
}

export interface WebsocketContextProps {
  data: ReceivedData
  enabled?: boolean
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
  enabled: true,
}

export const WebsocketContext =
  createContext<WebsocketContextProps>(initialValues)

export const WebsocketContextProvider: React.FC<
  React.PropsWithChildren<WebsocketContextProviderProps>
> = ({ channelInfo, enabled = true, children }) => {
  const [receivedData, setReceivedData] = useState<WebsocketContextProps>({
    ...initialValues,
    enabled,
  })
  const xapp_token = getENV("ARTSY_XAPP_TOKEN")

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
      },
    )
  }, [])

  return (
    <WebsocketContext.Provider value={receivedData}>
      {children}
    </WebsocketContext.Provider>
  )
}
