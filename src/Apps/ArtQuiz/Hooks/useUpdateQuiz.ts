import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateQuizMutation } from "__generated__/useUpdateQuizMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateQuiz = () => {
  return useMutation<useUpdateQuizMutation>({
    mutation: graphql`
      mutation useUpdateQuizMutation($input: updateQuizMutationInput!) {
        updateQuiz(input: $input) {
          quiz {
            completedAt
          }
        }
      }
    `,
  })
}
