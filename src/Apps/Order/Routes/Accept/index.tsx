import { Button, Flex, Spacer } from "@artsy/palette"
import { Accept_order$data } from "__generated__/Accept_order.graphql"
import { RouteConfig, Router } from "found"
import { FC } from "react"
import { Media } from "Utils/Responsive"
import { counterofferFlowSteps } from "Apps/Order/Components/OrderStepper"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { AcceptOfferMutation } from "__generated__/AcceptOfferMutation.graphql"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { CountdownTimer } from "Components/CountdownTimer"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { AcceptRouteSetOrderPaymentMutation } from "__generated__/AcceptRouteSetOrderPaymentMutation.graphql"
import { createStripeWrapper } from "Utils/createStripeWrapper"
import { Stripe, StripeElements } from "@stripe/stripe-js"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"

interface AcceptProps {
  order: Accept_order$data
  relay?: RelayProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

export const Accept: FC<AcceptProps & StripeProps> = props => {
  const {
    order,
    isCommittingMutation,
    router,
    stripe,
    dialog,
    commitMutation,
    route,
  } = props

  const acceptOffer = () => {
    return commitMutation<AcceptOfferMutation>({
      variables: {
        input: { offerId: order.lastOffer?.internalID },
      },
      mutation: graphql`
        mutation AcceptOfferMutation($input: CommerceBuyerAcceptOfferInput!) {
          commerceBuyerAcceptOffer(input: $input) {
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
      const orderOrError = (await acceptOffer()).commerceBuyerAcceptOffer
        ?.orderOrError

      if (!orderOrError?.error) {
        router.push(`/orders/${order.internalID}/status`)
        return
      }

      if (orderOrError.error.code !== "payment_requires_action") {
        handleAcceptError(orderOrError?.error)
        return
      }

      const fixedOrderOrError = (
        await fixFailedPayment({
          input: {
            creditCardId: order.creditCardId!,
            offerId: order.lastOffer?.internalID,
            orderId: order.internalID,
          },
        })
      ).commerceFixFailedPayment?.orderOrError!

      if (fixedOrderOrError.error) {
        handleAcceptError(orderOrError?.error)
        return
      }

      const scaResult = await stripe.handleCardAction(
        fixedOrderOrError.actionData?.clientSecret!
      )

      if (scaResult.error) {
        return dialog.showErrorDialog({
          title: "An error occurred",
          message: scaResult.error.message,
        })
      }

      onSubmit()
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const fixFailedPayment = (
    variables: AcceptRouteSetOrderPaymentMutation["variables"]
  ) => {
    return commitMutation<AcceptRouteSetOrderPaymentMutation>({
      variables,
      mutation: graphql`
        mutation AcceptRouteSetOrderPaymentMutation(
          $input: CommerceFixFailedPaymentInput!
        ) {
          commerceFixFailedPayment(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
                  creditCard {
                    internalID
                    name
                    street1
                    street2
                    city
                    state
                    country
                    postal_code: postalCode
                  }
                  ... on CommerceOfferOrder {
                    awaitingResponseFrom
                  }
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

  const handleAcceptError = async (error: {
    code: string
    data: string | null
  }) => {
    logger.error(error)
    switch (error.code) {
      case "capture_failed": {
        const parsedData = get(error, e => JSON.parse(e.data!), {})

        // https://stripe.com/docs/declines/codes
        if (parsedData.decline_code === "insufficient_funds") {
          showCardFailureDialog({
            title: "Insufficient funds",
            message:
              "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again.",
          })
        } else {
          showCardFailureDialog({
            title: "Charge failed",
            message:
              "Payment has been declined. Please contact your card provider or bank institution, then press “Submit” again. Alternatively, use another payment method.",
          })
        }
        break
      }
      case "insufficient_inventory": {
        await dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        routeToArtistPage()
        break
      }
      default:
        dialog.showErrorDialog()
    }
  }

  const showCardFailureDialog = async (props: {
    title: string
    message: string
  }) => {
    const { confirmed } = await dialog.showConfirmDialog({
      ...props,
      cancelButtonText: "OK",
      confirmButtonText: "Use new card",
    })
    if (confirmed) {
      router.push(`/orders/${order.internalID}/payment/new`)
    }
  }

  const onChangeResponse = () => {
    const { order } = props
    router.push(`/orders/${order.internalID}/respond`)
  }

  const getArtistId = () => {
    return get(
      order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.artists?.[0]?.slug
    )
  }

  const routeToArtistPage = () => {
    const artistId = getArtistId()

    // Don't confirm whether or not you want to leave the page
    route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
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
            <TransactionDetailsSummaryItem
              order={order}
              title="Accept seller's offer"
              useLastSubmittedOffer={true}
              onChange={onChangeResponse}
            />
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
          <Flex flexDirection="column">
            <Media greaterThan="xs">
              {className => (
                <ArtworkSummaryItem className={className} order={order} />
              )}
            </Media>

            <ShippingSummaryItem order={order} locked />

            <PaymentMethodSummaryItem order={order} locked />
          </Flex>
          <BuyerGuarantee
            contextModule={ContextModule.ordersAccept}
            contextPageOwnerType={OwnerType.ordersAccept}
          />
          <Spacer y={2} />
          <Media at="xs">
            <>
              <Button
                onClick={onSubmit}
                loading={isCommittingMutation}
                size="large"
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

export const AcceptFragmentContainer = createFragmentContainer(
  createStripeWrapper<AcceptProps>(
    injectCommitMutation(injectDialog(Accept)) as any
  ),
  {
    order: graphql`
      fragment Accept_order on CommerceOrder {
        internalID
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                slug
                artists {
                  slug
                }
              }
            }
          }
        }
        creditCardId
        ... on CommerceOfferOrder {
          lastOffer {
            internalID
            createdAt
          }
        }
        ...TransactionDetailsSummaryItem_order
        ...ArtworkSummaryItem_order
        ...ShippingSummaryItem_order
        ...PaymentMethodSummaryItem_order
        ...OrderStepper_order
      }
    `,
  }
)
