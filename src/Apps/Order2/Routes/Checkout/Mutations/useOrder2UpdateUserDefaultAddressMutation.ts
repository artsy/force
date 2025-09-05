import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2UpdateUserDefaultAddressMutation as useOrder2UpdateUserDefaultAddressMutationType } from "__generated__/useOrder2UpdateUserDefaultAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2UpdateUserDefaultAddressMutation = () => {
  return useMutation<useOrder2UpdateUserDefaultAddressMutationType>({
    mutation: graphql`
      mutation useOrder2UpdateUserDefaultAddressMutation(
        $input: UpdateUserDefaultAddressInput!
      ) {
        updateUserDefaultAddress(input: $input) {
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
              isDefault
            }
            ... on Errors {
              errors {
                code
                message
              }
            }
          }
        }
      }
    `,
  })
}
