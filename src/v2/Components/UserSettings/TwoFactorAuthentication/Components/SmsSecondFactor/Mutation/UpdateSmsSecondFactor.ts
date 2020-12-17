import {
  UpdateSmsSecondFactorInput,
  UpdateSmsSecondFactorMutation,
  UpdateSmsSecondFactorMutationResponse,
} from "v2/__generated__/UpdateSmsSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const UpdateSmsSecondFactor = (
  environment: Environment,
  input: UpdateSmsSecondFactorInput
) => {
  return new Promise<UpdateSmsSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<UpdateSmsSecondFactorMutation>(environment, {
        mutation: graphql`
          mutation UpdateSmsSecondFactorMutation(
            $input: UpdateSmsSecondFactorInput!
          ) @raw_response_type {
            updateSmsSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SmsSecondFactor {
                  __typename
                }

                ... on Errors {
                  __typename
                  errors {
                    message
                    code
                    data
                  }
                }
              }
            }
          }
        `,
        onCompleted: data => {
          const response = data.updateSmsSecondFactor.secondFactorOrErrors

          switch (response.__typename) {
            case "SmsSecondFactor":
              resolve(data)
              break
            case "Errors":
              reject(response.errors)
          }
        },
        onError: error => {
          reject(error)
        },
        variables: {
          input,
        },
      })
    }
  )
}
