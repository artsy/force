import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { fallbackError } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { useCallback } from "react"

/**
 * Returns a `selectDeliveryOption` function that saves a fulfillment option type
 * to the order and clears/sets the DELIVERY_OPTION error banner.
 * Returns true on success, false on failure.
 *
 * Used by:
 * - FD onSubmit: select the first available option after saving the address;
 *   the caller decides whether to auto-advance based on hasSavedAddresses.
 * - DO radio: save the user's explicit choice.
 */
export const useSelectDeliveryOption = () => {
  const { setSectionErrorMessage } = useCheckoutContext()
  const setFulfillmentOptionMutation =
    useOrder2SetOrderFulfillmentOptionMutation()

  const selectDeliveryOption = useCallback(
    async (orderId: string, type: string): Promise<boolean> => {
      try {
        const result = await setFulfillmentOptionMutation.submitMutation({
          variables: {
            input: {
              id: orderId,
              fulfillmentOption: { type: type as never },
            },
          },
        })
        validateAndExtractOrderResponse(
          result.setOrderFulfillmentOption?.orderOrError,
        )
        setSectionErrorMessage({
          section: CheckoutStepName.DELIVERY_OPTION,
          error: null,
        })
        return true
      } catch (error) {
        setSectionErrorMessage({
          section: CheckoutStepName.DELIVERY_OPTION,
          error: fallbackError("selecting your shipping method", error?.code),
        })
        return false
      }
    },
    [setFulfillmentOptionMutation, setSectionErrorMessage],
  )

  return { selectDeliveryOption }
}
