import type { AuthIntentCreateOfferOrderMutation } from "__generated__/AuthIntentCreateOfferOrderMutation.graphql"
import { commitMutation, graphql } from "react-relay"
import type { Environment } from "react-relay"
import type { AuthIntentMutation } from "./types"

export const createOfferOrderMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
  secondaryId: string | null | undefined,
  featureFlags?: { isEnabled: (flag: string) => boolean },
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

        const orderUrlBase = featureFlags?.isEnabled(
          "emerald_checkout-redesign",
        )
          ? "orders2"
          : "orders"

        resolve(res)
        window.location.assign(`/${orderUrlBase}/${orderID}/offer`)
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
