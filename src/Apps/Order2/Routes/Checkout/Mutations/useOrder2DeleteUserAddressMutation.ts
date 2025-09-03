import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2DeleteUserAddressMutation as UseOrder2DeleteUserAddressMutationType } from "__generated__/useOrder2DeleteUserAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2DeleteUserAddressMutation = () => {
  return useMutation<UseOrder2DeleteUserAddressMutationType>({
    mutation: graphql`
      mutation useOrder2DeleteUserAddressMutation(
        $input: DeleteUserAddressInput!
      ) {
        deleteUserAddress(input: $input) {
          me {
            addressConnection(first: 20) {
              edges {
                node {
                  internalID
                  name
                  addressLine1
                  addressLine2
                  city
                  region
                  postalCode
                  country
                  phoneNumber
                  phoneNumberCountryCode
                }
              }
            }
          }
          userAddressOrErrors {
            __typename
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
}
