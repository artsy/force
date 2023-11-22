import { commitMutation, graphql } from "react-relay"
import { AuthIntentMutation } from "./types"
import { AuthIntentCreateOfferOrderMutation } from "__generated__/AuthIntentCreateOfferOrderMutation.graphql"
import { Environment } from "react-relay"

export const createOfferOrderMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
  secondaryId: string | null | undefined
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentCreateOfferOrderMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }
        const orderID =
          res.commerceCreateOfferOrderWithArtwork?.orderOrError.order
            ?.internalID

        resolve(res)
        window.location.assign(`/orders/${orderID}/offer`)
      },
      mutation: graphql`
        mutation AuthIntentCreateOfferOrderMutation(
          $input: CommerceCreateOfferOrderWithArtworkInput!
        ) @raw_response_type {
          commerceCreateOfferOrderWithArtwork(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  mode
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
      variables: {
        input: {
          artworkId: id,
          editionSetId: secondaryId,
        },
      },
    })
  })
}
