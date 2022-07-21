import { graphql } from "react-relay"
import { CommitMutation } from "../Utils/commitMutation"
import { SelectShippingOptionMutation } from "__generated__/SelectShippingOptionMutation.graphql"

export const selectShippingOption = (
  commitMutation: CommitMutation,
  variables: SelectShippingOptionMutation["variables"]
) => {
  return commitMutation<SelectShippingOptionMutation>({
    variables,
    mutation: graphql`
      mutation SelectShippingOptionMutation(
        $input: CommerceSelectShippingOptionInput!
      ) {
        commerceSelectShippingOption(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              __typename
              order {
                lineItems {
                  edges {
                    node {
                      shippingQuoteOptions {
                        edges {
                          ...ShippingQuotes_shippingQuotes
                        }
                      }
                    }
                  }
                }
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
