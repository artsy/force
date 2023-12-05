import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useCreateSavedAddressMutation } from "__generated__/useCreateSavedAddressMutation.graphql"

export const useCreateSavedAddress = () => {
  return useMutation<useCreateSavedAddressMutation>({
    mutation: graphql`
      mutation useCreateSavedAddressMutation($input: CreateUserAddressInput!) {
        createUserAddress(input: $input) {
          me {
            ...Shipping2_me
          }
          userAddressOrErrors {
            __typename
            ... on Errors {
              errors {
                message
              }
            }
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
          }
        }
      }
    `,
  })
}
