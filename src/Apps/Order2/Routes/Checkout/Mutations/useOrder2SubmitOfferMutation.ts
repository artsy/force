import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SubmitOfferMutation as useOrder2SubmitOfferMutationType } from "__generated__/useOrder2SubmitOfferMutation.graphql"

export const useOrder2SubmitOfferMutation = () => {
  return useMutation<useOrder2SubmitOfferMutationType>({
    mutation: graphql`
      mutation useOrder2SubmitOfferMutation(
        $input: CommerceSubmitOrderWithOfferInput!
      ) {
        submitOfferOrderWithConversation(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              order {
                state
                internalID
              }
            }
            ... on CommerceOrderRequiresAction {
              actionData {
                clientSecret
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}
