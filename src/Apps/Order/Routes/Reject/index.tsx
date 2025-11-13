import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { counterofferFlowSteps } from "Apps/Order/Components/OrderStepper"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import { logger } from "Apps/Order/Routes/Respond"
import {
  type CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { CountdownTimer } from "Components/CountdownTimer"
import { StepSummaryItem } from "Components/StepSummaryItem"
import { Media } from "Utils/Responsive"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import type { Reject_order$data } from "__generated__/Reject_order.graphql"
import type { RejectOfferMutation } from "__generated__/RejectOfferMutation.graphql"
import type { Router } from "found"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface RejectProps {
  order: Reject_order$data
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const Reject: FC<React.PropsWithChildren<RejectProps>> = ({
  order,
  router,
  dialog,
  commitMutation,
  isCommittingMutation,
}) => {
  const rejectOffer = (variables: RejectOfferMutation["variables"]) => {
    return commitMutation<RejectOfferMutation>({
      variables,
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation RejectOfferMutation($input: CommerceBuyerRejectOfferInput!) {
          commerceBuyerRejectOffer(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  ... on CommerceOfferOrder {
                    awaitingResponseFrom
                  }
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

  const onSubmit = async () => {
    try {
      const orderOrError = (
        await rejectOffer({
          input: {
            offerId: order.lastOffer?.internalID as string,
          },
        })
      ).commerceBuyerRejectOffer?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      router.push(`/orders/${order.internalID}/details`)
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const onChangeResponse = () => {
    router.push(`/orders/${order.internalID}/respond`)
  }

  return (
    <OrderRouteContainer
      order={order}
      currentStep="Review"
      steps={counterofferFlowSteps}
      content={
        <Flex
          flexDirection="column"
          style={isCommittingMutation ? { pointerEvents: "none" } : {}}
        >
          <Media at="xs">
            <Flex flexDirection="column">
              <ArtworkSummaryItem order={order} />
            </Flex>
            <Spacer y={2} />
          </Media>
          <Flex flexDirection="column">
            <CountdownTimer
              action="Respond"
              note="Expired offers end the negotiation process permanently."
              countdownStart={order.lastOffer?.createdAt as string}
              countdownEnd={order.stateExpiresAt!}
            />
            <StepSummaryItem
              title="Decline seller's offer"
              onChange={onChangeResponse}
            >
              <Text variant="xs" color="mono60">
                Declining an offer permanently ends the negotiation process. The
                seller will not be able to make a counteroffer.
              </Text>
            </StepSummaryItem>
          </Flex>
          <Spacer y={[2, 4]} />
          <Media greaterThan="xs">
            <Button
              onClick={onSubmit}
              loading={isCommittingMutation}
              variant="primaryBlack"
              width="50%"
            >
              Submit
            </Button>
            <Spacer y={2} />
            <ConditionsOfSaleDisclaimer />
          </Media>
        </Flex>
      }
      sidebar={
        <Flex flexDirection="column">
          <Media greaterThan="xs">
            <Flex flexDirection="column">
              <ArtworkSummaryItem order={order} />
            </Flex>
            <Spacer y={2} />
          </Media>
          <Media at="xs">
            <>
              <Button
                onClick={onSubmit}
                loading={isCommittingMutation}
                variant="primaryBlack"
                width="100%"
              >
                Submit
              </Button>
              <Spacer y={2} />
              <ConditionsOfSaleDisclaimer />
            </>
          </Media>
        </Flex>
      }
    />
  )
}

export const RejectFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(Reject)),
  {
    order: graphql`
      fragment Reject_order on CommerceOrder {
        internalID
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          lastOffer {
            internalID
            createdAt
          }
        }
        ...ArtworkSummaryItem_order
        ...OrderStepper_order
      }
    `,
  },
)
