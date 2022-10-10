import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useRequestPriceEstimateMutation } from "__generated__/useRequestPriceEstimateMutation.graphql"

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
