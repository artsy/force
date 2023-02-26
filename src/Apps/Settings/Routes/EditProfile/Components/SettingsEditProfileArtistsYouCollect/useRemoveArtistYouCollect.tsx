import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "System/useSystemContext"
import { useRemoveArtistYouCollectMutation } from "__generated__/useRemoveArtistYouCollectMutation.graphql"

export const useRemoveArtistYouCollect = () => {
  const { relayEnvironment } = useSystemContext()

  const submitRemoveArtistYouCollect = (artistID: string) => {
    return new Promise((resolve, reject) => {
      commitMutation<useRemoveArtistYouCollectMutation>(relayEnvironment!, {
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
