import { useMutation } from "Utils/Hooks/useMutation"
import type { useUnlinkSettingsLinkedAccountMutation } from "__generated__/useUnlinkSettingsLinkedAccountMutation.graphql"
import { graphql } from "react-relay"

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
