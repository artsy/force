import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import type { useEditNotificationPreferencesMutation } from "__generated__/useEditNotificationPreferencesMutation.graphql"

export const useEditNotificationPreferences = () => {
  return useMutation<useEditNotificationPreferencesMutation>({
    mutation: graphql`
      mutation useEditNotificationPreferencesMutation(
        $input: updateNotificationPreferencesMutationInput!
      ) {
        updateNotificationPreferences(input: $input) {
          clientMutationId
        }
      }
    `,
  })
}
