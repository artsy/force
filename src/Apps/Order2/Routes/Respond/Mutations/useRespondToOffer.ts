import type { RespondAction } from "Apps/Order2/Routes/Respond/RespondContext/types"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useRespondToOfferAcceptMutation } from "__generated__/useRespondToOfferAcceptMutation.graphql"
import type { useRespondToOfferCounterMutation } from "__generated__/useRespondToOfferCounterMutation.graphql"
import type { useRespondToOfferDeclineMutation } from "__generated__/useRespondToOfferDeclineMutation.graphql"
import { graphql } from "react-relay"

interface RespondToOfferArgs {
  action: RespondAction
  // The gallery offer being responded to (its internalID).
  offerId: string
  // Required for COUNTEROFFER — the buyer's offer in minor units (cents).
  amountCents?: number
}

const FAILURE = "CommerceOrderWithMutationFailure"

/**
 * Sends the buyer's response (accept / counteroffer / decline) to the offer.
 *
 * The exchange backend is shared with the legacy order flow, so this reuses the
 * legacy `CommerceBuyer{Accept,Counter,Reject}Offer` mutations. The promise
 * rejects when the mutation returns a failure union member.
 */
export const useRespondToOffer = () => {
  const { submitMutation: acceptOffer } =
    useMutation<useRespondToOfferAcceptMutation>({ mutation: ACCEPT_MUTATION })
  const { submitMutation: counterOffer } =
    useMutation<useRespondToOfferCounterMutation>({
      mutation: COUNTER_MUTATION,
    })
  const { submitMutation: declineOffer } =
    useMutation<useRespondToOfferDeclineMutation>({
      mutation: DECLINE_MUTATION,
    })

  const respondToOffer = ({
    action,
    offerId,
    amountCents,
  }: RespondToOfferArgs) => {
    switch (action) {
      case "APPROVE":
        return acceptOffer({
          variables: { input: { offerId } },
          rejectIf: res =>
            res.commerceBuyerAcceptOffer?.orderOrError.__typename === FAILURE,
        })
      case "COUNTEROFFER":
        return counterOffer({
          variables: { input: { offerId, amountCents: amountCents ?? 0 } },
          rejectIf: res =>
            res.commerceBuyerCounterOffer?.orderOrError.__typename === FAILURE,
        })
      case "DECLINE":
        return declineOffer({
          variables: { input: { offerId } },
          rejectIf: res =>
            res.commerceBuyerRejectOffer?.orderOrError.__typename === FAILURE,
        })
    }
  }

  return { respondToOffer }
}

const ACCEPT_MUTATION = graphql`
  mutation useRespondToOfferAcceptMutation(
    $input: CommerceBuyerAcceptOfferInput!
  ) {
    commerceBuyerAcceptOffer(input: $input) {
      orderOrError {
        __typename
        ... on CommerceOrderWithMutationFailure {
          error {
            code
            data
            type
          }
        }
      }
    }
  }
`

const COUNTER_MUTATION = graphql`
  mutation useRespondToOfferCounterMutation(
    $input: CommerceBuyerCounterOfferInput!
  ) {
    commerceBuyerCounterOffer(input: $input) {
      orderOrError {
        __typename
        ... on CommerceOrderWithMutationFailure {
          error {
            code
            data
            type
          }
        }
      }
    }
  }
`

const DECLINE_MUTATION = graphql`
  mutation useRespondToOfferDeclineMutation(
    $input: CommerceBuyerRejectOfferInput!
  ) {
    commerceBuyerRejectOffer(input: $input) {
      orderOrError {
        __typename
        ... on CommerceOrderWithMutationFailure {
          error {
            code
            data
            type
          }
        }
      }
    }
  }
`
