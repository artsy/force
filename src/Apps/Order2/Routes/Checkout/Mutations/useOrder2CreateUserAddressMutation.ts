import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2CreateUserAddressMutation as useOrder2CreateUserAddressMutationType } from "__generated__/useOrder2CreateUserAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2CreateUserAddressMutation = () => {
  return useMutation<useOrder2CreateUserAddressMutationType>({
    mutation: graphql`
      mutation useOrder2CreateUserAddressMutation(
        $input: CreateUserAddressInput!
      ) {
        createUserAddress(input: $input) {
          me {
            ...Order2DeliveryForm_me
          }
          userAddressOrErrors {
            ... on UserAddress {
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
            ... on Errors {
              errors {
                code
              }
            }
          }
        }
      }
    `,
  })
}
