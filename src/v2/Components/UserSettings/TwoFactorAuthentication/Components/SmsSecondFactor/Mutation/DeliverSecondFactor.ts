import {
  DeliverSecondFactorInput,
  DeliverSecondFactorMutation,
  DeliverSecondFactorMutationResponse,
} from "v2/__generated__/DeliverSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const DeliverSecondFactor = (
  environment: Environment,
  input: DeliverSecondFactorInput
) => {
  return new Promise<DeliverSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<DeliverSecondFactorMutation>(environment, {
        mutation: graphql`
          mutation DeliverSecondFactorMutation(
            $input: DeliverSecondFactorInput!
          ) @raw_response_type {
            deliverSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SmsSecondFactor {
                  __typename
                  formattedPhoneNumber
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
        onCompleted: data => {
          const response = data.deliverSecondFactor.secondFactorOrErrors

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
