import { commitMutation, Environment, graphql } from "relay-runtime"
import { AuthIntentMutation } from "./types"

export const followProfileMutation: AuthIntentMutation = (
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
        mutation AuthIntentFollowProfileMutation($input: FollowProfileInput!) {
          followProfile(input: $input) {
            profile {
              id
              isFollowed
            }
          }
        }
      `,
      // @ts-ignore UPGRADE RELAY 13
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
