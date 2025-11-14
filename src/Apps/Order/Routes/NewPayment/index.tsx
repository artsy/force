import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import {
  type CreditCardPicker,
  CreditCardPickerFragmentContainer,
} from "Apps/Order/Components/CreditCardPicker"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  type CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { getErrorDialogCopy } from "Apps/Order/Utils/getErrorDialogCopy"
import { CountdownTimer } from "Components/CountdownTimer"
import type { RouteProps } from "System/Router/Route"
import { createStripeWrapper } from "Utils/createStripeWrapper"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Button, Flex, Join, Spacer } from "@artsy/palette"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import type { NewPayment_me$data } from "__generated__/NewPayment_me.graphql"
import type { NewPayment_order$data } from "__generated__/NewPayment_order.graphql"
import type { NewPaymentRouteSetOrderPaymentMutation } from "__generated__/NewPaymentRouteSetOrderPaymentMutation.graphql"
import type { Router } from "found"
import { createRef, type FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export const ContinueButton = props => (
  <Button variant="primaryBlack" width={["100%", "50%"]} {...props}>
    Continue
  </Button>
)

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

export interface NewPaymentProps {
  order: NewPayment_order$data
  me: NewPayment_me$data
  router: Router
  route: RouteProps
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

type CreditCardPickerResultType =
  | { type: "error"; error: string | undefined }
  | { type: "internal_error"; error: string | undefined }
  | { type: "invalid_form" }
  | { type: "success"; creditCardId: string }

const logger = createLogger("Order/Routes/NewPayment/index.tsx")

export const NewPaymentRoute: FC<
  React.PropsWithChildren<NewPaymentProps & StripeProps>
> = props => {
  const [isGettingCreditCardId, setIsGettingCreditCardId] = useState(false)
  const [creditCardPickerResult, setCreditCardPickerResult] =
    useState<CreditCardPickerResultType | null>(null)

  const tracking = useTracking()

  const {
    order,
    me,
    router,
    dialog,
    commitMutation,
    isCommittingMutation,
    stripe,
  } = props
  const isLoading = isCommittingMutation || isGettingCreditCardId
  const CreditCardPicker = createRef<CreditCardPicker>()

  const trackErrorMessageEvent = (
    title: string,
    message: string | undefined,
    code?: string,
  ) => {
    return tracking.trackEvent({
      action: ActionType.errorMessageViewed,
      context_owner_type: OwnerType.ordersNewPayment,
      context_owner_id: props.order.internalID,
      title: title,
      message: message,
      error_code: code || null,
      flow: "user fixes failed payment",
    })
  }

  const getCreditCardId = async (): Promise<string | null> => {
    setIsGettingCreditCardId(true)

    const result = await CreditCardPicker?.current?.getCreditCardId()

    setIsGettingCreditCardId(false)

    if (result?.type === "invalid_form") return null

    if (result?.type === "error") {
      dialog.showErrorDialog({
        title: result?.error,
        message:
          "Please enter another payment method or contact your bank for more information.",
      })
      return null
    }

    if (result?.type === "internal_error") {
      dialog.showErrorDialog({
        title: "An internal error occurred",
      })
      logger.error(result?.error)
      return null
    }

    if (result?.type === "success" && result?.creditCardId) {
      setCreditCardPickerResult(result)
      return result.creditCardId
    }

    return null
  }

  const onContinue = async () => {
    try {
      const creditCardId =
        creditCardPickerResult?.type === "success"
          ? creditCardPickerResult.creditCardId
          : await getCreditCardId()

      if (creditCardId) {
        const orderOrError = (
          await fixFailedPayment({
            input: {
              creditCardId,
              offerId: order.lastOffer?.internalID,
              orderId: order.internalID,
            },
          })
        ).commerceFixFailedPayment?.orderOrError

        if (!orderOrError) {
          handleFixFailedPaymentError("invalid_response")
          return
        } else if (orderOrError.error) {
          handleFixFailedPaymentError(orderOrError.error.code)
          return
        }

        if (orderOrError.actionData && orderOrError.actionData.clientSecret) {
          const scaResult = await stripe.handleCardAction(
            orderOrError.actionData.clientSecret,
          )
          if (scaResult.error) {
            dialog.showErrorDialog({
              title: "An error occurred",
              message: scaResult.error.message,
            })
            return
          } else {
            const scaOrderOrError = (
              await fixFailedPayment({
                input: {
                  creditCardId,
                  offerId: order.lastOffer?.internalID,
                  orderId: order.internalID,
                },
              })
            ).commerceFixFailedPayment?.orderOrError

            if (!scaOrderOrError) {
              handleFixFailedPaymentError("invalid_response")
              return
            } else if (scaOrderOrError.error) {
              handleFixFailedPaymentError(scaOrderOrError.error.code)
              return
            } else if (scaOrderOrError.actionData) {
              handleFixFailedPaymentError("requires_action")
              return
            }
          }
        }

        router.push(`/orders/${order.internalID}/details`)
      }
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const fixFailedPayment = (
    variables: NewPaymentRouteSetOrderPaymentMutation["variables"],
  ) => {
    return commitMutation<NewPaymentRouteSetOrderPaymentMutation>({
      variables,
      mutation: graphql`
        mutation NewPaymentRouteSetOrderPaymentMutation(
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

  const handleFixFailedPaymentError = async (code: string) => {
    switch (code) {
      case "capture_failed": {
        trackErrorMessageEvent(
          "Charge failed",
          "Payment has been declined. Please contact your card provider or bank institution, then press “Continue” again. Alternatively, use another payment method.",
          code,
        )

        dialog.showErrorDialog({
          title: "Charge failed",
          message:
            "Payment has been declined. Please contact your card provider or bank institution, then press “Continue” again. Alternatively, use another payment method.",
        })
        break
      }
      case "insufficient_inventory": {
        trackErrorMessageEvent(
          "Not available",
          "Sorry, the work is no longer available.",
          code,
        )

        await dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        routeToArtworkPage()
        break
      }
      default: {
        const { title, message } = getErrorDialogCopy()

        trackErrorMessageEvent(title, message, code)

        dialog.showErrorDialog()
        break
      }
    }
  }

  const routeToArtworkPage = () => {
    const artworkId = get(
      order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.slug,
    )
    router.push(`/artwork/${artworkId}`)
  }

  return (
    <OrderRouteContainer
      order={order}
      currentStep="Payment"
      steps={["Payment"]}
      content={
        <Flex
          flexDirection="column"
          style={isLoading ? { pointerEvents: "none" } : {}}
        >
          {order.mode === "OFFER" &&
            order.lastOffer?.createdAt &&
            order.stateExpiresAt && (
              <>
                <Flex>
                  <CountdownTimer
                    action="Submit new payment"
                    note="Once this offer expires, negotiations will end. Note that the artwork could be sold to another buyer in the meantime."
                    countdownStart={order.lastOffer?.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                </Flex>
                <Spacer y={[2, 4]} />
              </>
            )}
          <Join separator={<Spacer y={4} />}>
            <CreditCardPickerFragmentContainer
              order={order}
              me={me}
              commitMutation={commitMutation}
              innerRef={CreditCardPicker}
              tracking={tracking}
            />
            <Media greaterThan="xs">
              <ContinueButton onClick={onContinue} loading={isLoading} />
            </Media>
          </Join>
        </Flex>
      }
      sidebar={
        <Flex flexDirection="column">
          <Flex flexDirection="column">
            <ArtworkSummaryItem order={order} />
            <TransactionDetailsSummaryItem
              order={order}
              useLastSubmittedOffer
            />
          </Flex>
          <BuyerGuarantee
            contextModule={ContextModule.ordersNewPayment}
            contextPageOwnerType={OwnerType.ordersNewPayment}
          />
          <Spacer y={[2, 4]} />
          <Media at="xs">
            <>
              <ContinueButton onClick={onContinue} loading={isLoading} />
            </>
          </Media>
        </Flex>
      }
    />
  )
}

export const NewPaymentFragmentContainer = createFragmentContainer(
  createStripeWrapper<NewPaymentProps>(
    injectCommitMutation(injectDialog(NewPaymentRoute)) as any,
  ),
  {
    me: graphql`
      fragment NewPayment_me on Me {
        ...CreditCardPicker_me
      }
    `,
    order: graphql`
      fragment NewPayment_order on CommerceOrder {
        internalID
        mode
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                slug
                artists(shallow: true) {
                  slug
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          lastOffer {
            createdAt
            internalID
            note
          }
        }
        ...CreditCardPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
  },
)
