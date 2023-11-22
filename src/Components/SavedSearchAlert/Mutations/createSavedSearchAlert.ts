import {
  createSavedSearchAlertMutation,
  createSavedSearchAlertMutation$data,
} from "__generated__/createSavedSearchAlertMutation.graphql"
import {
  SavedSearchAlertFormValues,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { commitMutation, Environment, graphql } from "react-relay"

export const createSavedSearchAlert = (
  environment: Environment,
  userAlertSettings: SavedSearchAlertFormValues,
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
