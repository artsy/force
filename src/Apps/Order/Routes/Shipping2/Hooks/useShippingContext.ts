import { useContext, useMemo, useState } from "react"
import { FormikProps } from "formik"
import { ShippingProps, ShippingRouteStep } from "Apps/Order/Routes/Shipping2"
import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { useParseOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"
import {
  ShippingContext,
  ShippingContextProps,
} from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

/**
 * Load the full shipping context from its top-level route using relay props.
 */
export const useComputeShippingContext = (
  props: ShippingProps
): ShippingContextProps => {
  const parsedOrderData = useParseOrderData(props)

  /**
   * Because there is a single button for both fulfillment details and
   * shipping quote steps (and duplicated in the sidebar)
   * we need to hack some formik values UP from the fulfillment details form.
   *
   * Currently we need to pass up:
   */
  const [fulfillmentFormHelpers, setFulfillmentFormHelpers] = useState<
    Pick<FormikProps<FulfillmentValues>, "handleSubmit" | "isValid" | "values">
  >({
    // Used to submit the form
    handleSubmit: () => {},
    // Used to disable the button
    isValid: false,
    // Used to get the form values for un-saving the address if the user
    // unchecks it after saving it in the fulfillment details step.
    values: ({
      attributes: {
        saveAddress: false,
      },
    } as unknown) as FulfillmentValues,
  })
  const fulfillmentDetailsHelpers = {
    ...fulfillmentFormHelpers,
    setFulfillmentFormHelpers,
  }

  const step: ShippingRouteStep = useMemo(() => {
    if (parsedOrderData.savedFulfillmentData?.isArtsyShipping) {
      return "shipping_quotes"
    }
    return "fulfillment_details"
  }, [parsedOrderData.savedFulfillmentData])

  return {
    parsedOrderData,
    step,
    helpers: {
      fulfillmentDetails: fulfillmentDetailsHelpers,
    },
  }
}
