import { commitMutation, Environment, graphql } from "relay-runtime"
import { AuthIntentMutation } from "./types"

export const saveArtworkMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentSaveArtworkMutation($input: SaveArtworkInput!) {
          saveArtwork(input: $input) {
            artwork {
              id
              isSaved
            }
          }
        }
      `,
      // @ts-ignore UPGRADE RELAY 13
      optimisticResponse: {
        saveArtwork: {
          artwork: {
            id,
            isSaved: true,
          },
        },
      },
      variables: {
        input: {
          artworkID: id,
        },
      },
    })
  })
}
