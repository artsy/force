import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2CreateCounterOfferMutation as useOrder2CreateCounterOfferMutationType } from "__generated__/useOrder2CreateCounterOfferMutation.graphql"

export const useOrder2CreateCounterOfferMutation = () => {
  return useMutation<useOrder2CreateCounterOfferMutationType>({
    mutation: graphql`
      mutation useOrder2CreateCounterOfferMutation(
        $input: createBuyerOfferInput!
      ) {
        createBuyerOffer(input: $input) {
          offerOrError {
            ... on OfferMutationSuccess {
              __typename
              offer {
                internalID
                # The counteroffer's recalculated totals (incl. shipping & tax)
                # come through the pending offer's own breakdown below. We only
                # surface that — refetching the order's pricing would overwrite
                # the gallery-offer totals with the counteroffer's, so the buyer
                # still sees the gallery offer if they switch to accept/decline.
                order {
                  id
                  pendingOffer {
                    pricingBreakdownLines {
                      __typename
                      ... on ShippingLine {
                        displayName
                        amountFallbackText
                        amount {
                          amount
                          currencySymbol
                        }
                      }
                      ... on TaxLine {
                        displayName
                        amountFallbackText
                        amount {
                          amount
                          currencySymbol
                        }
                      }
                      ... on SubtotalLine {
                        displayName
                        amount {
                          amount
                          currencySymbol
                        }
                      }
                      ... on TotalLine {
                        displayName
                        amountFallbackText
                        amount {
                          display
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on OfferMutationError {
              mutationError {
                code
                message
              }
            }
          }
        }
      }
    `,
  })
}
