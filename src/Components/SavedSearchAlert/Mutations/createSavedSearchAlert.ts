import {
  createSavedSearchAlertMutation,
  createSavedSearchAlertMutation$data,
} from "__generated__/createSavedSearchAlertMutation.graphql"
import { commitMutation, Environment, graphql } from "relay-runtime"
import {
  SavedSearchAleftFormValues,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"

export const createSavedSearchAlert = (
  environment: Environment,
  userAlertSettings: SavedSearchAleftFormValues,
  attributes: SearchCriteriaAttributes
): Promise<createSavedSearchAlertMutation$data> => {
  return new Promise((resolve, reject) => {
    commitMutation<createSavedSearchAlertMutation>(environment, {
      mutation: graphql`
        mutation createSavedSearchAlertMutation(
          $input: CreateSavedSearchInput!
        ) {
          createSavedSearch(input: $input) {
            me {
              counts {
                savedSearches
              }
            }
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
