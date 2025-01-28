import type { AuthIntentFollowMarketingCollectionMutation } from "__generated__/AuthIntentFollowMarketingCollectionMutation.graphql"
import { commitMutation, graphql } from "react-relay"
import type { Environment } from "react-relay"
import type { AuthIntentMutation } from "./types"
export const followMarketingCollectionMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentFollowMarketingCollectionMutation>(
      relayEnvironment,
      {
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation AuthIntentFollowMarketingCollectionMutation(
            $input: FollowMarketingCollectionInput!
          ) @raw_response_type {
            followMarketingCollection(input: $input) {
              marketingCollection {
                id
                isFollowed
              }
            }
          }
        `,
        optimisticResponse: {
          followMarketingCollection: {
            marketingCollection: {
              id,
              isFollowed: true,
            },
          },
        },
        variables: {
          input: {
            marketingCollectionID: id,
          },
        },
      },
    )
  })
}
