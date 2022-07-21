import { useEffect } from "react"
import { useWebsocketContext } from "System/WebsocketContext"

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
  const { data } = useWebsocketContext()
  const { lot_id } = data
  const receivedMessageForThisLot = lot_id === lotID

  useEffect(() => {
    if (receivedMessageForThisLot) {
      onChange(data)
    }
  }, [onChange, receivedMessageForThisLot, data])
}
