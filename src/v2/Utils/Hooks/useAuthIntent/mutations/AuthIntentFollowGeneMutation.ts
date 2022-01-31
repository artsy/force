import { commitMutation, Environment, graphql } from "relay-runtime"
import { AuthIntentMutation } from "./types"

export const followGeneMutation: AuthIntentMutation = (
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
        mutation AuthIntentFollowGeneMutation($input: FollowGeneInput!) {
          followGene(input: $input) {
            gene {
              id
              isFollowed
            }
          }
        }
      `,
      // @ts-ignore UPGRADE RELAY 13
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
