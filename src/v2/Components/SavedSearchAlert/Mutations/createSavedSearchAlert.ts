import {
  createSavedSearchAlertMutation,
  createSavedSearchAlertMutationResponse,
} from "v2/__generated__/createSavedSearchAlertMutation.graphql"
import { commitMutation, Environment, graphql } from "relay-runtime"
import { SavedSearchAleftFormValues, SearchCriteriaAttributes } from "../types"

export const createSavedSearchAlert = (
  environment: Environment,
  userAlertSettings: SavedSearchAleftFormValues,
  attributes: SearchCriteriaAttributes
): Promise<createSavedSearchAlertMutationResponse> => {
  return new Promise((resolve, reject) => {
    commitMutation<createSavedSearchAlertMutation>(environment, {
      mutation: graphql`
        mutation createSavedSearchAlertMutation(
          $input: CreateSavedSearchInput!
        ) {
          createSavedSearch(input: $input) {
            savedSearchOrErrors {
              ... on SearchCriteria {
                internalID
              }
            }
          }
        }
      `,
      variables: {
        input: {
          attributes,
          userAlertSettings,
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
