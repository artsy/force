import { ContextModule } from "@artsy/cohesion"
import { Button, Spacer, Text } from "@artsy/palette"
import { useStripe } from "@stripe/react-stripe-js"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { Order2OrderSummary } from "Apps/Order2/Components/Order2OrderSummary"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import type { CheckoutErrorBannerMessage } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { TermsAndConditions } from "Apps/Order2/Components/TermsAndConditions"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useOrder2SubmitOrderMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SubmitOrderMutation"
import { useOrder2LineItemData } from "Apps/Order2/Hooks/useOrder2LineItemData"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import createLogger from "Utils/logger"
import type { Order2ReviewStep_order$key } from "__generated__/Order2ReviewStep_order.graphql"
import { DateTime } from "luxon"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2ReviewStep.tsx")

const PAYMENT_METHOD_UPDATE_REQUIRED: CheckoutErrorBannerMessage = {
  title: "Payment error",
  message: "Please update your payment method",
  code: "charge_authorization_failed",
  // The failure was already tracked via the payment-processing-failed modal;
  // skip tracking here so the re-displayed banner does not double report.
  skipTracking: true,
}

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
}

export const Order2ReviewStep: React.FC<Order2ReviewStepProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const submitOrderMutation = useOrder2SubmitOrderMutation()
  const stripe = useStripe()

  const {
    isOffer,
    steps,
    savePaymentMethod,
    redirectToOrderDetails,
    checkoutTracking,
    artworkPath,
    editStep,
    setSectionErrorMessage,
    isFulfillmentDetailsSaving,
  } = useCheckoutContext()

  // Get the offer ID for offer orders (only call the hook when needed)
  const offerId = orderData.pendingOffer?.internalID ?? null
  const confirmationToken = orderData.stripeConfirmationToken ?? undefined

  // Limited partner offer variables
  const isOfferOnTopOfPartnerOffer =
    isOffer && orderData.source === "PARTNER_OFFER"
  const partnerOfferEndTime =
    (isOfferOnTopOfPartnerOffer && orderData.buyerStateExpiresAt) || ""
  const partnerOfferStartTime = isOfferOnTopOfPartnerOffer
    ? DateTime.fromISO(partnerOfferEndTime).minus({ days: 3 }).toString()
    : ""
  const timer = useCountdownTimer({
    startTime: partnerOfferStartTime,
    endTime: partnerOfferEndTime,
    imminentTime: 1,
  })
  const itemPrice = orderData.lineItems?.[0]?.listPrice
  const displayLimitedOfferLine =
    isOfferOnTopOfPartnerOffer &&
    itemPrice?.__typename === "Money" &&
    timer.hasValidRemainingTime

  const { showCheckoutErrorModal } = useCheckoutModal()

  const artwork = useOrder2LineItemData(orderData.lineItems[0]!)

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.CONFIRMATION,
  )?.state

  const [loading, setLoading] = useState(false)

  const showPaymentError = () => {
    editStep(CheckoutStepName.PAYMENT)
    setSectionErrorMessage({
      section: CheckoutStepName.PAYMENT,
      error: PAYMENT_METHOD_UPDATE_REQUIRED,
    })
  }

  const handleSubmitError = (error: any) => {
    logger.error({
      ...error,
      orderId: orderData.internalID,
      shouldLogErrorToSentry: true,
    })

    if (error.code === "insufficient_inventory") {
      showCheckoutErrorModal({
        error: CheckoutModalError.ARTWORK_NOT_FOR_SALE,
      })
      return
    }

    if (
      error.code === "charge_authorization_failed" ||
      error.code === "payment_method_confirmation_failed"
    ) {
      showCheckoutErrorModal({
        error: CheckoutModalError.PAYMENT_PROCESSING_FAILED,
        description: error.message,
        onClose: showPaymentError,
      })
      return
    }

    showCheckoutErrorModal({
      error: CheckoutModalError.SUBMIT_ERROR,
    })
  }

  const handleSubmit = async (confirmedSetupIntentId?: any) => {
    if (!stripe) return

    setLoading(true)

    try {
      const input: {
        id: string
        confirmedSetupIntentId?: string
        offerID?: string
        oneTimeUse?: boolean
      } = {
        id: orderData.internalID,
      }

      // only specify oneTimeUse for new payment methods
      if (confirmationToken) {
        // SEPA cannot be saved, always set oneTimeUse to true
        if (orderData.paymentMethod === "SEPA_DEBIT") {
          input.oneTimeUse = true
        } else {
          input.oneTimeUse = !savePaymentMethod
        }
      }

      if (isOffer) {
        if (!offerId) {
          throw new Error("No offer ID available for submission")
        }
        input.offerID = offerId
        if (confirmedSetupIntentId) {
          input.confirmedSetupIntentId = confirmedSetupIntentId
        }
      }

      const submitOrderResult = await submitOrderMutation.submitMutation({
        variables: { input },
      })

      const order = validateAndExtractOrderResponse(
        submitOrderResult.submitOrder?.orderOrError,
      )

      if (order?.__typename === "OrderMutationActionRequired") {
        const { error, setupIntent } = await stripe.handleNextAction({
          clientSecret: order.actionData.clientSecret,
        })

        if (error) {
          throw { code: "charge_authorization_failed", message: error.message }
        } else {
          isOffer ? handleSubmit(setupIntent?.id) : handleSubmit()
          return
        }
      }

      checkoutTracking.submittedOrder()
      redirectToOrderDetails()
    } catch (error) {
      setLoading(false)
      logger.error("Error while submitting order", error)
      handleSubmitError(error)
    }
  }

  return (
    <Order2OrderSummary
      order={orderData}
      header={`${isOffer ? "Offer" : "Order"} summary`}
      contextModule={ContextModule.ordersReview}
      checkoutTracking={checkoutTracking}
      artworkPath={artworkPath}
      isPricingLoading={isFulfillmentDetailsSaving}
      artwork={artwork}
      limitedTimeOffer={
        displayLimitedOfferLine && (
          <Text variant="sm" color="blue100" textAlign="left">
            Gallery offer: {itemPrice.display}{" "}
            <span style={{ whiteSpace: "nowrap" }}>
              (Exp. {timer.remainingTime})
            </span>
          </Text>
        )
      }
    >
      <Spacer y={2} />
      {stepState === CheckoutStepState.ACTIVE && (
        <>
          <Spacer y={2} />
          <Button
            variant="primaryBlack"
            width="100%"
            onClick={() => {
              // tracked separately from handleSubmit — fires on click regardless of outcome
              checkoutTracking.clickedOrderProgression(
                ContextModule.ordersReview,
              )
              handleSubmit()
            }}
            loading={loading}
          >
            Submit
          </Button>
          <Spacer y={2} />
          <TermsAndConditions
            onClickTermsAndConditions={() =>
              checkoutTracking.clickedTermsAndConditions()
            }
          />
          <Spacer y={2} />
        </>
      )}
    </Order2OrderSummary>
  )
}

const FRAGMENT = graphql`
  fragment Order2ReviewStep_order on Order {
    ...Order2OrderSummary_order
    internalID
    source
    buyerStateExpiresAt
    stripeConfirmationToken
    paymentMethod
    buyerTotal {
      display
    }
    itemsTotal {
      display
    }
    shippingTotal {
      display
    }
    taxTotal {
      display
    }
    lineItems {
      listPrice {
        __typename
        ... on Money {
          display
        }
      }
      ...useOrder2LineItemData_lineItem
    }
    pendingOffer {
      internalID
    }
  }
`
