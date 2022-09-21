import {
  CreateAppSecondFactorInput,
  CreateAppSecondFactorMutation,
  CreateAppSecondFactorMutation$data,
} from "__generated__/CreateAppSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const CreateAppSecondFactor = (
  environment: Environment,
  input: CreateAppSecondFactorInput
) => {
  return new Promise<CreateAppSecondFactorMutation$data>(
    async (resolve, reject) => {
      commitMutation<CreateAppSecondFactorMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          const response = data.createAppSecondFactor.secondFactorOrErrors

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
          mutation CreateAppSecondFactorMutation(
            $input: CreateAppSecondFactorInput!
          ) @raw_response_type {
            createAppSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on AppSecondFactor {
                  __typename
                  internalID
                  otpSecret
                  otpProvisioningURI
                  name
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
