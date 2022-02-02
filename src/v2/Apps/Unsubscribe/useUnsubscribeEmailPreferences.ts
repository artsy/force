import { graphql } from "react-relay"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { useUnsubscribeEmailPreferencesMutation } from "v2/__generated__/useUnsubscribeEmailPreferencesMutation.graphql"

export const useUnsubscribeEmailPreferences = () => {
  return useMutation<useUnsubscribeEmailPreferencesMutation>({
    mutation: graphql`
      mutation useUnsubscribeEmailPreferencesMutation(
        $input: UpdateMyProfileInput!
      ) {
        updateMyUserProfile(input: $input) {
          me {
            ...UnsubscribeLoggedIn_me
          }
        }
      }
    `,
  })
}
