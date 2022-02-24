import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useEditNotificationPreferencesMutation } from "v2/__generated__/useEditNotificationPreferencesMutation.graphql"

export const useEditNotificationPreferences = () => {
  return useMutation<useEditNotificationPreferencesMutation>({
    mutation: graphql`
      mutation useEditNotificationPreferencesMutation(
        $input: updateNotificationPreferencesMutationInput!
      ) {
        updateNotificationPreferences(input: $input) {
          notificationPreferences {
            id
            name
            channel
            status
          }
        }
      }
    `,
  })
}
