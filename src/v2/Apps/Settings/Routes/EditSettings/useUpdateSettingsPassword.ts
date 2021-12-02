import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useUpdateSettingsPasswordMutation,
  UpdateMyPasswordMutationInput,
  useUpdateSettingsPasswordMutationResponse,
} from "v2/__generated__/useUpdateSettingsPasswordMutation.graphql"

export const useUpdateSettingsPassword = () => {
  const { relayEnvironment } = useSystemContext()

  const submitUpdateSettingsPassword = (
    input: UpdateMyPasswordMutationInput
  ): Promise<useUpdateSettingsPasswordMutationResponse> => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateSettingsPasswordMutation>(relayEnvironment!, {
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
