import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import { useAddArtistYouCollectMutation } from "v2/__generated__/useAddArtistYouCollectMutation.graphql"

export const useAddArtistYouCollect = () => {
  const { relayEnvironment } = useSystemContext()

  const submitAddArtistYouCollect = (artistID: string) => {
    return new Promise((resolve, reject) => {
      commitMutation<useAddArtistYouCollectMutation>(relayEnvironment!, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useAddArtistYouCollectMutation(
            $input: CreateUserInterestMutationInput!
          ) {
            createUserInterest(input: $input) {
              clientMutationId
              me {
                ...SettingsEditProfileArtistsYouCollect_me
                ...SettingsEditProfileYourGalleryIntro_me
              }
            }
          }
        `,
        variables: {
          input: {
            category: "COLLECTED_BEFORE",
            interestType: "ARTIST",
            interestId: artistID,
          },
        },
      })
    })
  }

  return { submitAddArtistYouCollect }
}
