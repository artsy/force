import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateSavedAddress"
import {
  FulfillmentType,
  FulfillmentValues,
  addressWithFallbackValues,
  matchAddressFields,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"

const logger = createLogger(
  "Order/Routes/Shipping/Hooks/useHandleUserAddressUpdates.tsx"
)

export const useHandleUserAddressUpdates = () => {
  const shippingContext = useShippingContext()
  const createSavedAddress = useCreateSavedAddress()
  const updateSavedAddress = useUpdateSavedAddress()
  const deleteSavedAddress = useDeleteSavedAddress()

  const handleUserAddressUpdates = async (formValues: FulfillmentValues) => {
    if (formValues.fulfillmentType !== FulfillmentType.SHIP) {
      return
    }

    const formAddressAttributes = formValues.attributes

    const addressShouldBeSaved = !!formAddressAttributes.saveAddress

    const current = {
      newSavedAddressId: shippingContext.state.newSavedAddressId,
      savedFulfillmentDetails:
        shippingContext.orderData.savedFulfillmentDetails?.fulfillmentDetails,
    }

    try {
      if (addressShouldBeSaved) {
        // Address not saved, create it
        if (!current.newSavedAddressId) {
          shippingContext.actions.setIsPerformingOperation(true)

          const response = await createSavedAddress.submitMutation({
            variables: {
              input: {
                attributes: addressWithFallbackValues(formAddressAttributes),
              },
            },
          })

          const newAddress = response?.createUserAddress?.userAddressOrErrors

          if (newAddress?.__typename === "UserAddress") {
            shippingContext.actions.setNewSavedAddressId(newAddress.internalID)
            return
          }

          // Address create failed
          // const errorMessage = newAddress?.__typename === "Errors"
          //   ? newAddress.errors.map(e => e.message).join(", ")
          //   : "Something went wrong."
          // throw new Error(errorMessage)
          return
        } else if (
          current.newSavedAddressId &&
          current.savedFulfillmentDetails &&
          !matchAddressFields(
            current.savedFulfillmentDetails,
            formAddressAttributes
          )
        ) {
          shippingContext.actions.setIsPerformingOperation(true)

          await updateSavedAddress.submitMutation({
            variables: {
              input: {
                userAddressID: current.newSavedAddressId,
                attributes: addressWithFallbackValues(formAddressAttributes),
              },
            },
          })
        }
        // Address should not be saved, delete it if it exists
      } else {
        if (shippingContext.state.newSavedAddressId) {
          shippingContext.actions.setIsPerformingOperation(true)

          await deleteSavedAddress.submitMutation({
            variables: {
              input: {
                userAddressID: shippingContext.state.newSavedAddressId,
              },
            },
          })

          shippingContext.actions.setNewSavedAddressId(null)
        }
      }
    } catch (error) {
      logger.error(error)
    } finally {
      shippingContext.actions.setIsPerformingOperation(false)
    }
  }

  return { handleUserAddressUpdates }
}
