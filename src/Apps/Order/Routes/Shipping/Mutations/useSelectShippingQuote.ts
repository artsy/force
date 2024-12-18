import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import type { useSelectShippingQuoteMutation } from "__generated__/useSelectShippingQuoteMutation.graphql"

export const useSelectShippingQuote = () => {
  return useMutation<useSelectShippingQuoteMutation>({
    mutation: graphql`
      mutation useSelectShippingQuoteMutation(
        $input: CommerceSelectShippingOptionInput!
      ) {
        commerceSelectShippingOption(input: $input) {
          orderOrError {
            __typename
            ... on CommerceOrderWithMutationSuccess {
              order {
                ...Shipping_order
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
