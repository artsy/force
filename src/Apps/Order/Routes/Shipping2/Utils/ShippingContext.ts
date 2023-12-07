import { createContext, useContext } from "react"
import { FormikProps } from "formik"
import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { ParsedOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"

type FulfillmentHelpers = Pick<
  FormikProps<FulfillmentValues>,
  "submitForm" | "isValid" | "values"
>
export interface ShippingContextProps {
  parsedOrderData: ParsedOrderData
  helpers: {
    fulfillmentDetails: FulfillmentHelpers & {
      setFulfillmentFormHelpers: (helpers: FulfillmentHelpers) => void
    }
  }
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const useShippingContext = () => {
  return useContext(ShippingContext)
}
