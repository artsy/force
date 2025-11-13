import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { counterofferFlowSteps } from "Apps/Order/Components/OrderStepper"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  type CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { CountdownTimer } from "Components/CountdownTimer"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button, Flex, Spacer } from "@artsy/palette"
import type { Counter_order$data } from "__generated__/Counter_order.graphql"
import type { CounterSubmitMutation } from "__generated__/CounterSubmitMutation.graphql"
import type { Router } from "found"
import type { FC } from "react"
import { createFragmentContainer, graphql, type RelayProp } from "react-relay"
import { useTracking } from "react-tracking"

export interface CounterProps {
  order: Counter_order$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Counter/index.tsx")

export const CounterRoute: FC<
  React.PropsWithChildren<CounterProps>
> = props => {
  const { order, router, dialog, commitMutation, isCommittingMutation } = props
  const { trackEvent } = useTracking()

  const submitPendingOffer = (
    variables: CounterSubmitMutation["variables"]
  ) => {
    return commitMutation<CounterSubmitMutation>({
      mutation: graphql`
        mutation CounterSubmitMutation(
          $input: CommerceSubmitPendingOfferInput!
        ) {
          commerceSubmitPendingOffer(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
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
      variables,
    })
  }

  const onSubmitButtonPressed = async () => {
    try {
      const orderOrError = (
        await submitPendingOffer({
          input: {
            offerId: order.myLastOffer?.internalID!,
          },
        })
      ).commerceSubmitPendingOffer?.orderOrError

      if (orderOrError?.error) {
        handleSubmitError(orderOrError.error)
        return
      }

      onSuccessfulSubmit()
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const handleSubmitError = (error: { code: string }) => {
    logger.error(error)
    if (error.code === "insufficient_inventory") {
      dialog.showErrorDialog({
        message: "Please contact orders@artsy.net with any questions.",
        title: "This work has already been sold.",
      })
    } else {
      dialog.showErrorDialog()
    }
  }

  const onSuccessfulSubmit = () => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.SubmittedCounterOffer,
      order_id: props.order.internalID,
    })

    router.push(`/orders/${order.internalID}/details`)
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
          <Flex flexDirection="column">
            <CountdownTimer
              action="Respond"
              note="Expired offers end the negotiation process permanently."
              countdownStart={order.lastOffer?.createdAt!}
              countdownEnd={order.stateExpiresAt!}
            />
            <TransactionDetailsSummaryItem
              order={order}
              title="Your counteroffer"
              onChange={onChangeResponse}
              offerContextPrice="LAST_OFFER"
              showOfferNote={true}
            />
          </Flex>
          <Spacer y={[2, 4]} />
          <Media greaterThan="xs">
            <Button
              onClick={onSubmitButtonPressed}
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
          <Flex flexDirection="column">
            <ArtworkSummaryItem order={order} />

            <ShippingSummaryItem order={order} locked />

            <PaymentMethodSummaryItem order={order} locked />
          </Flex>
          <BuyerGuarantee
            contextModule={ContextModule.ordersCounter}
            contextPageOwnerType={OwnerType.ordersCounter}
          />
          <Spacer y={[2, 4]} />
          <Media at="xs">
            <>
              <Button
                onClick={onSubmitButtonPressed}
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

export const CounterFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(CounterRoute)),
  {
    order: graphql`
      fragment Counter_order on CommerceOrder {
        internalID
        mode
        state
        itemsTotal(precision: 2)
        stateExpiresAt
        ... on CommerceOfferOrder {
          lastOffer {
            createdAt
          }
          myLastOffer {
            internalID
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
        ...OrderStepper_order
        ...TransactionDetailsSummaryItem_order
        ...ArtworkSummaryItem_order
        ...ShippingSummaryItem_order
        ...PaymentMethodSummaryItem_order
        ...OfferHistoryItem_order
      }
    `,
  }
)
