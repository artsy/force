import {
  createAdvisoryOpportunityMutation$data,
  createAdvisoryOpportunityMutation,
} from "__generated__/createAdvisoryOpportunityMutation.graphql"
import { commitMutation, Environment, graphql } from "relay-runtime"

interface MutationInput {
  searchCriteriaID: string
  message: string
  phoneNumber: string
  phoneCountryCode: string
}

export const createAdvisoryOpportunity = (
  environment: Environment,
  attributes: MutationInput
): Promise<createAdvisoryOpportunityMutation$data> => {
  return new Promise((resolve, reject) => {
    commitMutation<createAdvisoryOpportunityMutation>(environment, {
      mutation: graphql`
        mutation createAdvisoryOpportunityMutation(
          $input: createAdvisoryOpportunityMutationInput!
        ) {
          createAdvisoryOpportunity(input: $input) {
            advisoryOpportunityOrError {
              ... on createAdvisoryOpportunitySuccess {
                advisoryOpportunity {
                  internalID
                }
              }
            }
          }
        }
      `,
      variables: {
        input: {
          ...attributes,
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
