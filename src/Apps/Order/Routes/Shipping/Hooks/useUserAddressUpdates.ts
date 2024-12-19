import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping/Mutations/useCreateSavedAddress"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping/Mutations/useDeleteSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping/Mutations/useUpdateSavedAddress"
import { useUpdateUserDefaultAddress } from "Apps/Order/Routes/Shipping/Mutations/useUpdateUserDefaultAddress"
import type { ShippingContextProps } from "Apps/Order/Routes/Shipping/ShippingContext"
import {
  FulfillmentType,
  type FulfillmentValues,
  type SavedAddressType,
  type ShipValues,
  addressWithFallbackValues,
  getAddressByID,
  matchAddressFields,
} from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import createLogger from "Utils/logger"
import type { useCreateSavedAddressMutation$data } from "__generated__/useCreateSavedAddressMutation.graphql"
import type { useDeleteSavedAddressMutation$data } from "__generated__/useDeleteSavedAddressMutation.graphql"
import type { useUpdateSavedAddressMutation$data } from "__generated__/useUpdateSavedAddressMutation.graphql"

const logger = createLogger(
  "Order/Routes/Shipping/Hooks/useHandleUserAddressUpdates.tsx"
)

type Result<Success extends { data: any }> =
  /* An error occurred */
  | {
      actionType: UserAddressAction["type"]
      errors: ReadonlyArray<{ message: string }>
      data: null
    }
  /* An operation was performed successfully */
  | (Success & { errors: null; actionType: UserAddressAction["type"] })

export type SavedAddressResult = Result<{
  data: SavedAddressType
}>

interface AddressInput {
  addressLine1: string
  addressLine2?: string
  city: string
  country: string
  postalCode?: string
  region?: string
  name: string
  phoneNumber: string
}

export type UserAddressAction =
  | {
      type: "edit"
      address: AddressInput & { internalID: string }
      setAsDefault?: boolean
    }
  | {
      type: "delete"
      address: { internalID: string }
    }
  | {
      type: "create"
      address: AddressInput
      setAsDefault?: boolean
    }

export const useUserAddressUpdates = () => {
  const createSavedAddress = useCreateSavedAddress()
  const updateSavedAddress = useUpdateSavedAddress()
  const deleteSavedAddress = useDeleteSavedAddress()
  const updateDefaultAddress = useUpdateUserDefaultAddress()
  const shippingContext = useShippingContext()

  const handleNewUserAddressUpdates = async (
    values: FulfillmentValues
  ): Promise<SavedAddressResult | null> => {
    if (values.fulfillmentType !== FulfillmentType.SHIP) {
      return null
    }

    let userAddressAction: UserAddressAction | null = null

    userAddressAction = getUserAddressActionForAddressFormValues(
      values,
      shippingContext
    )

    if (!userAddressAction) {
      return null
    }

    const result = await executeUserAddressAction(userAddressAction)

    if (!result) {
      return null
    }

    if (result.errors) {
      return result
    }

    return {
      ...result,
      actionType: userAddressAction.type,
    }
  }

  const executeUserAddressAction = async (
    userAddressAction: UserAddressAction
  ): Promise<SavedAddressResult> => {
    let processedPayload: Omit<SavedAddressResult, "actionType"> | null = null
    try {
      switch (userAddressAction.type) {
        case "create": {
          shippingContext.actions.setIsPerformingOperation(true)

          const response = await createSavedAddress.submitMutation({
            variables: {
              input: {
                attributes: addressWithFallbackValues(
                  userAddressAction.address
                ),
              },
            },
          })
          processedPayload = handleMutationPayload(response.createUserAddress)

          break
        }

        case "edit": {
          shippingContext.actions.setIsPerformingOperation(true)

          const input = {
            userAddressID: userAddressAction.address.internalID,
            attributes: addressWithFallbackValues(userAddressAction.address),
          }

          const response = await updateSavedAddress.submitMutation({
            variables: {
              input,
            },
          })

          processedPayload = handleMutationPayload(response.updateUserAddress)

          break
        }

        case "delete": {
          shippingContext.actions.setIsPerformingOperation(true)

          const response = await deleteSavedAddress.submitMutation({
            variables: {
              input: {
                userAddressID: userAddressAction.address.internalID,
              },
            },
          })
          processedPayload = handleMutationPayload(response.deleteUserAddress)
          break
        }
      }

      const result = {
        ...processedPayload,
        actionType: userAddressAction.type,
      } as SavedAddressResult

      if (result.errors) {
        return result
      }

      const setDefaultID =
        userAddressAction.type !== "delete" && userAddressAction.setAsDefault
          ? result.data.internalID
          : undefined
      let setDefaultResult: Omit<SavedAddressResult, "actionType"> | null = null
      if (setDefaultID) {
        const setDefaultResponse = await updateDefaultAddress.submitMutation({
          variables: {
            input: {
              userAddressID: setDefaultID,
            },
          },
        })
        setDefaultResult = handleMutationPayload(
          setDefaultResponse.updateUserDefaultAddress
        )
        if (setDefaultResult.errors) {
          // Todo: Handle an error in setting the default address
          logger.error(setDefaultResult.errors.map(e => e.message).join(", "))
        }
      }

      return { ...result, actionType: userAddressAction.type }
    } catch (error) {
      const result: SavedAddressResult = {
        actionType: userAddressAction.type,
        errors: [error],
        data: null,
      }
      return result
    }
  }

  return { handleNewUserAddressUpdates, executeUserAddressAction }
}

const getUserAddressActionForAddressFormValues = (
  values: ShipValues,
  shippingContext: ShippingContextProps
): UserAddressAction | null => {
  const savedFulfillmentDetails =
    shippingContext.orderData.savedFulfillmentDetails
  const formAddressAttributes = values.attributes

  if (values.meta.saveAddress) {
    // The address form doesn't include this input, and is only used for the
    // user's first address (not when they already have saved addresses).
    if (!shippingContext.state.newSavedAddressID) {
      return { type: "create", address: values.attributes, setAsDefault: false }
    } else if (
      savedFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP &&
      !matchAddressFields(
        formAddressAttributes,
        savedFulfillmentDetails.attributes
      )
    ) {
      const newSavedAddress = getAddressByID(
        shippingContext.meData.addressList,
        shippingContext.state.newSavedAddressID
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
          address: {
            ...formAddressAttributes,
            internalID: shippingContext.state.newSavedAddressID,
          },
          setAsDefault: false,
        }
      }
    }
  }

  if (!values.meta.saveAddress && shippingContext.state.newSavedAddressID) {
    return {
      type: "delete",
      address: { internalID: shippingContext.state.newSavedAddressID },
    }
  }

  return null
}

const handleMutationPayload = (
  payload:
    | useUpdateSavedAddressMutation$data["updateUserAddress"]
    | useCreateSavedAddressMutation$data["createUserAddress"]
    | useDeleteSavedAddressMutation$data["deleteUserAddress"]
): Omit<SavedAddressResult, "actionType"> => {
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
