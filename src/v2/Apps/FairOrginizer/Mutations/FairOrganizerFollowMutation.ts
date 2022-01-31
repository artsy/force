import { commitMutation, Environment, graphql } from "relay-runtime"
import { FairOrganizerFollowMutation } from "v2/__generated__/FairOrganizerFollowMutation.graphql"

export type FollowFairOrganizerMutationProps = (
  relayEnvironment: Environment,
  values: {
    id: string
    profileID: string
    isFollowed?: boolean
  }
) => Promise<unknown>

export const fairOrganizerFollowMutation: FollowFairOrganizerMutationProps = (
  relayEnvironment: Environment,
  values
) => {
  return new Promise((resolve, reject) => {
    commitMutation<FairOrganizerFollowMutation>(relayEnvironment, {
      onError: reject,
      onCompleted: (response, errors) => {
        if (errors !== null) {
          return reject(errors)
        }

        resolve(response)
      },
      mutation: graphql`
        mutation FairOrganizerFollowMutation($input: FollowProfileInput!) {
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
            id: values.id,
            isFollowed: !values.isFollowed,
          },
        },
      },
      variables: {
        input: {
          profileID: values.profileID,
          unfollow: !!values.isFollowed,
        },
      },
    })
  })
}
