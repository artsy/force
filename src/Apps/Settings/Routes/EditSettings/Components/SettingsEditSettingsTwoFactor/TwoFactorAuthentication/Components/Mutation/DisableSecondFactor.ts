import {
  DisableSecondFactorInput,
  DisableSecondFactorMutation,
  DisableSecondFactorMutation$data,
} from "__generated__/DisableSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const DisableSecondFactor = (
  environment: Environment,
  input: DisableSecondFactorInput
) => {
  return new Promise<DisableSecondFactorMutation$data>(
    async (resolve, reject) => {
      commitMutation<DisableSecondFactorMutation>(environment, {
        mutation: graphql`
          mutation DisableSecondFactorMutation(
            $input: DisableSecondFactorInput!
          ) @raw_response_type {
            disableSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on AppSecondFactor {
                  __typename
                }

                ... on SmsSecondFactor {
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

        onCompleted: (data, err) => {
          if (err) {
            reject(err)
          } else if (data.disableSecondFactor) {
            const response = data.disableSecondFactor.secondFactorOrErrors

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
          }
        },
        variables: {
          input,
        },
      })
    }
  )
}
