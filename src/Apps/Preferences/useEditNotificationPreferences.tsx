import { useMutation } from "Utils/Hooks/useMutation"
import type { useEditNotificationPreferencesMutation } from "__generated__/useEditNotificationPreferencesMutation.graphql"
import { graphql } from "react-relay"

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
