import { graphql } from "react-relay"
import {
  CreateUserAddressMutation,
  CreateUserAddressMutation$data,
  UserAddressAttributes,
} from "v2/__generated__/CreateUserAddressMutation.graphql"
import {
  RecordSourceSelectorProxy,
  ConnectionHandler,
  Environment,
} from "relay-runtime"
import { SavedAddresses_me$data } from "v2/__generated__/SavedAddresses_me.graphql"
import { Shipping_me$data } from "v2/__generated__/Shipping_me.graphql"
import { commitMutation } from "relay-runtime"

const onAddressAdded = (
  me: SavedAddresses_me$data | Shipping_me$data,
  store: RecordSourceSelectorProxy<any>,
  data: CreateUserAddressMutation$data
): void => {
  const response = data?.createUserAddress?.userAddressOrErrors

  if (response) {
    const meStore = store.get(me.id)
    const connection = ConnectionHandler.getConnection(
      meStore!,
      "SavedAddresses_addressConnection"
    )
    const mutationPayload = store.getRootField("createUserAddress")

    const createUserAddressOrError = mutationPayload.getLinkedRecord(
      "userAddressOrErrors"
    )
    ConnectionHandler.insertEdgeAfter(connection!, createUserAddressOrError)
  }
}

export const createUserAddress = async (
  environment: Environment,
  address: UserAddressAttributes,
  onSuccess: (address: CreateUserAddressMutation$data | null) => void,
  onError: (message: string | null) => void,
  me: SavedAddresses_me$data | Shipping_me$data,
  closeModal: () => void
) => {
  commitMutation<CreateUserAddressMutation>(environment, {
    variables: {
      input: {
        attributes: address,
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
    updater: (store, data: CreateUserAddressMutation$data) => {
      onAddressAdded(me, store, data)
    },
    onCompleted: (data, e) => {
      const errors = data.createUserAddress?.userAddressOrErrors.errors
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
