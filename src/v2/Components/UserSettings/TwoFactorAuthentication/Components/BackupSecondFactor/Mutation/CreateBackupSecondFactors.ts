import { Environment, commitMutation, graphql } from "relay-runtime"

import {
  CreateBackupSecondFactorsMutation,
  CreateBackupSecondFactorsMutationResponse,
} from "v2/__generated__/CreateBackupSecondFactorsMutation.graphql"

export const CreateBackupSecondFactors = (environment: Environment) => {
  return new Promise<CreateBackupSecondFactorsMutationResponse>(
    async (resolve, reject) => {
      commitMutation<CreateBackupSecondFactorsMutation>(environment, {
        onCompleted: data => {
          const response = data.createBackupSecondFactors.secondFactorsOrErrors

          switch (response.__typename) {
            case "BackupSecondFactors":
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
          mutation CreateBackupSecondFactorsMutation(
            $input: CreateBackupSecondFactorsInput!
          ) {
            createBackupSecondFactors(input: $input) {
              secondFactorsOrErrors {
                ... on BackupSecondFactors {
                  __typename
                  secondFactors {
                    code
                  }
                }

                ... on Errors {
                  __typename
                  errors {
                    code
                    message
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {},
        },
      })
    }
  )
}
