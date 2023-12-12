import { createContext, FC } from "react"
import { ParsedOrderData } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/useParseOrderData"
import { ShippingContextHelpers } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/useShippingContextHelpers"
import { ShippingProps } from "Apps/Order/Routes/Shipping2"
import { useComputeShippingContext } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/useComputeShippingContext"

export type ShippingStage =
  | "fulfillment_details"
  | "shipping_quotes"
  | "refresh_shipping_quotes"

export interface State {
  newSavedAddressId: string | null
  selectedShippingQuoteId: string | null
  stage: ShippingStage
}

export interface ShippingContextProps {
  state: State
  parsedOrderData: ParsedOrderData
  helpers: ShippingContextHelpers
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const ShippingContextProvider: FC<Pick<
  ShippingProps,
  "order" | "me" | "dialog"
>> = props => {
  const context = useComputeShippingContext(props)

  return (
    <ShippingContext.Provider value={context}>
      {props.children}
    </ShippingContext.Provider>
  )
}
