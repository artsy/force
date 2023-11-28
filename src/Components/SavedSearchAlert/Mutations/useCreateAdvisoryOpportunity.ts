import { useCreateAdvisoryOpportunityMutation } from "__generated__/useCreateAdvisoryOpportunityMutation.graphql"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"

export const useCreateAdvisoryOpportunity = () => {
  return useMutation<useCreateAdvisoryOpportunityMutation>({
    mutation: graphql`
      mutation useCreateAdvisoryOpportunityMutation(
        $input: createAdvisoryOpportunityMutationInput!
      ) {
        createAdvisoryOpportunity(input: $input) {
          advisoryOpportunityOrError {
            ... on createAdvisoryOpportunitySuccess {
              advisoryOpportunity {
                internalID
              }
            }
            ... on createAdvisoryOpportunityFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })
}
