import { MakeInquiryOfferMutation } from "v2/__generated__/MakeInquiryOfferMutation.graphql"
import {
  Environment,
  MutationConfig,
  commitMutation,
  graphql,
} from "relay-runtime"

export const MakeInquiryOffer = (
  environment: Environment,
  conversationID: string,
  artworkID: string,
  editionSetID: string | null,
  onCompleted: MutationConfig<any>["onCompleted"],
  onError: MutationConfig<any>["onError"]
) => {
  return commitMutation<MakeInquiryOfferMutation>(environment, {
    onError,
    onCompleted,
    mutation: graphql`
      mutation MakeInquiryOfferMutation(
        $input: CommerceCreateInquiryOfferOrderWithArtworkInput!
      ) {
        createInquiryOfferOrder(input: $input) {
          orderOrError {
            __typename
            ... on CommerceOrderWithMutationSuccess {
              order {
                internalID
                mode
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
    variables: {
      input: {
        artworkId: artworkID,
        editionSetId: editionSetID,
        impulseConversationId: conversationID,
      },
    },
  })
}
