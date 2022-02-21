import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useCreateSettingsBackupSecondFactorsMutation,
  useCreateSettingsBackupSecondFactorsMutation$data,
  CreateBackupSecondFactorsInput,
} from "v2/__generated__/useCreateSettingsBackupSecondFactorsMutation.graphql"

export const useCreateSettingsBackupSecondFactors = () => {
  const { relayEnvironment } = useSystemContext()

  const submitCreateSettingsBackupSecondFactors = (
    input: CreateBackupSecondFactorsInput = {}
  ): Promise<useCreateSettingsBackupSecondFactorsMutation$data> => {
    return new Promise((resolve, reject) => {
      commitMutation<useCreateSettingsBackupSecondFactorsMutation>(
        relayEnvironment!,
        {
          onError: reject,
          onCompleted: (res, errors) => {
            if (errors !== null) {
              reject(errors)
              return
            }

            resolve(res)
          },
          mutation: graphql`
            mutation useCreateSettingsBackupSecondFactorsMutation(
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
                }
              }
            }
          `,
          variables: { input },
        }
      )
    })
  }

  return { submitCreateSettingsBackupSecondFactors }
}
