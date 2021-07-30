import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useInquiryRequestMutation,
  SubmitInquiryRequestMutationInput,
} from "v2/__generated__/useInquiryRequestMutation.graphql"

interface UseInquiryRequest {
  input: SubmitInquiryRequestMutationInput
}

export const useInquiryRequest = ({ input }: UseInquiryRequest) => {
  const { relayEnvironment } = useSystemContext()

  const submitInquiryRequest = () => {
    return new Promise((resolve, reject) => {
      commitMutation<useInquiryRequestMutation>(relayEnvironment!, {
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useInquiryRequestMutation(
            $input: SubmitInquiryRequestMutationInput!
          ) {
            submitInquiryRequestMutation(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: { input },
      })
    })
  }

  return { submitInquiryRequest }
}
