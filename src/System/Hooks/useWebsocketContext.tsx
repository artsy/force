import { WebsocketContext } from "System/Contexts/WebsocketContext"
import { useContext } from "react"

export const useWebsocketContext = () => {
  const websocketContext = useContext(WebsocketContext) ?? {}
  return websocketContext
}
