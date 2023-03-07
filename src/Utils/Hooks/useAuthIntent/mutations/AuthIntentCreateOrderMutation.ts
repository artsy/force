import { commitMutation, Environment, graphql } from "relay-runtime"
import { AuthIntentMutation } from "./types"
import { AuthIntentCreateOrderMutation } from "__generated__/AuthIntentCreateOrderMutation.graphql"

export const createOrderMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentCreateOrderMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        console.log({ XXXXXX: res })
        console.log({ XXXXXX: errors })
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentCreateOrderMutation(
          $input: CommerceCreateOrderWithArtworkInput!
        ) @raw_response_type {
          commerceCreateOrderWithArtwork(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  mode
                }
              }
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
      // optimisticResponse: {
      //   saveArtwork: {
      //     artwork: {
      //       id,
      //       isSaved: true,
      //     },
      //   },
      // },
      variables: {
        input: {
          artworkId: id,
          // editionSetId: selectedEditionSet?.internalID,
        },
      },
    })
  })
}
