import { commitMutation, graphql } from "react-relay"
import { AuthIntentMutation } from "./types"
import { AuthIntentCreateOrderMutation } from "__generated__/AuthIntentCreateOrderMutation.graphql"
import { Environment } from "react-relay"

export const createOrderMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
  secondaryId: string | null | undefined
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentCreateOrderMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }
        const orderID =
          res.commerceCreateOrderWithArtwork?.orderOrError.order?.internalID

        resolve(res)
        window.location.assign(`/orders/${orderID}/shipping`)
      },
      mutation: graphql`
        mutation AuthIntentCreateOrderMutation(
          $input: CommerceCreateOrderWithArtworkInput!
        ) @raw_response_type {
          commerceCreateOrderWithArtwork(input: $input) {
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
