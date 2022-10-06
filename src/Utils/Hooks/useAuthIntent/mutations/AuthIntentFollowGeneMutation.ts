import { commitMutation, Environment, graphql } from "relay-runtime"
import { AuthIntentMutation } from "./types"
import { AuthIntentFollowGeneMutation } from "__generated__/AuthIntentFollowGeneMutation.graphql"

export const followGeneMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentFollowGeneMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentFollowGeneMutation($input: FollowGeneInput!)
          @raw_response_type {
          followGene(input: $input) {
            gene {
              id
              isFollowed
            }
          }
        }
      `,
      optimisticResponse: {
        followGene: {
          gene: {
            id,
            isFollowed: true,
          },
        },
      },
      variables: {
        input: {
          geneID: id,
        },
      },
    })
  })
}
