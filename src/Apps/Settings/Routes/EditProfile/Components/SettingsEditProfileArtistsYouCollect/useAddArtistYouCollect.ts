import { useSystemContext } from "System/Hooks/useSystemContext"
import type { useAddArtistYouCollectMutation } from "__generated__/useAddArtistYouCollectMutation.graphql"
import { commitMutation, graphql } from "react-relay"

export const useAddArtistYouCollect = () => {
  const { relayEnvironment } = useSystemContext()

  const submitAddArtistYouCollect = (artistID: string) => {
    return new Promise((resolve, reject) => {
      commitMutation<useAddArtistYouCollectMutation>(relayEnvironment, {
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
