import { MakeInquiryOrderMutation } from "v2/__generated__/MakeInquiryOrderMutation.graphql"
import {
  Environment,
  MutationConfig,
  commitMutation,
  graphql,
} from "relay-runtime"

export const MakeInquiryOrder = (
  environment: Environment,
  conversationID: string,
  artworkID: string,
  editionSetID: string | null,
  onCompleted: MutationConfig<any>["onCompleted"],
  onError: MutationConfig<any>["onError"]
) => {
  return commitMutation<MakeInquiryOrderMutation>(environment, {
    onError,
    onCompleted,
    mutation: graphql`
      mutation MakeInquiryOrderMutation(
        $input: CommerceCreateInquiryOrderWithArtworkInput!
      ) {
        createInquiryOrder(input: $input) {
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
