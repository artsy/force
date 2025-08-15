import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2UpdateUserAddressMutation as useOrder2UpdateUserAddressMutationType } from "__generated__/useOrder2UpdateUserAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2UpdateUserAddressMutation = () => {
  return useMutation<useOrder2UpdateUserAddressMutationType>({
    mutation: graphql`
      mutation useOrder2UpdateUserAddressMutation(
        $input: UpdateUserAddressInput!
      ) {
        updateUserAddress(input: $input) {
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
