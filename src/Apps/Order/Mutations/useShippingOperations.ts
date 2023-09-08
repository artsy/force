import { AddressVerifiedBy } from "Apps/Order/Components/AddressVerificationFlow"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { setShipping } from "Apps/Order/Mutations/SetShipping"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import {
  FulfillmentDetailsValues,
  ShippingFormValues,
  ShippingMutationValues,
  ShippingProps,
} from "Apps/Order/Routes/Shipping"

import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { CommerceSetShippingInput } from "__generated__/SetShippingMutation.graphql"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import pick from "lodash/pick"
import { useCallback } from "react"

export const useShippingOperations = (
  props: ShippingProps,
  logger: ReturnType<typeof createLogger>
) => {
  const { commitMutation, me, order } = props
  const { relayEnvironment } = useSystemContext()

  return {
    saveFulfillmentDetails: useCallback(
      async (
        values: ShippingMutationValues,
        isArtsyShipping: boolean,
        addressVerifiedBy?: AddressVerifiedBy | null
      ) => {
        const address = pick(values, [
          "name",
          "addressLine1",
          "addressLine2",
          "city",
          "region",
          "postalCode",
          "country",
        ])
        const mutationInput: CommerceSetShippingInput = {
          id: order.internalID,
          fulfillmentType: isArtsyShipping
            ? "SHIP_ARTA"
            : values.fulfillmentType,
          shipping: address,
          phoneNumber: values.phoneNumber,
        }
        // todo: handle address verification
        if (addressVerifiedBy) {
          mutationInput.addressVerifiedBy = addressVerifiedBy
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
        values: ShippingMutationValues<ShippingFormValues>,
        closeModal: () => void = () => null,
        onSuccess: (address: UpdateUserAddressMutation$data) => void = () =>
          null,
        onError: (message: string) => void = logger.error
      ) => {
        return updateUserAddress(
          relayEnvironment!,
          existingAddressID,
          values,
          closeModal,
          onSuccess,
          onError
        )
      },
      [logger.error, relayEnvironment]
    ),

    createUserAddress: useCallback(
      async (
        values: ShippingMutationValues<ShippingFormValues>,
        onSuccess: (address: CreateUserAddressMutation$data) => void = () =>
          null,
        onError: (message: string) => void = logger.error,
        closeModal: () => void = () => null
      ) => {
        createUserAddress(
          relayEnvironment!,
          values,
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
