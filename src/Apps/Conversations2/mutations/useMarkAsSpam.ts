import { graphql, useMutation } from "react-relay"
import { useMarkAsSpamMutation } from "__generated__/useMarkAsSpamMutation.graphql"

export const useMarkAsSpam = () => {
  return useMutation<useMarkAsSpamMutation>(graphql`
    mutation useMarkAsSpamMutation($input: UpdateMessageMutationInput!) {
      updateMessage(input: $input) {
        conversationOrError {
          __typename
          ... on UpdateMessageSuccess {
            conversation {
              initialMessage
            }
          }
          ... on UpdateMessageFailure {
            mutationError {
              message
            }
          }
        }
      }
    }
  `)
}
