import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { UsePartnerOfferCheckoutMutation } from "__generated__/UsePartnerOfferCheckoutMutation.graphql"

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
