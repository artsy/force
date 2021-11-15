import { Button, Flex, Spacer } from "@artsy/palette"
import { Counter_order } from "v2/__generated__/Counter_order.graphql"
import { CounterSubmitMutation } from "v2/__generated__/CounterSubmitMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "v2/Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "v2/Apps/Order/Components/CreditCardSummaryItem"
import {
  OrderStepper,
  counterofferFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { CountdownTimer } from "v2/Components/CountdownTimer"
import { Router } from "found"
import { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { ContextModule, OwnerType } from "@artsy/cohesion"

export interface CounterProps {
  order: Counter_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Counter/index.tsx")

@track()
export class CounterRoute extends Component<CounterProps> {
  constructor(props: CounterProps) {
    super(props)
    this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this)
  }

  submitPendingOffer(variables: CounterSubmitMutation["variables"]) {
    return this.props.commitMutation<CounterSubmitMutation>({
      // TODO: Inputs to the mutation might have changed case of the keys!
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

  onSubmitButtonPressed = async () => {
    try {
      const {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        commerceSubmitPendingOffer: { orderOrError },
      } = await this.submitPendingOffer({
        input: {
          offerId: this.props.order.myLastOffer?.internalID!,
        },
      })

      if (orderOrError.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

      this.onSuccessfulSubmit()
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  handleSubmitError(error: { code: string }) {
    logger.error(error)
    if (error.code === "insufficient_inventory") {
      this.props.dialog.showErrorDialog({
        message: "Please contact orders@artsy.net with any questions.",
        title: "This work has already been sold.",
      })
    } else {
      this.props.dialog.showErrorDialog()
    }
  }

  @track<CounterProps>(props => ({
    action_type: Schema.ActionType.SubmittedCounterOffer,
    order_id: props.order.internalID,
  }))
  onSuccessfulSubmit() {
    this.props.router.push(`/orders/${this.props.order.internalID}/status`)
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.internalID}/respond`)
  }

  render() {
    const { order, isCommittingMutation } = this.props

    return (
      <>
        <OrderStepper currentStep="Review" steps={counterofferFlowSteps} />
        <TwoColumnLayout
          Content={
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
                  onChange={this.onChangeResponse}
                  offerContextPrice="LAST_OFFER"
                  showOfferNote={true}
                />
              </Flex>
              <Spacer mb={[2, 4]} />
              <Flex flexDirection="column" />
              <Media greaterThan="xs">
                <Button
                  onClick={this.onSubmitButtonPressed}
                  loading={isCommittingMutation}
                  variant="primaryBlack"
                  width="100%"
                >
                  Submit
                </Button>
                <Spacer mb={2} />
                <ConditionsOfSaleDisclaimer textAlign="center" />
              </Media>
            </Flex>
          }
          Sidebar={
            <Flex flexDirection="column">
              <Flex flexDirection="column">
                <ArtworkSummaryItem order={order} />
                <ShippingSummaryItem order={order} locked />
                <CreditCardSummaryItem order={order} locked />
              </Flex>
              <BuyerGuarantee
                contextModule={ContextModule.ordersCounter}
                contextPageOwnerType={OwnerType.ordersCounter}
              />
              <Media greaterThan="xs">
                <Spacer mb={2} />
              </Media>
              <Spacer mb={[2, 4]} />
              <Media at="xs">
                <>
                  <Button
                    onClick={this.onSubmitButtonPressed}
                    loading={isCommittingMutation}
                    variant="primaryBlack"
                    width="100%"
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer />
                </>
              </Media>
            </Flex>
          }
        />
      </>
    )
  }
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
        ...TransactionDetailsSummaryItem_order
        ...ArtworkSummaryItem_order
        ...ShippingSummaryItem_order
        ...CreditCardSummaryItem_order
        ...OfferHistoryItem_order
      }
    `,
  }
)
