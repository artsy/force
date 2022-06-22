import { Box, Button, Flex, Join, Message, Spacer } from "@artsy/palette"
import { Review_order } from "v2/__generated__/Review_order.graphql"
import { ReviewSubmitOfferOrderWithConversationMutation } from "v2/__generated__/ReviewSubmitOfferOrderWithConversationMutation.graphql"
import { ReviewSubmitOrderMutation } from "v2/__generated__/ReviewSubmitOrderMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "v2/Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ItemReviewFragmentContainer as ItemReview } from "v2/Apps/Order/Components/ItemReview"
import {
  OrderStepper,
  buyNowFlowSteps,
  offerFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { useTracking } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { RouteConfig, Router } from "found"
import { FC } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "../../Components/PaymentMethodSummaryItem"
import { OfferSummaryItemFragmentContainer as OfferSummaryItem } from "../../Components/OfferSummaryItem"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { createStripeWrapper } from "v2/Utils/createStripeWrapper"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { SystemContextProps, withSystemContext } from "v2/System"
import { ShippingArtaSummaryItemFragmentContainer } from "../../Components/ShippingArtaSummaryItem"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { extractNodes } from "v2/Utils/extractNodes"
export interface ReviewProps extends SystemContextProps {
  stripe: Stripe
  elements: StripeElements
  order: Review_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
  isEigen: boolean | undefined
}

const logger = createLogger("Order/Routes/Review/index.tsx")

const OrdersReviewOwnerType = OwnerType.ordersReview

export const ReviewRoute: FC<ReviewProps> = props => {
  const { trackEvent } = useTracking()
  const productId = extractNodes(props.order.lineItems)[0].artwork?.internalID

  const onSubmit = async (setupIntentId?: any) => {
    const submitEvent = {
      action_type:
        props.order.mode === "BUY"
          ? Schema.ActionType.SubmittedOrder
          : Schema.ActionType.SubmittedOffer,
      order_id: props.order.internalID,
      products: [
        {
          product_id: productId,
          quantity: 1,
          price: props.order.itemsTotal,
        },
      ],
    }
    trackEvent(submitEvent)

    try {
      const orderOrError =
        props.order.mode === "BUY"
          ? (await submitBuyOrder()).commerceSubmitOrder?.orderOrError
          : (await submitOffer(setupIntentId)).submitOfferOrderWithConversation
              ?.orderOrError
      if (orderOrError?.error) {
        handleSubmitError(orderOrError?.error!)
        return
      } else if (
        props.order.mode === "BUY" &&
        orderOrError?.actionData &&
        orderOrError.actionData.clientSecret
      ) {
        props.stripe
          .handleCardAction(orderOrError.actionData.clientSecret)
          .then(result => {
            if (result.error) {
              props.dialog.showErrorDialog({
                title: "An error occurred",
                message: result.error.message,
              })
              return
            } else {
              onSubmit()
            }
          })
      } else if (
        props.order.mode === "OFFER" &&
        orderOrError?.actionData &&
        orderOrError.actionData.clientSecret
      ) {
        props.stripe
          .confirmCardSetup(orderOrError.actionData.clientSecret)
          .then(result => {
            if (result.error) {
              props.dialog.showErrorDialog({
                title: "An error occurred",
                message: result.error.message,
              })
              return
            } else {
              onSubmit(result.setupIntent?.id)
            }
          })
      } else {
        const { order, router, isEigen, featureFlags } = props
        const isCBNEnabled =
          featureFlags?.["conversational-buy-now"]?.flagEnabled
        const orderId = order.internalID
        const conversationId = order.impulseConversationId

        const artworkId = get(
          order,
          o => o.lineItems?.edges?.[0]?.node?.artwork?.slug
        )

        if (
          order.mode === "OFFER" &&
          isEigen &&
          order.source === "artwork_page"
        ) {
          window?.ReactNativeWebView?.postMessage(
            JSON.stringify({
              key: "goToInboxOnMakeOfferSubmission",
              orderCode: order.code,
              message: `The seller will respond to your offer by ${order.stateExpiresAt}. Keep in mind making an offer doesn’t guarantee you the work.`,
            })
          )
          // We cannot expect Eigen to respond all the time to messages sent from the webview
          // a default fallback page is safer for old/broken Eigen versions
          setTimeout(() => {
            router.push(`/orders/${order.internalID}/status`)
          }, 500)
          return
        }

        // Eigen redirects to the status page for non-Offer orders (must keep the user inside the webview)
        // TODO: It must be only `if (isEigen) {` after removing the feature flag
        if ((!isCBNEnabled && order.mode !== "OFFER") || isEigen) {
          return router.push(`/orders/${orderId}/status`)
        }
        // Make offer and Purchase in inquiry redirects to the conversation page
        if (order.source === "inquiry") {
          return router.push(`/user/conversations/${conversationId}`)
        }
        // Make offer from the artwork page redirects to the artwork page with a confirmation modal
        if (order.mode === "OFFER") {
          return router.push(`/artwork/${artworkId}?order-submitted=true`)
        }
        // Purchase from the artwork page redirects to the status page
        if (isCBNEnabled) {
          return router.push(`/orders/${orderId}/status`)
        }
      }
    } catch (error) {
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  const submitBuyOrder = () => {
    return props.commitMutation<ReviewSubmitOrderMutation>({
      variables: {
        input: {
          id: props.order.internalID,
        },
      },
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation ReviewSubmitOrderMutation($input: CommerceSubmitOrderInput!) {
          commerceSubmitOrder(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
                }
              }
              ... on CommerceOrderRequiresAction {
                actionData {
                  clientSecret
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

  const submitOffer = (setupIntentId: string | null) => {
    return props.commitMutation<ReviewSubmitOfferOrderWithConversationMutation>(
      {
        variables: {
          input: {
            offerId: props.order.myLastOffer?.internalID,
            confirmedSetupIntentId: setupIntentId,
          },
        },
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: submitOfferOrderWithConversation,
      }
    )
  }

  const handleSubmitError = async (error: {
    code: string
    data: string | null
  }) => {
    logger.error(error)
    switch (error.code) {
      case "missing_required_info": {
        props.dialog.showErrorDialog({
          title: "Missing information",
          message:
            "Please review and update your shipping and/or payment details and try again.",
        })
        break
      }
      case "insufficient_inventory": {
        await props.dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        const artistId = getArtistId()
        if (artistId) {
          routeToArtistPage()
        }
        break
      }
      case "failed_charge_authorize": {
        const parsedData = JSON.parse(error.data!)
        props.dialog.showErrorDialog({
          title: "An error occurred",
          message: parsedData.failure_message,
        })
        break
      }
      case "charge_authorization_failed": {
        let data = {} as any
        if (error.data) {
          data = JSON.parse(error.data)
        }

        if (data.decline_code === "insufficient_funds") {
          await props.dialog.showErrorDialog({
            title: "Insufficient funds",
            message:
              "There aren't enough funds available on the payment methods you provided. Please contact your card provider or try another card.",
          })
        } else {
          await props.dialog.showErrorDialog({
            title: "Charge failed",
            message:
              "Payment authorization has been declined. Please contact your card provider and try again.",
          })
        }
        break
      }
      case "payment_method_confirmation_failed": {
        await props.dialog.showErrorDialog({
          title: "Your card was declined",
          message:
            "We couldn't authorize your credit card. Please enter another payment method or contact your bank for more information.",
        })
        break
      }
      case "artwork_version_mismatch": {
        await props.dialog.showErrorDialog({
          title: "Work has been updated",
          message:
            "Something about the work changed since you started checkout. Please review the work before submitting your order.",
        })
        routeToArtworkPage()
        break
      }
      default: {
        logger.error(error)
        props.dialog.showErrorDialog()
        break
      }
    }
  }

  const getArtistId = () => {
    return get(
      props.order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.artists?.[0]?.slug
    )
  }

  const routeToArtworkPage = () => {
    const artworkId = get(
      props.order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.slug
    )
    // Don't confirm whether or not you want to leave the page
    props.route.onTransition = () => null
    window.location.assign(`/artwork/${artworkId}`)
  }

  const routeToArtistPage = () => {
    const artistId = getArtistId()

    // Don't confirm whether or not you want to leave the page
    props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }

  const onChangeOffer = () => {
    props.router.push(`/orders/${props.order.internalID}/offer`)
  }

  const onChangePayment = () => {
    trackEvent({
      action: ActionType.clickedChangePaymentMethod,
      context_module: ContextModule.ordersReview,
      context_page_owner_type: OrdersReviewOwnerType,
    })
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }
  const onChangeShippingAddress = () => {
    trackEvent({
      action: ActionType.clickedChangeShippingAddress,
      context_module: ContextModule.ordersReview,
      context_page_owner_type: OrdersReviewOwnerType,
    })
    props.router.push(`/orders/${props.order.internalID}/shipping`)
  }

  const onChangeShippingMethod = () => {
    trackEvent({
      action: ActionType.clickedChangeShippingMethod,
      context_module: ContextModule.ordersReview,
      context_page_owner_type: OrdersReviewOwnerType,
    })
    props.router.push(`/orders/${props.order.internalID}/shipping`)
  }

  const { order, isCommittingMutation, isEigen, stripe } = props
  const submittable = !!stripe

  const SubmitButton: FC = () => (
    <Button
      variant="primaryBlack"
      width="100%"
      loading={isCommittingMutation}
      disabled={!submittable}
      onClick={onSubmit}
    >
      Submit
    </Button>
  )

  return (
    <Box data-test="orderReview">
      <OrderStepper
        currentStep="Review"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
      />
      <TwoColumnLayout
        Content={
          <Join separator={<Spacer mb={4} />}>
            <Flex flexDirection="column" mb={[2, 4]}>
              <Message mb={[2, 4]}>
                Disruptions caused by COVID-19 may cause delays — we appreciate
                your understanding.
              </Message>
              {isEigen && (
                <>
                  <SubmitButton />
                  <ConditionsOfSaleDisclaimer paddingY={2} textAlign="start" />
                </>
              )}
              {order.mode === "OFFER" && (
                <OfferSummaryItem order={order} onChange={onChangeOffer} />
              )}
              <ShippingSummaryItem
                order={order}
                onChange={onChangeShippingAddress}
              />
              <PaymentMethodSummaryItem
                order={order}
                onChange={onChangePayment}
                title="Payment method"
              />
              <ShippingArtaSummaryItemFragmentContainer
                order={order}
                onChange={onChangeShippingMethod}
                title="Shipping"
              />
            </Flex>
            <Media greaterThan="xs">
              <ItemReview lineItem={order?.lineItems?.edges?.[0]?.node!} />
              <Spacer mb={2} />
              <SubmitButton />
              <Spacer mb={2} />
              <ConditionsOfSaleDisclaimer textAlign="center" />
            </Media>
          </Join>
        }
        Sidebar={
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <ArtworkSummaryItem order={order} />
              <TransactionDetailsSummaryItem
                order={order}
                transactionStep="review"
              />
            </Flex>
            <BuyerGuarantee
              contextModule={ContextModule.ordersReview}
              contextPageOwnerType={OwnerType.ordersReview}
            />
            <Spacer mb={[2, 4]} />
            <Media at="xs">
              <SubmitButton />
              <Spacer mb={2} />
              <ConditionsOfSaleDisclaimer />
            </Media>
          </Flex>
        }
      />
    </Box>
  )
}

export const ReviewFragmentContainer = createFragmentContainer(
  withSystemContext(
    createStripeWrapper(injectCommitMutation(injectDialog(ReviewRoute)) as any)
  ),
  {
    order: graphql`
      fragment Review_order on CommerceOrder {
        internalID
        mode
        code
        source
        itemsTotal(precision: 2)
        impulseConversationId
        stateExpiresAt(format: "MMM D")
        lineItems {
          edges {
            node {
              ...ItemReview_lineItem
              artwork {
                slug
                internalID
                artists {
                  slug
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          myLastOffer {
            hasDefiniteTotal
            internalID
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...ShippingSummaryItem_order
        ...PaymentMethodSummaryItem_order
        ...ShippingArtaSummaryItem_order
        ...OfferSummaryItem_order
      }
    `,
  }
)

const submitOfferOrderWithConversation = graphql`
  mutation ReviewSubmitOfferOrderWithConversationMutation(
    $input: CommerceSubmitOrderWithOfferInput!
  ) {
    submitOfferOrderWithConversation(input: $input) {
      orderOrError {
        ... on CommerceOrderWithMutationSuccess {
          order {
            state
          }
        }
        ... on CommerceOrderRequiresAction {
          actionData {
            clientSecret
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
`
