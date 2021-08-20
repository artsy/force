import { commitMutation, graphql, Environment } from "relay-runtime"
import { useSystemContext } from "v2/System"
import { useArtworkInquiryRequestMutation } from "v2/__generated__/useArtworkInquiryRequestMutation.graphql"

interface UseInquiryRequest {
  artworkID: string
  message: string
}

export const useArtworkInquiryRequest = ({
  artworkID,
  message,
}: UseInquiryRequest) => {
  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const submitArtworkInquiryRequest = ({
    relayEnvironment = defaultRelayEnvironment,
  }: {
    relayEnvironment?: Environment
  } = {}) => {
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
            message,
          },
        },
      })
    })
  }

  return { submitArtworkInquiryRequest }
}
