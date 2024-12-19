import { useMutation } from "Utils/Hooks/useMutation"
import type { UsePartnerOfferCheckoutMutation } from "__generated__/UsePartnerOfferCheckoutMutation.graphql"
import { graphql } from "react-relay"

export const usePartnerOfferCheckoutMutation = () => {
  return useMutation<UsePartnerOfferCheckoutMutation>({
    mutation: graphql`
      mutation UsePartnerOfferCheckoutMutation(
        $input: CommerceCreatePartnerOfferOrderInput!
      ) {
        commerceCreatePartnerOfferOrder(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              __typename
              order {
                internalID
                mode
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}
