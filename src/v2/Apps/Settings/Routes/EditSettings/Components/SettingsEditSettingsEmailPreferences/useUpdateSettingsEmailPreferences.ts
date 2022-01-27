import { graphql } from "react-relay"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { useUpdateSettingsEmailPreferencesMutation } from "v2/__generated__/useUpdateSettingsEmailPreferencesMutation.graphql"

export const useUpdateSettingsEmailPreferences = () => {
  return useMutation<useUpdateSettingsEmailPreferencesMutation>({
    mutation: graphql`
      mutation useUpdateSettingsEmailPreferencesMutation(
        $input: UpdateMyProfileInput!
      ) {
        updateMyUserProfile(input: $input) {
          me {
            ...SettingsEditSettingsEmailPreferences_me
          }
        }
      }
    `,
  })
}
