import {
  DeliverSecondFactorInput,
  DeliverSecondFactorMutation,
  DeliverSecondFactorMutation$data,
} from "__generated__/DeliverSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const DeliverSecondFactor = (
  environment: Environment,
  input: DeliverSecondFactorInput
) => {
  return new Promise<DeliverSecondFactorMutation$data>(
    async (resolve, reject) => {
      commitMutation<DeliverSecondFactorMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
        variables: {
          input,
        },
      })
    }
  )
}
