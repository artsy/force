import { commitMutation, graphql } from "react-relay"
import { AuthIntentFollowArtistMutation } from "__generated__/AuthIntentFollowArtistMutation.graphql"
import { AuthIntentMutation } from "./types"
import { Environment } from "react-relay"

export const followArtistMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentFollowArtistMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentFollowArtistMutation($input: FollowArtistInput!)
          @raw_response_type {
          followArtist(input: $input) {
            artist {
              id
              isFollowed
            }
          }
        }
      `,
      optimisticResponse: {
        followArtist: {
          artist: {
            id,
            isFollowed: true,
          },
        },
      },
      variables: {
        input: {
          artistID: id,
        },
      },
    })
  })
}
