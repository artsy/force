import { graphql } from "react-relay"
import { UserAddressAttributes } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import {
  CreateUserAddressMutation,
  CreateUserAddressMutationResponse,
} from "v2/__generated__/CreateUserAddressMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

export const createUserAddress = async (
  commitMutation: CommitMutation,
  address: UserAddressAttributes,
  onSuccess: (address: CreateUserAddressMutationResponse | null) => void,
  onError: (message: string | null) => void
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
  })

  const errors = response?.createUserAddress?.userAddressOrErrors?.errors
  console.log("🚀 ~ file: CreateUserAddress.ts ~ line 41 ~ response", response)
  console.log("🚀 ~ file: CreateUserAddress.ts ~ line 41 ~ errors", errors)

  if (errors) {
    onError(errors.map(error => error.message).join(", "))
  } else {
    onSuccess(response)
  }
}
