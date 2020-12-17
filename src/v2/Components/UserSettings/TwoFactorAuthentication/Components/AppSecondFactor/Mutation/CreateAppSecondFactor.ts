import {
  CreateAppSecondFactorInput,
  CreateAppSecondFactorMutation,
  CreateAppSecondFactorMutationResponse,
} from "v2/__generated__/CreateAppSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const CreateAppSecondFactor = (
  environment: Environment,
  input: CreateAppSecondFactorInput
) => {
  return new Promise<CreateAppSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<CreateAppSecondFactorMutation>(environment, {
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
        onCompleted: data => {
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
        variables: {
          input,
        },
      })
    }
  )
}
