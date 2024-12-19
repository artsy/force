import { useSystemContext } from "System/Hooks/useSystemContext"
import type { useRemoveArtistYouCollectMutation } from "__generated__/useRemoveArtistYouCollectMutation.graphql"
import { commitMutation, graphql } from "react-relay"

export const useRemoveArtistYouCollect = () => {
  const { relayEnvironment } = useSystemContext()

  const submitRemoveArtistYouCollect = (artistID: string) => {
    return new Promise((resolve, reject) => {
      commitMutation<useRemoveArtistYouCollectMutation>(relayEnvironment, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useRemoveArtistYouCollectMutation(
            $input: DeleteUserInterestMutationInput!
          ) {
            deleteUserInterest(input: $input) {
              clientMutationId
              me {
                ...SettingsEditProfileArtistsYouCollect_me
              }
            }
          }
        `,
        variables: { input: { id: artistID } },
      })
    })
  }

  return { submitRemoveArtistYouCollect }
}
