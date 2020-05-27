import {
  EnableSecondFactorInput,
  EnableSecondFactorMutation,
  EnableSecondFactorMutationResponse,
} from "v2/__generated__/EnableSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const EnableSecondFactor = (
  environment: Environment,
  input: EnableSecondFactorInput
) => {
  return new Promise<EnableSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<EnableSecondFactorMutation>(environment, {
        onCompleted: data => {
          const response = data.enableSecondFactor.secondFactorOrErrors

          switch (response.__typename) {
            case "AppSecondFactor":
              resolve(data)
              break
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
        mutation: graphql`
          mutation EnableSecondFactorMutation($input: EnableSecondFactorInput!)
            @raw_response_type {
            enableSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SmsSecondFactor {
                  __typename
                }

                ... on AppSecondFactor {
                  __typename
                }

                ... on Errors {
                  __typename
                  errors {
                    message
                    code
                  }
                }
              }
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}
