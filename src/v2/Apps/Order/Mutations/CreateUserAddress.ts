import { graphql } from "react-relay"
import { UserAddressAttributes } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import {
  CreateUserAddressMutation,
  CreateUserAddressMutationResponse,
} from "v2/__generated__/CreateUserAddressMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"
import { RecordSourceSelectorProxy, ConnectionHandler } from "relay-runtime"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"

const onAddressAdded = (
  me: SavedAddresses_me,
  store: RecordSourceSelectorProxy<any>,
  data: CreateUserAddressMutationResponse
): void => {
  const response = data?.createUserAddress?.userAddressOrErrors

  if (response) {
    const meStore = store.get(me.id)
    const connection = ConnectionHandler.getConnection(
      meStore,
      "SavedAddresses_addressConnection"
    )
    const mutationPayload = store.getRootField("createUserAddress")

    const createUserAddressOrError = mutationPayload.getLinkedRecord(
      "userAddressOrErrors"
    )
    // const createUserAddressEdge = createUserAddressOrError.getLinkedRecord(
    //   "edges"
    // )
    ConnectionHandler.insertEdgeAfter(connection, createUserAddressOrError)
  }
}

export const createUserAddress = async (
  commitMutation: CommitMutation,
  address: UserAddressAttributes,
  onSuccess: (address: CreateUserAddressMutationResponse | null) => void,
  onError: (message: string | null) => void,
  closeModal?: () => void,
  me?: SavedAddresses_me
) => {
  const response = await commitMutation<CreateUserAddressMutation>({
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
    updater: (store, data) => {
      console.log("🚀 ~ file: CreateUserAddress.ts ~ line 51 ~ data", data)
      onAddressAdded(me, store, data)
    },
  })

  const errors = response?.createUserAddress?.userAddressOrErrors?.errors
  closeModal()

  if (errors) {
    onError(errors.map(error => error.message).join(", "))
  } else {
    onSuccess(response)
  }
}
