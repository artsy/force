import { graphql, useMutation } from "react-relay"
import { useDismissInquiryMutation } from "__generated__/useDismissInquiryMutation.graphql"

export const useDismissInquiry = () => {
  return useMutation<useDismissInquiryMutation>(graphql`
    mutation useDismissInquiryMutation(
      $input: UpdateConversationMutationInput!
    ) {
      updateConversation(input: $input) {
        conversation {
          internalID
        }
      }
    }
  `)
}
