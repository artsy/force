import { useMutation } from "Utils/Hooks/useMutation"
import type { useRequestPriceEstimateMutation } from "__generated__/useRequestPriceEstimateMutation.graphql"
import { graphql } from "react-relay"

export const useRequestPriceEstimate = () => {
  return useMutation<useRequestPriceEstimateMutation>({
    mutation: graphql`
      mutation useRequestPriceEstimateMutation(
        $input: RequestPriceEstimateInput!
      ) {
        requestPriceEstimate(input: $input) {
          priceEstimateParamsOrError {
            ... on RequestPriceEstimatedMutationSuccess {
              submittedPriceEstimateParams {
                artworkId
              }
            }
            ... on RequestPriceEstimatedMutationFailure {
              mutationError {
                error
              }
            }
          }
        }
      }
    `,
  })
}
