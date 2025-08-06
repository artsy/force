import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Button, Flex, Join, Spacer } from "@artsy/palette"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { AdditionalArtworkDetailsFragmentContainer as AdditionalArtworkDetails } from "Apps/Order/Components/AdditionalArtworkDetails"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ItemReviewFragmentContainer as ItemReview } from "Apps/Order/Components/ItemReview"
import { OfferSummaryItemFragmentContainer as OfferSummaryItem } from "Apps/Order/Components/OfferSummaryItem"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  privateFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { PartnerOfferTimerItem } from "Apps/Order/Components/PartnerOfferTimerItem"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { ShippingArtaSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingArtaSummaryItem"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import {
  type CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import {
  type SystemContextProps,
  withSystemContext,
} from "System/Contexts/SystemContext"
import type { RouteProps } from "System/Router/Route"
import { Media } from "Utils/Responsive"
import { createStripeWrapper } from "Utils/createStripeWrapper"
import { extractNodes } from "Utils/extractNodes"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import type { ReviewSubmitOfferOrderWithConversationMutation } from "__generated__/ReviewSubmitOfferOrderWithConversationMutation.graphql"
import type { ReviewSubmitOrderMutation } from "__generated__/ReviewSubmitOrderMutation.graphql"
import type { Review_order$data } from "__generated__/Review_order.graphql"
import type { Router } from "found"

import { type FC, useEffect, useState } from "react"
import { type RelayProp, createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface ReviewProps extends SystemContextProps {
  stripe: Stripe
  elements: StripeElements
  order: Review_order$data
  relay?: RelayProp
  router: Router
  route: RouteProps
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
  isEigen: boolean | undefined
}

const logger = createLogger("Order/Routes/Review/index.tsx")

const OrdersReviewOwnerType = OwnerType.ordersReview

export const ReviewRoute: FC<React.PropsWithChildren<ReviewProps>> = props => {
  const [isLoading, setIsLoading] = useState(true)
  const { trackEvent } = useTracking()
  const artworkVersion = extractNodes(props.order.lineItems)[0]?.artworkVersion
  const orderTracking = useOrderTracking()

  useEffect(() => {
    if (props.order) {
      setIsLoading(false)
    }
  }, [props.order])

  if (isLoading) {
    return null
  }

  const trackErrorMessageEvent = (
    title: string,
    message: string | undefined,
    code?: string,
  ) => {
    return trackEvent({
      action: ActionType.errorMessageViewed,
      context_owner_type: OwnerType.ordersReview,
      context_owner_id: props.order.internalID,
      title: title,
      message: message,
      error_code: code || null,
      flow: "user submits order",
    })
  }

  const onSubmit = async (setupIntentId?: any) => {
    if (props.order.mode === "BUY") {
      orderTracking.submittedOrder({
        order: props.order,
      })
    }

    if (props.order.mode === "OFFER") {
      orderTracking.submittedOffer({
        order: props.order,
      })
    }

    try {
      const orderOrError =
        props.order.mode === "BUY"
          ? (await submitBuyOrder()).commerceSubmitOrder?.orderOrError
          : (await submitOffer(setupIntentId)).submitOfferOrderWithConversation
              ?.orderOrError
      if (orderOrError?.error) {
        handleSubmitError(orderOrError?.error)
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
              trackErrorMessageEvent(
                "An error occurred",
                result.error.message,
                result.error.code,
              )

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
              trackErrorMessageEvent(
                "An error occurred",
                result.error.message,
                result.error.code,
              )

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
        const { order, router, isEigen } = props
        const orderId = order.internalID
        const conversationId = order.impulseConversationId

        if (isEigen) {
          const messagePayload = JSON.stringify({
            key: "orderSubmitted",
            orderId,
            isPurchase: props.order.mode === "BUY",
          })

          // iOS registers the ReactNativeWebView inside the webkit.messageHandlers
          if (window.webkit?.messageHandlers.ReactNativeWebView) {
            window.webkit?.messageHandlers.ReactNativeWebView.postMessage(
              messagePayload,
            )
          } else {
            window.ReactNativeWebView?.postMessage(messagePayload)
          }

          // Eigen redirects to the details page for non-Offer orders (must keep the user inside the webview)
          // We cannot expect Eigen to respond all the time to messages sent from the webview
          // a default fallback page is safer for old/broken Eigen versions
          setTimeout(() => {
            router.push(`/orders/${orderId}/details`)
          }, 500)
          return
        }

        // Make offer and Purchase in inquiry redirects to the conversation page
        if (order.source === "inquiry") {
          return router.push(`/user/conversations/${conversationId}`)
        }
        // Make offer and Purchase from the artwork page redirects to the details page
        return router.push(`/orders/${orderId}/details`)
      }
    } catch (error) {
      handleSubmitError(error)
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
      },
    )
  }

  const handleSubmitError = async (error: {
    code: string
    data: string | null | undefined
  }) => {
    logger.error({
      ...error,
      orderId: props.order.internalID,
      paymentMethod: props.order?.paymentMethod,
      shouldLogErrorToSentry: true,
    })

    switch (error.code) {
      case "missing_required_info": {
        const title = "Missing information"
        const message =
          "Please review and update your shipping and/or payment details and try again."

        trackErrorMessageEvent(title, message, error.code)

        props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        break
      }
      case "insufficient_inventory": {
        const title = "Not available"
        const message = "Sorry, the work is no longer available."

        trackErrorMessageEvent(title, message, error.code)

        await props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        routeToArtworkPage()
        break
      }
      case "failed_charge_authorize": {
        const parsedData = JSON.parse(error.data as any)
        const title = "An error occurred"
        const message = parsedData.failure_message

        trackErrorMessageEvent(title, message, error.code)

        props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        break
      }
      case "charge_authorization_failed": {
        let data = {} as any
        if (error.data) {
          data = JSON.parse(error.data)
        }

        if (data.decline_code === "insufficient_funds") {
          const title = "Insufficient funds"
          const message =
            "There aren't enough funds available on the payment methods you provided. Please contact your card provider or try another card."

          trackErrorMessageEvent(title, message, data.decline_code)

          await props.dialog.showErrorDialog({
            title: title,
            message: message,
          })
        } else if (data.decline_code === "currency_not_supported") {
          const { title, message, formattedMessage } = getErrorDialogCopy(
            ErrorDialogs.CurrencyNotSupported,
          )

          trackErrorMessageEvent(title, message, data.decline_code)

          await props.dialog.showErrorDialog({
            title: title,
            message: formattedMessage,
          })
        } else {
          const title = "Charge failed"
          const message =
            "Payment has been declined. Please contact your card provider or bank institution, then press “Submit” again. Alternatively, use another payment method."

          trackErrorMessageEvent(title, message, data.decline_code)

          await props.dialog.showErrorDialog({
            title: title,
            message: message,
          })
        }
        break
      }
      case "payment_method_confirmation_failed": {
        const title = "Your card was declined"
        const message =
          "We couldn't authorize your credit card. Please enter another payment method or contact your bank for more information."

        trackErrorMessageEvent(title, message, error.code)

        await props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        break
      }
      case "artwork_version_mismatch": {
        const title = "Work has been updated"
        const message =
          "Something about the work changed since you started checkout. Please review the work before submitting your order."

        trackErrorMessageEvent(title, message, error.code)

        await props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        routeToArtworkPage()
        break
      }
      case "stripe_account_inactive": {
        const title = "An error occurred"
        const message =
          "Your payment could not be processed. Please contact orders@artsy.net for assistance."

        trackErrorMessageEvent(title, message, error.code)

        await props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        break
      }
      case "credit_card_deactivated": {
        const title = "Unable to process card"
        const message =
          "This card is inactive or no longer available. Please confirm with your card issuer if this card is active, try another payment method, or contact orders@artsy.net."

        trackErrorMessageEvent(title, message, error.code)

        await props.dialog.showErrorDialog({
          title: title,
          message: message,
        })
        break
      }
      default: {
        const { title, message } = getErrorDialogCopy()
        let errorCode = error.code || ""

        /**
         * Our tracking events show that many users are still seeing the generic
         * error message when they attempt to submit an order. However, we are
         * not receiving any error codes with these tracking events, so it has
         * been difficult to further investigate them.
         *
         * This is an attempt to serialize the errors that lead users to this
         * code path so that we can better understand what is happening.
         */
        if (errorCode === "") {
          try {
            errorCode = error.toString()
          } catch (e) {
            // do nothing
          }
        }

        trackErrorMessageEvent(title, message, errorCode)

        props.dialog.showErrorDialog()
        break
      }
    }
  }

  const routeToArtworkPage = () => {
    const artworkId = get(
      props.order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.slug,
    )
    props.router.push(`/artwork/${artworkId}`)
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

  const SubmitButton: FC<React.PropsWithChildren<unknown>> = () => (
    <Button
      data-test="review-step-submit-button"
      variant="primaryBlack"
      width={["100%", "50%"]}
      loading={isCommittingMutation}
      disabled={!submittable}
      onClick={() => onSubmit()}
    >
      {order.source === "private_sale" ? "Complete Purchase" : "Submit"}
    </Button>
  )

  let routeSteps
  if (order.mode === "OFFER") {
    routeSteps = offerFlowSteps
  } else {
    if (order.source === "private_sale") {
      routeSteps = privateFlowSteps
    } else {
      routeSteps = buyNowFlowSteps
    }
  }

  return (
    <Box data-test="orderReview">
      <OrderRouteContainer
        order={order}
        currentStep="Review"
        steps={routeSteps}
        content={
          <Join separator={<Spacer y={4} />}>
            <Flex flexDirection="column" mb={[2, 4]}>
              {isEigen && (
                <>
                  <SubmitButton />
                  <ConditionsOfSaleDisclaimer
                    textProps={{ paddingY: 2, textAlign: "start" }}
                    orderSource={order.source}
                  />
                </>
              )}
              {order.mode === "OFFER" && (
                <OfferSummaryItem order={order} onChange={onChangeOffer} />
              )}
              <ShippingSummaryItem
                order={order}
                onChange={onChangeShippingAddress}
                locked={order.source === "private_sale"}
              />
              <ShippingArtaSummaryItemFragmentContainer
                order={order}
                onChange={onChangeShippingMethod}
                title="Shipping"
              />
              <PaymentMethodSummaryItem
                order={order}
                onChange={onChangePayment}
                title="Payment method"
              />
            </Flex>
            <Media greaterThan="xs">
              <ItemReview
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                lineItem={order?.lineItems?.edges?.[0]?.node!}
                orderSource={order.source}
              />
              <Spacer y={4} />
              <SubmitButton />
              <Spacer y={2} />
              <ConditionsOfSaleDisclaimer orderSource={order.source} />
            </Media>
          </Join>
        }
        sidebar={
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              {order.source === "partner_offer" && order.mode === "BUY" && (
                <>
                  <PartnerOfferTimerItem order={order} />
                  <Spacer y={2} />
                </>
              )}
              <ArtworkSummaryItem order={order} />
              <TransactionDetailsSummaryItem
                order={order}
                transactionStep="review"
              />
              {order.source === "private_sale" &&
                (order.artworkDetails ||
                  artworkVersion?.provenance ||
                  artworkVersion?.condition_description) && (
                  <AdditionalArtworkDetails order={order} />
                )}
              <BuyerGuarantee
                contextModule={ContextModule.ordersReview}
                contextPageOwnerType={OwnerType.ordersReview}
                orderSource={order.source}
                renderArtsyPrivateSaleConditions={false}
                privateSaleConditions={order.conditionsOfSale}
              />
            </Flex>

            <Spacer y={[2, 4]} />
            <Media at="xs">
              <SubmitButton />
              <Spacer y={2} />
              <ConditionsOfSaleDisclaimer orderSource={order.source} />
            </Media>
          </Flex>
        }
      />
    </Box>
  )
}

export const ReviewFragmentContainer = createFragmentContainer(
  withSystemContext(
    createStripeWrapper(injectCommitMutation(injectDialog(ReviewRoute)) as any),
  ),
  {
    order: graphql`
      fragment Review_order on CommerceOrder {
        state
        artworkDetails
        internalID
        paymentMethod
        mode
        code
        source
        conditionsOfSale
        itemsTotal(precision: 2)
        impulseConversationId
        stateExpiresAtFormatted: stateExpiresAt(format: "MMM D")
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
              artworkVersion {
                provenance
                condition_description
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
        ...PartnerOfferTimerItem_order
        ...ArtworkSummaryItem_order
        ...AdditionalArtworkDetails_order
        ...TransactionDetailsSummaryItem_order
        ...ShippingSummaryItem_order
        ...PaymentMethodSummaryItem_order
        ...ShippingArtaSummaryItem_order
        ...OfferSummaryItem_order
        ...OrderStepper_order
      }
    `,
  },
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
