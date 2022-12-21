import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateQuizMutation } from "__generated__/useUpdateQuizMutation.graphql"

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
