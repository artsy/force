import { useMutation } from "Utils/Hooks/useMutation"
import type { CreateBankDebitSetupForOrderMutation } from "__generated__/CreateBankDebitSetupForOrderMutation.graphql"
import { graphql } from "react-relay"

export const CreateBankDebitSetupForOrder = () => {
  return useMutation<CreateBankDebitSetupForOrderMutation>({
    mutation: graphql`
      mutation CreateBankDebitSetupForOrderMutation(
        $input: CommerceCreateBankDebitSetupForOrderInput!
      ) {
        commerceCreateBankDebitSetupForOrder(input: $input) {
          actionOrError {
            __typename
            ... on CommerceOrderRequiresAction {
              actionData {
                clientSecret
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                code
                data
                type
              }
            }
          }
        }
      }
    `,
  })
}
