import { commitMutation, Environment, graphql } from "react-relay";
import { DeleteMyAccountMutationResponse, DeleteMyAccountMutation } from "v2/__generated__/DeleteMyAccountMutation.graphql"

export const deleteMyAccount = (
  environment: Environment,
  explanation: string,
  url: string
) => {
  return new Promise<DeleteMyAccountMutationResponse>((resolve, reject) => {
    commitMutation<DeleteMyAccountMutation>(environment, {
      variables: {
        input: {
            explanation: explanation,
            url: url,
          },
      },
      mutation: graphql`
        mutation DeleteMyAccountMutation($input: DeleteAccountInput!) {
          deleteMyAccountMutation(input: $input) {
            userAccountOrError {
              ... on AccountMutationSuccess {
                success
              }

              ...on AccountMutationFailure {
                mutationError {
                  type
                  message
                  detail
                }
              }
            }
          }
        }
      `,
      onCompleted: (data) => {
        const errors = data.deleteMyAccountMutation?.userAccountOrError?.mutationError
        if (errors) {
          reject(errors)
        } else {
          resolve(data)
        }
      },
    })
  })
}