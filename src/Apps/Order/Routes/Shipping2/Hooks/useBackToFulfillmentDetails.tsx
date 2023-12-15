import { usePrevious } from "@artsy/palette"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { matchAddressFields } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"
import { useEffect } from "react"

/**
 * Go back to fulfillment details stage if the user edits the address or
 * deletes a saved address.
 */
export const useBackToFullfillmentDetails = (me: Shipping2_me$data) => {
  const shippingContext = useShippingContext()

  const formValues = shippingContext.state.formHelpers.values
  const previousFormValues = usePrevious(formValues)

  const savedAddresses = extractNodes(me.addressConnection)
  const previousSavedAddresses = usePrevious(savedAddresses)

  /**
   * Go back to fulfillment details stage if the user edits the address or
   * deletes a saved address.
   */
  useEffect(() => {
    if (
      shippingContext.state.stage === "fulfillment_details" ||
      !shippingContext.orderData.savedFulfillmentDetails
    ) {
      return
    }

    const addressValuesChanged = !matchAddressFields(
      formValues.attributes,
      previousFormValues.attributes
    )

    const deletedNewSavedAddress =
      shippingContext.state.newSavedAddressId &&
      previousSavedAddresses.length > savedAddresses.length &&
      !savedAddresses.find(
        a => a.internalID === shippingContext.state.newSavedAddressId
      )

    if (addressValuesChanged || deletedNewSavedAddress) {
      shippingContext.actions.setStage("fulfillment_details")

      if (deletedNewSavedAddress) {
        shippingContext.actions.setNewSavedAddressId(null)
      }
    }
  }, [
    formValues.attributes,
    shippingContext.state.formHelpers.values,
    shippingContext.orderData.savedFulfillmentDetails,
    previousFormValues.attributes,
    previousSavedAddresses.length,
    savedAddresses,
    savedAddresses.length,
    shippingContext.state.newSavedAddressId,
    shippingContext.state.stage,
    shippingContext.actions,
  ])
}
