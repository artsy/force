import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { setShipping } from "Apps/Order/Mutations/SetShipping"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { ShippingProps } from "Apps/Order/Routes/Shipping"
import { ShippingAddressFormValues } from "Apps/Order/Utils/shippingUtils"

import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import {
  CommerceSetShippingInput,
  SetShippingMutation$data,
} from "__generated__/SetShippingMutation.graphql"
import {
  UpdateUserAddressMutation$data,
  UserAddressAttributes,
} from "__generated__/UpdateUserAddressMutation.graphql"
import { useCallback } from "react"

export type SaveFulfillmentDetailsResponse = NonNullable<
  SetShippingMutation$data["commerceSetShipping"]
>["orderOrError"]

export const useShippingOperations = (
  props: ShippingProps,
  logger: ReturnType<typeof createLogger>
) => {
  const { commitMutation, me, order } = props
  const { relayEnvironment } = useSystemContext()

  return {
    saveFulfillmentDetails: useCallback(
      async (values: Omit<CommerceSetShippingInput, "id">) => {
        const mutationInput: CommerceSetShippingInput = {
          id: order.internalID,
          ...values,
        }

        const result = await setShipping(commitMutation, {
          input: mutationInput,
        })
        return result.commerceSetShipping?.orderOrError
      },
      [commitMutation, order.internalID]
    ),

    updateUserAddress: useCallback(
      async (
        existingAddressID: string,
        values: UserAddressAttributes,
        closeModal: () => void = () => null,
        onSuccess: (address: UpdateUserAddressMutation$data) => void = () =>
          null,
        onError: (message: string) => void = logger.error
      ) => {
        return updateUserAddress(
          relayEnvironment!,
          existingAddressID,
          // TODO: Formik/yup validator type in Components/Address/Utils may be
          // able to coerce this
          values,
          closeModal,
          onSuccess,
          onError
        )
      },
      [logger.error, relayEnvironment]
    ),

    // TODO: these aren't used bc SavedAddresses doesn't have ShippingProps.
    // is this file needed?
    createUserAddress: useCallback(
      async (
        values: ShippingAddressFormValues,
        onSuccess: (address: CreateUserAddressMutation$data) => void = () =>
          null,
        onError: (message: string) => void = logger.error,
        closeModal: () => void = () => null
      ) => {
        createUserAddress(
          relayEnvironment!,
          {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            city: values.city,
            country: values.country,
            name: values.name,
            phoneNumber: values.phoneNumber,
            postalCode: values.postalCode,
            region: values.region,
            // phoneNumberCountryCode: values.phoneNumberCountryCode,
          },
          onSuccess,
          onError,
          me,
          closeModal
        )
      },
      [logger.error, me, relayEnvironment]
    ),
    deleteUserAddress: useCallback(
      async (
        addressID: string,
        onSuccess: () => void,
        onError: (message: string) => void = logger.error
      ) => {
        const response = await deleteUserAddress(
          relayEnvironment!,
          addressID,
          () => {
            return onSuccess()
          },
          onError
        )
        return response
      },
      [logger.error, relayEnvironment]
    ),
  }
}
