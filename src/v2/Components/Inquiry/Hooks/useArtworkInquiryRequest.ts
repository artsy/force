import { commitMutation, graphql, Environment } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  SubmitInquiryRequestMutationInput,
  useArtworkInquiryRequestMutation,
} from "v2/__generated__/useArtworkInquiryRequestMutation.graphql"

type UseArtworkInquiryRequestInput = Omit<
  SubmitInquiryRequestMutationInput,
  "inquireableID" | "inquireableType" | "message"
> & { relayEnvironment?: Environment; artworkID: string; message: string }

export const useArtworkInquiryRequest = () => {
  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const submitArtworkInquiryRequest = ({
    relayEnvironment = defaultRelayEnvironment,
    artworkID,
    ...rest
  }: UseArtworkInquiryRequestInput) => {
    return new Promise((resolve, reject) => {
      commitMutation<useArtworkInquiryRequestMutation>(relayEnvironment!, {
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useArtworkInquiryRequestMutation(
            $input: SubmitInquiryRequestMutationInput!
          ) {
            submitInquiryRequestMutation(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: {
            inquireableID: artworkID,
            inquireableType: "Artwork",
            ...rest,
          },
        },
      })
    })
  }

  return { submitArtworkInquiryRequest }
}
