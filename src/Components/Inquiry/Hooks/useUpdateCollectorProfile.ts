import { Environment, commitMutation, graphql } from "react-relay"
import {
  useUpdateCollectorProfileMutation,
  UpdateCollectorProfileInput,
} from "__generated__/useUpdateCollectorProfileMutation.graphql"
import { useInquiryContext } from "./useInquiryContext"

export const useUpdateCollectorProfile = () => {
  const { relayEnvironment } = useInquiryContext()

  const submitUpdateCollectorProfile = (
    input: UpdateCollectorProfileInput = {}
  ) => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateCollectorProfileMutation>(
        relayEnvironment.current as Environment,
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
            mutation useUpdateCollectorProfileMutation(
              $input: UpdateCollectorProfileInput!
            ) {
              updateCollectorProfile(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: { input },
        }
      )
    })
  }

  return { submitUpdateCollectorProfile }
}
