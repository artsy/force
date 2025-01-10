import { useWebsocketContext } from "System/Hooks/useWebsocketContext"
import { useEffect } from "react"

interface AuctionWebsocketData {
  [key: string]: string
}

interface AuctionWebsocketParams {
  lotID: string
  onChange: (data: AuctionWebsocketData) => void
}

export const useAuctionWebsocket = ({
  onChange,
  lotID,
}: AuctionWebsocketParams) => {
  const { enabled, data } = useWebsocketContext()
  const { lot_id } = data
  const receivedMessageForThisLot = lot_id === lotID

  useEffect(() => {
    if (enabled && receivedMessageForThisLot) {
      onChange(data)
    }
  }, [onChange, receivedMessageForThisLot, data, enabled])
}
