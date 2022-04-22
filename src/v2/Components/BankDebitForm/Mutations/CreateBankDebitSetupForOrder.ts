import { graphql } from "relay-runtime"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { CreateBankDebitSetupForOrderMutation } from "v2/__generated__/CreateBankDebitSetupForOrderMutation.graphql"

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
