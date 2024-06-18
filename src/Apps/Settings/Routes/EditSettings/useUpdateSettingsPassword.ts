import { commitMutation, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  useUpdateSettingsPasswordMutation,
  UpdateMyPasswordMutationInput,
  useUpdateSettingsPasswordMutation$data,
} from "__generated__/useUpdateSettingsPasswordMutation.graphql"

export const useUpdateSettingsPassword = () => {
  const { relayEnvironment } = useSystemContext()

  const submitUpdateSettingsPassword = (
    input: UpdateMyPasswordMutationInput
  ): Promise<useUpdateSettingsPasswordMutation$data> => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateSettingsPasswordMutation>(relayEnvironment, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useUpdateSettingsPasswordMutation(
            $input: UpdateMyPasswordMutationInput!
          ) {
            updateMyPassword(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: { input },
      })
    })
  }

  return { submitUpdateSettingsPassword }
}
