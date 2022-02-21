import { Environment, commitMutation, graphql } from "relay-runtime"

import {
  CreateBackupSecondFactorsMutation,
  CreateBackupSecondFactorsMutation$data,
} from "v2/__generated__/CreateBackupSecondFactorsMutation.graphql"

export const CreateBackupSecondFactors = (environment: Environment) => {
  return new Promise<CreateBackupSecondFactorsMutation$data>(
    async (resolve, reject) => {
      commitMutation<CreateBackupSecondFactorsMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
