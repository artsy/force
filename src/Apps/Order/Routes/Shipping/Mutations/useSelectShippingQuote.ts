import { useMutation } from "Utils/Hooks/useMutation"
import type { useSelectShippingQuoteMutation } from "__generated__/useSelectShippingQuoteMutation.graphql"
import { graphql } from "react-relay"

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
