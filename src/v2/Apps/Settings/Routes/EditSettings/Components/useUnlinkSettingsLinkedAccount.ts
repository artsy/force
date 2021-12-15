import { graphql } from "react-relay"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { useUnlinkSettingsLinkedAccountMutation } from "v2/__generated__/useUnlinkSettingsLinkedAccountMutation.graphql"

export const useUnlinkSettingsLinkedAccount = () => {
  return useMutation<useUnlinkSettingsLinkedAccountMutation>({
    mutation: graphql`
      mutation useUnlinkSettingsLinkedAccountMutation(
        $input: UnlinkAuthenticationMutationInput!
      ) {
        unlinkAuthentication(input: $input) {
          me {
            ...SettingsEditSettingsLinkedAccounts_me
          }
        }
      }
    `,
  })
}
