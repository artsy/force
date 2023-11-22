import { commitMutation, graphql } from "react-relay"
import { FairOrganizerFollowMutation } from "__generated__/FairOrganizerFollowMutation.graphql"
import { Environment } from "react-relay"

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
        mutation FairOrganizerFollowMutation($input: FollowProfileInput!)
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
