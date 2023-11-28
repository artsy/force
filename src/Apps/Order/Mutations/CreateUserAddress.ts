import { Environment, commitMutation, graphql } from "react-relay"
import {
  CreateUserAddressMutation,
  CreateUserAddressMutation$data,
  UserAddressAttributes,
} from "__generated__/CreateUserAddressMutation.graphql"
import { RecordSourceSelectorProxy, ConnectionHandler } from "relay-runtime"

const onAddressAdded = (
  me: { id: string },
  store: RecordSourceSelectorProxy<any>,
  data: CreateUserAddressMutation$data
): void => {
  const response = data?.createUserAddress?.userAddressOrErrors

  if (response) {
    const meStore = store.get(me.id)
    if (meStore) {
      const connection = ConnectionHandler.getConnection(
        meStore,
        "SavedAddresses_addressConnection"
      )
      const mutationPayload = store.getRootField("createUserAddress")

      const createUserAddressOrError = mutationPayload.getLinkedRecord(
        "userAddressOrErrors"
      )
      if (connection) {
        ConnectionHandler.insertEdgeAfter(connection, createUserAddressOrError)
      }
    }
  }
}

export const createUserAddress = async (
  environment: Environment,
  address: UserAddressAttributes,
  onSuccess: (address: CreateUserAddressMutation$data) => void,
  onError: (message: string) => void,
  me: { id: string },
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
      onAddressAdded(me, store as RecordSourceSelectorProxy, data)
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
