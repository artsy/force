import {
  EnableSecondFactorInput,
  EnableSecondFactorMutation,
  EnableSecondFactorMutation$data,
} from "__generated__/EnableSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const EnableSecondFactor = (
  environment: Environment,
  input: EnableSecondFactorInput
) => {
  return new Promise<EnableSecondFactorMutation$data>(
    async (resolve, reject) => {
      commitMutation<EnableSecondFactorMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
              recoveryCodes
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
