import { commitMutation, graphql } from "relay-runtime"
import {
  SubmitInquiryRequestMutationInput,
  useArtworkInquiryRequestMutation,
} from "v2/__generated__/useArtworkInquiryRequestMutation.graphql"
import { useInquiryContext } from "./useInquiryContext"

type UseArtworkInquiryRequestInput = Omit<
  SubmitInquiryRequestMutationInput,
  "inquireableID" | "inquireableType" | "message"
> & {
  artworkID: string
  message: string
  contactGallery?: boolean | null
}

export const useArtworkInquiryRequest = () => {
  const { relayEnvironment } = useInquiryContext()

  const submitArtworkInquiryRequest = ({
    artworkID,
    ...rest
  }: UseArtworkInquiryRequestInput) => {
    return new Promise((resolve, reject) => {
      commitMutation<useArtworkInquiryRequestMutation>(
        relayEnvironment.current!,
        {
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
        }
      )
    })
  }

  return { submitArtworkInquiryRequest }
}
