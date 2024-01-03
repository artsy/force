import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import {
  FulfillmentValues,
  matchAddressFields,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useFormikContext } from "formik"
import { useEffect } from "react"

/**
 * Go back to fulfillment details stage if the user edits the address
 */
export const useBackToFullfillmentDetails = () => {
  const shippingContext = useShippingContext()
  const { values } = useFormikContext<FulfillmentValues>()

  const formValuesDisagreeWithOrderAddress =
    shippingContext.orderData.savedFulfillmentDetails &&
    !matchAddressFields(
      shippingContext.orderData.savedFulfillmentDetails.attributes,
      values.attributes
    )

  useEffect(() => {
    if (shippingContext.state.stage !== "shipping_quotes") {
      return
    }

    // TODO: Still a bug here
    if (formValuesDisagreeWithOrderAddress) {
      console.log("going back to fulfillment details")
      shippingContext.actions.setStage("fulfillment_details")
    }
  }, [
    values,
    shippingContext.actions,
    shippingContext.state.stage,
    formValuesDisagreeWithOrderAddress,
  ])
}
