import { useSystemContext } from "System/Hooks/useSystemContext"
import type {
  CreateBackupSecondFactorsInput,
  useCreateSettingsBackupSecondFactorsMutation,
  useCreateSettingsBackupSecondFactorsMutation$data,
} from "__generated__/useCreateSettingsBackupSecondFactorsMutation.graphql"
import { commitMutation, graphql } from "react-relay"

export const useCreateSettingsBackupSecondFactors = () => {
  const { relayEnvironment } = useSystemContext()

  const submitCreateSettingsBackupSecondFactors = (
    input: CreateBackupSecondFactorsInput,
  ): Promise<useCreateSettingsBackupSecondFactorsMutation$data> => {
    return new Promise((resolve, reject) => {
      commitMutation<useCreateSettingsBackupSecondFactorsMutation>(
        relayEnvironment,
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
        },
      )
    })
  }

  return { submitCreateSettingsBackupSecondFactors }
}
