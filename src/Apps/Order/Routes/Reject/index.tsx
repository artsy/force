import { Button, Flex, Text, Spacer } from "@artsy/palette"
import { Reject_order$data } from "__generated__/Reject_order.graphql"
import { RejectOfferMutation } from "__generated__/RejectOfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { Router } from "found"
import { FC } from "react"
import { CountdownTimer } from "Components/CountdownTimer"
import { StepSummaryItem } from "Components/StepSummaryItem"
import { Media } from "Utils/Responsive"
import { logger } from "Apps/Order/Routes/Respond"
import { counterofferFlowSteps } from "Apps/Order/Components/OrderStepper"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { createFragmentContainer, graphql } from "react-relay"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"

interface RejectProps {
  order: Reject_order$data
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const Reject: FC<RejectProps> = ({
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
            offerId: order.lastOffer?.internalID!,
          },
        })
      ).commerceBuyerRejectOffer?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      router.push(`/orders/${order.internalID}/status`)
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
              countdownStart={order.lastOffer?.createdAt!}
              countdownEnd={order.stateExpiresAt!}
            />
            <StepSummaryItem
              title="Decline seller's offer"
              onChange={onChangeResponse}
            >
              <Text variant="xs" color="black60">
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
  }
)
