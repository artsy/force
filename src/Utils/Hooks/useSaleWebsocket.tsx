import { useWebsocketContext } from "System/Hooks/useWebsocketContext"
import { useEffect } from "react"

interface SaleWebsocketData {
  [key: string]: string
}

interface SaleWebsocketParams {
  saleID: string
  onChange: (data: SaleWebsocketData) => void
}

export const useSaleWebsocket = ({ onChange, saleID }: SaleWebsocketParams) => {
  const { data } = useWebsocketContext()
  const { sale_id } = data
  const receivedMessageForThisSale = sale_id === saleID

  useEffect(() => {
    if (receivedMessageForThisSale) {
      onChange(data)
    }
  }, [onChange, receivedMessageForThisSale, data])
}
