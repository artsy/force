import {
  UpdateAppSecondFactorInput,
  UpdateAppSecondFactorMutation,
  UpdateAppSecondFactorMutation$data,
} from "__generated__/UpdateAppSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const UpdateAppSecondFactor = (
  environment: Environment,
  input: UpdateAppSecondFactorInput
) => {
  return new Promise<UpdateAppSecondFactorMutation$data>(
    async (resolve, reject) => {
      commitMutation<UpdateAppSecondFactorMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          const response = data.updateAppSecondFactor.secondFactorOrErrors

          switch (response.__typename) {
            case "AppSecondFactor":
              resolve(data)
              break
            case "Errors":
              reject(response.errors)
              break
          }
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation UpdateAppSecondFactorMutation(
            $input: UpdateAppSecondFactorInput!
          ) @raw_response_type {
            updateAppSecondFactor(input: $input) {
              secondFactorOrErrors {
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
