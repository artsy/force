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
                # Surface only the new pending offer's pricing (its recalculated
                # shipping & tax). We deliberately avoid refetching the order's
                # own pricing, which would overwrite the gallery-offer totals —
                # so accept/decline still shows the gallery offer.
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
