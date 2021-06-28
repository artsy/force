import { graphql } from "react-relay"
import {
  CreateUserAddressMutation,
  CreateUserAddressMutationResponse,
  UserAddressAttributes,
} from "v2/__generated__/CreateUserAddressMutation.graphql"
import {
  RecordSourceSelectorProxy,
  ConnectionHandler,
  Environment,
} from "relay-runtime"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import { Shipping_me } from "v2/__generated__/Shipping_me.graphql"
import { commitMutation } from "relay-runtime"
import { convertShippingAddressToMutationInput } from "../Utils/shippingAddressUtils"

const onAddressAdded = (
  me: SavedAddresses_me | Shipping_me,
  store: RecordSourceSelectorProxy<any>,
  data: CreateUserAddressMutationResponse
): void => {
  const response = data?.createUserAddress?.userAddressOrErrors

  if (response) {
    const meStore = store.get(me.id)
    const connection = ConnectionHandler.getConnection(
      // @ts-expect-error STRICT_NULL_CHECK
      meStore,
      "SavedAddresses_addressConnection"
    )
    const mutationPayload = store.getRootField("createUserAddress")

    const createUserAddressOrError = mutationPayload.getLinkedRecord(
      "userAddressOrErrors"
    )
    // @ts-expect-error STRICT_NULL_CHECK
    ConnectionHandler.insertEdgeAfter(connection, createUserAddressOrError)
  }
}

export const createUserAddress = async (
  environment: Environment,
  address: UserAddressAttributes,
  onSuccess: (address: CreateUserAddressMutationResponse | null) => void,
  onError: (message: string | null) => void,
  me: SavedAddresses_me | Shipping_me,
  closeModal: () => void
) => {
  const useAttributes = convertShippingAddressToMutationInput(address)
  commitMutation<CreateUserAddressMutation>(environment, {
    variables: {
      input: {
        attributes: useAttributes,
      },
    },
    mutation: graphql`
      mutation CreateUserAddressMutation($input: CreateUserAddressInput!) {
        createUserAddress(input: $input) {
          userAddressOrErrors {
            ... on UserAddress {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
            ... on Errors {
              errors {
                message
              }
            }
          }
        }
      }
    `,
    updater: (store, data: CreateUserAddressMutationResponse) => {
      onAddressAdded(me, store, data)
    },
    onCompleted: (data, e) => {
      // @ts-expect-error STRICT_NULL_CHECK
      const errors = data.createUserAddress.userAddressOrErrors.errors
      if (errors) {
        onError(errors.map(error => error.message).join(", "))
      } else {
        onSuccess(data)
        closeModal()
      }
    },
    onError: e => {
      onError(e.message)
    },
  })
}
