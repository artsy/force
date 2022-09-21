import {
  CreateSmsSecondFactorInput,
  CreateSmsSecondFactorMutation,
  CreateSmsSecondFactorMutation$data,
} from "__generated__/CreateSmsSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const CreateSmsSecondFactor = (
  environment: Environment,
  input: CreateSmsSecondFactorInput
) => {
  return new Promise<CreateSmsSecondFactorMutation$data>(
    async (resolve, reject) => {
      commitMutation<CreateSmsSecondFactorMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          const response = data.createSmsSecondFactor.secondFactorOrErrors

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
          mutation CreateSmsSecondFactorMutation(
            $input: CreateSmsSecondFactorInput!
          ) @raw_response_type {
            createSmsSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SmsSecondFactor {
                  __typename
                  internalID
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
