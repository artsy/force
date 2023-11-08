import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/support/ShippingContext/mutations/useCreateSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/support/ShippingContext/mutations/useUpdateSavedAddress"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/support/ShippingContext/mutations/useDeleteSavedAddress"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/support/ShippingContext/mutations/useSaveFulfillmentDetails"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/support/ShippingContext/mutations/useSelectShippingQuote"
import { useUpdateUserDefaultAddress } from "Apps/Order/Routes/Shipping2/support/ShippingContext/mutations/useUpdateUserDefaultAddress"

export const useShippingMutations = () => {
  const createSavedAddress = useCreateSavedAddress().submitMutation
  const saveFulfillmentDetails = useSaveFulfillmentDetails().submitMutation
  const updateSavedAddress = useUpdateSavedAddress().submitMutation
  const deleteSavedAddress = useDeleteSavedAddress().submitMutation
  const selectShippingQuote = useSelectShippingQuote().submitMutation
  const updateUserDefaultAddress = useUpdateUserDefaultAddress().submitMutation
  return {
    createSavedAddress,
    saveFulfillmentDetails,
    updateSavedAddress,
    deleteSavedAddress,
    selectShippingQuote,
    updateUserDefaultAddress,
  }
}
