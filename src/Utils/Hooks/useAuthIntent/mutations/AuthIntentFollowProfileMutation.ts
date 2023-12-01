import { commitMutation, graphql } from "react-relay"
import { AuthIntentMutation } from "./types"
import { AuthIntentFollowProfileMutation } from "__generated__/AuthIntentFollowProfileMutation.graphql"
import { Environment } from "react-relay"

export const followProfileMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentFollowProfileMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentFollowProfileMutation($input: FollowProfileInput!)
          @raw_response_type {
          followProfile(input: $input) {
            profile {
              id
              isFollowed
            }
          }
        }
      `,
      optimisticResponse: {
        followProfile: {
          profile: {
            id,
            isFollowed: true,
          },
        },
      },
      variables: {
        input: {
          profileID: id,
        },
      },
    })
  })
}
