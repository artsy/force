import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateSavedAddress"
import { useUpdateUserDefaultAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateUserDefaultAddress"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import {
  FulfillmentType,
  FulfillmentValues,
  SavedAddressType,
  UserAddressAction,
  addressWithFallbackValues,
  getAddressByID,
  matchAddressFields,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { useCreateSavedAddressMutation$data } from "__generated__/useCreateSavedAddressMutation.graphql"
import { useDeleteSavedAddressMutation$data } from "__generated__/useDeleteSavedAddressMutation.graphql"
import { useUpdateSavedAddressMutation$data } from "__generated__/useUpdateSavedAddressMutation.graphql"
import { FormikHelpers } from "formik"

const logger = createLogger(
  "Order/Routes/Shipping/Hooks/useHandleUserAddressUpdates.tsx"
)

type Result = {
  errors: ReadonlyArray<{ message: string }> | null
  data: SavedAddressType | null
}

export const useHandleUserAddressUpdates = () => {
  const createSavedAddress = useCreateSavedAddress()
  const updateSavedAddress = useUpdateSavedAddress()
  const deleteSavedAddress = useDeleteSavedAddress()
  const updateDefaultAddress = useUpdateUserDefaultAddress()
  const shippingContext = useShippingContext()

  const handleUserAddressUpdates = async (
    values: FulfillmentValues,
    helpers: FormikHelpers<FulfillmentValues>
  ): Promise<Result> => {
    let result: Result = { errors: null, data: null }

    if (values.fulfillmentType !== FulfillmentType.SHIP) {
      result = { errors: null, data: null }
      return result
    }
    const mode = values.meta.mode as "new_address" | "saved_addresses"

    const formAddressAttributes = values.attributes

    let userAddressAction: UserAddressAction | null = null
    let setAsDefault = false
    if (mode === "new_address") {
      userAddressAction = getUserAddressActionForAddressFormValues(
        values,
        shippingContext
      )
    }

    if (
      mode === "saved_addresses" &&
      shippingContext.state.addressModalAction
    ) {
      userAddressAction = shippingContext.state.addressModalAction
      if (values.meta.setAddressAsDefault) {
        setAsDefault = true
      }
    }
    if (!userAddressAction) {
      return result
    }
    try {
      switch (userAddressAction.type) {
        case "create": {
          shippingContext.actions.setIsPerformingOperation(true)

          const response = await createSavedAddress.submitMutation({
            variables: {
              input: {
                attributes: addressWithFallbackValues(formAddressAttributes),
              },
            },
          })

          result = handleMutationPayload(response.createUserAddress)

          if (mode === "new_address" && result.data) {
            // TODO: form values or dispatch to state? Form value updates can be awaited...
            await helpers.setFieldValue(
              "meta.newSavedAddressId",
              result.data.internalID
            )
          }

          break
        }

        case "edit": {
          shippingContext.actions.setIsPerformingOperation(true)

          const response = await updateSavedAddress.submitMutation({
            variables: {
              input: {
                userAddressID: userAddressAction.addressID,
                attributes: addressWithFallbackValues(formAddressAttributes),
              },
            },
          })

          result = handleMutationPayload(response.updateUserAddress)
          break
        }

        case "delete": {
          shippingContext.actions.setIsPerformingOperation(true)

          const response = await deleteSavedAddress.submitMutation({
            variables: {
              input: {
                userAddressID: userAddressAction.addressID,
              },
            },
          })
          result = handleMutationPayload(response.deleteUserAddress)
          if (mode === "new_address" && result.data) {
            await helpers.setFieldValue("meta.newSavedAddressId", undefined)
          }

          break
        }
      }
      if (result.data && setAsDefault && userAddressAction.type !== "delete") {
        await updateDefaultAddress.submitMutation({
          variables: {
            input: {
              userAddressID: result.data.internalID,
            },
          },
        })
      }

      if (result.errors) {
        handleGravityErrors(result.errors, helpers)
        return result
      }

      return result
    } catch (error) {
      handleGravityErrors([error], helpers)
      result = { errors: [error], data: null }
      return result
    }
  }

  return { handleUserAddressUpdates }
}

const getUserAddressActionForAddressFormValues = (
  values: FulfillmentValues,
  shippingContext: ShippingContextProps
): UserAddressAction | null => {
  const savedFulfillmentDetails =
    shippingContext.orderData.savedFulfillmentDetails
  const formAddressAttributes = values.attributes
  if (values.meta.saveAddress) {
    if (!shippingContext.state.newSavedAddressId) {
      return { type: "create", setAsDefault: false }
    } else if (
      savedFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP &&
      !matchAddressFields(
        formAddressAttributes,
        savedFulfillmentDetails.attributes
      )
    ) {
      const newSavedAddress = getAddressByID(
        shippingContext.meData.addressList,
        shippingContext.state.newSavedAddressId
      )

      if (!newSavedAddress) {
        logger.error("Expected a new saved address to exist")
      }

      if (
        newSavedAddress &&
        !matchAddressFields(newSavedAddress, formAddressAttributes)
      ) {
        return {
          type: "edit",
          addressID: shippingContext.state.newSavedAddressId,
        }
      }
    }
  }
  if (!values.meta.saveAddress && shippingContext.state.newSavedAddressId) {
    return {
      type: "delete",
      addressID: shippingContext.state.newSavedAddressId,
    }
  }
  return null
}

// two different error messages for the same error?
const SERVER_ERROR_MAP: Record<string, Record<string, string>> = {
  "Validation failed for phone: not a valid phone number": {
    field: "attributes.phoneNumber",
    message: "Please enter a valid phone number",
  },
  "Validation failed: Phone not a valid phone number": {
    field: "attributes.phoneNumber",
    message: "Please enter a valid phone number",
  },
}

export const GENERIC_FAIL_MESSAGE =
  "Sorry, there has been an issue saving your address. Please try again."

const handleMutationPayload = (
  payload:
    | useUpdateSavedAddressMutation$data["updateUserAddress"]
    | useCreateSavedAddressMutation$data["createUserAddress"]
    | useDeleteSavedAddressMutation$data["deleteUserAddress"]
):
  | { data: SavedAddressType; errors: null }
  | { data: null; errors: ReadonlyArray<{ message: string }> } => {
  const addressOrErrors = payload?.userAddressOrErrors

  if (addressOrErrors?.__typename === "Errors") {
    return {
      errors: addressOrErrors.errors,
      data: null,
    }
  }
  return {
    errors: null,
    data: addressOrErrors as SavedAddressType,
  }
}

const handleGravityErrors = (
  errors: ReadonlyArray<{ message: string }>,
  formikHelpers: FormikHelpers<FulfillmentValues>
) => {
  if (!errors?.length) return

  const userMessage: Record<string, string> | null =
    SERVER_ERROR_MAP[errors[0].message]

  if (userMessage) {
    formikHelpers.setFieldError(userMessage.field, userMessage.message)
  } else {
    formikHelpers.setStatus({ gravityAddressError: GENERIC_FAIL_MESSAGE })
  }

  logger.error(errors.map(error => error.message).join(", "))
}
