import {
  createCollectionMutation,
  createCollectionMutation$data,
} from "__generated__/createCollectionMutation.graphql"
import { commitMutation, Environment, graphql } from "relay-runtime"
import { CreateNewListValues } from "Apps/CollectorProfile/Routes/Saves2/types"

export const createCollection = (
  environment: Environment,
  input: CreateNewListValues
): Promise<createCollectionMutation$data> => {
  return new Promise((resolve, reject) => {
    commitMutation<createCollectionMutation>(environment, {
      mutation: graphql`
        mutation createCollectionMutation($input: createCollectionInput!) {
          createCollection(input: $input) {
            responseOrError {
              ... on CreateCollectionSuccess {
                collection {
                  internalID
                }
              }

              ... on CreateCollectionFailure {
                mutationError {
                  message
                }
              }
            }
          }
        }
      `,
      variables: {
        input: {
          ...input,
        },
      },
      onCompleted: response => {
        resolve(response)
      },
      onError: error => {
        reject(error)
      },
    })
  })
}
