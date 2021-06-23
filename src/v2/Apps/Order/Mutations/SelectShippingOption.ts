import { graphql } from "react-relay"
import { CommitMutation } from "../Utils/commitMutation"
import { SelectShippingOptionMutation } from "v2/__generated__/SelectShippingOptionMutation.graphql"

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
