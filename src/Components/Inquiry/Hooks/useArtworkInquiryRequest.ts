import { ActionType, SentArtworkInquiry } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { Environment, commitMutation, graphql } from "react-relay"
import {
  SubmitInquiryRequestMutationInput,
  useArtworkInquiryRequestMutation,
} from "__generated__/useArtworkInquiryRequestMutation.graphql"
import { useInquiryContext } from "./useInquiryContext"

// Previously we were setting this to the number `6000`:
// https://github.com/artsy/force/blob/938ae6d7ac57c93141052dd05821d15850dbab63/src/desktop/components/inquiry_questionnaire/analytics/events.ts#L168
// This was introduced in this PR without comment: https://github.com/artsy/force/pull/4041
// We don't know why it was `6000` and are afraid to change it without understanding why.
// Here it's being cast as a string because the price is otherwise going to be a string.
const COMPLETELY_MYSTERIOUS_PRICE_DEFAULT = "6000"

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

  const { trackEvent } = useTracking()

  const submitArtworkInquiryRequest = ({
    artworkID,
    ...rest
  }: UseArtworkInquiryRequestInput) => {
    return new Promise((resolve, reject) => {
      commitMutation<useArtworkInquiryRequestMutation>(
        relayEnvironment.current as Environment,
        {
          onCompleted: (res, errors) => {
            if (errors !== null) {
              reject(errors)
              return
            }

            resolve(res)

            const inquiry = res.submitInquiryRequestMutation?.inquiryRequest
            const artwork = inquiry?.inquireable

            const options: SentArtworkInquiry = {
              action: ActionType.sentArtworkInquiry,
              artwork_id: artwork?.internalID as string,
              artwork_slug: artwork?.slug as string,
              inquiry_id: inquiry?.internalID as string,
              products: [
                {
                  price: artwork?.price || COMPLETELY_MYSTERIOUS_PRICE_DEFAULT,
                  product_id: artwork?.internalID as string,
                  quantity: 1,
                },
              ],
            }

            trackEvent(options)
          },
          mutation: graphql`
            mutation useArtworkInquiryRequestMutation(
              $input: SubmitInquiryRequestMutationInput!
            ) {
              submitInquiryRequestMutation(input: $input) {
                clientMutationId
                inquiryRequest {
                  internalID
                  inquireable {
                    ... on Artwork {
                      internalID
                      slug
                      price
                    }
                  }
                }
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
