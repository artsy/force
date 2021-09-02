import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useUpdateCollectorProfileMutation,
  UpdateCollectorProfileInput,
} from "v2/__generated__/useUpdateCollectorProfileMutation.graphql"

export const useUpdateCollectorProfile = () => {
  const { relayEnvironment } = useSystemContext()

  const submitUpdateCollectorProfile = (
    input: UpdateCollectorProfileInput = {}
  ) => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateCollectorProfileMutation>(relayEnvironment!, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useUpdateCollectorProfileMutation(
            $input: UpdateCollectorProfileInput!
          ) {
            updateCollectorProfile(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: { input },
      })
    })
  }

  return { submitUpdateCollectorProfile }
}
