import { ContextModule } from "@artsy/cohesion"
import { Button, Spacer } from "@artsy/palette"
import { useStripe } from "@stripe/react-stripe-js"
import { Order2OrderSummary } from "Apps/Order2/Components/Order2OrderSummary"
import { TermsAndConditions } from "Apps/Order2/Components/TermsAndConditions"
import { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useOrder2LineItemData } from "Apps/Order2/Hooks/useOrder2LineItemData"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useOrder2AcceptOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation"
import { useOrder2DeclineOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation"
import { useOrder2SubmitCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation"
import {
  RespondStepName,
  RespondStepState,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import type { Order2RespondSummary_order$key } from "__generated__/Order2RespondSummary_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2RespondSummary")

// Payment-authentication failures route to the payment modal; any other API
// error falls through to the generic submit-error modal.
const PAYMENT_ERROR_CODES = [
  "charge_authorization_failed",
  "payment_method_confirmation_failed",
]

// TODO(EMI-3175): the API does not yet return a dedicated code for an expired
// offer. OFFER_EXPIRED_CODE is a placeholder that keeps the expiry-modal wiring
// in place — replace it with the real code (and finalized copy) once the
// backend exposes one.
const OFFER_EXPIRED_CODE = "offer_expired"
const OFFER_EXPIRED_MESSAGE =
  "This offer is no longer available because the response window has closed."

interface Order2RespondSummaryProps {
  order: Order2RespondSummary_order$key
}

export const Order2RespondSummary: React.FC<Order2RespondSummaryProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const {
    checkoutTracking,
    artworkPath,
    steps,
    selectedAction,
    isCurrentCounterofferDraft,
  } = useRespondContext()
  const { router } = useRouter()
  const stripe = useStripe()

  const { submitMutation: submitCounterOffer } =
    useOrder2SubmitCounterOfferMutation()
  const { submitMutation: acceptOffer } = useOrder2AcceptOfferMutation()
  const { submitMutation: declineOffer } = useOrder2DeclineOfferMutation()
  const { showCheckoutErrorModal } = useCheckoutModal()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const artwork = useOrder2LineItemData(orderData.lineItems[0]!)

  const showPaymentError = (message?: string | null) => {
    showCheckoutErrorModal({
      error: CheckoutModalError.PAYMENT_PROCESSING_FAILED,
      description: message ?? undefined,
      // TODO(EMI-3175): on Continue, navigate to a change-payment page so the
      // collector can update their card. The Respond flow has no editable
      // payment step/route today, so this is left unwired for now.
    })
  }

  const handleSubmitError = (
    mutationError?: { code?: string | null; message?: string | null } | null,
  ) => {
    const code = mutationError?.code
    const message = mutationError?.message
    logger.error("Error submitting offer response", { code, message })

    if (code && PAYMENT_ERROR_CODES.includes(code)) {
      showPaymentError(message)
      return
    }

    if (code === OFFER_EXPIRED_CODE) {
      showCheckoutErrorModal({
        error: CheckoutModalError.SUBMIT_ERROR,
        description: OFFER_EXPIRED_MESSAGE,
      })
      return
    }

    showCheckoutErrorModal({ error: CheckoutModalError.SUBMIT_ERROR })
  }

  // The Submit CTA appears once the respond step is completed and the
  // confirmation step becomes active — mirroring the checkout review step.
  const isConfirmationActive =
    steps.find(step => step.name === RespondStepName.CONFIRMATION)?.state ===
    RespondStepState.ACTIVE

  const orderID = orderData.internalID
  // The gallery's offer being responded to (accept/decline act on it); the
  // counteroffer submits the pending draft created at "Continue to Review".
  const galleryOfferID = orderData.lastSubmittedOffer?.internalID
  const pendingOfferID = orderData.pendingOffer?.internalID

  const redirectToOrderDetails = () => {
    router.replace(`/orders/${orderID}/details`)
  }

  const submitCounter = async () => {
    if (!pendingOfferID) {
      return
    }

    const response = await submitCounterOffer({
      variables: { input: { orderID, offerID: pendingOfferID } },
    })
    const offerOrError = response.submitBuyerOffer?.offerOrError

    if (offerOrError && "mutationError" in offerOrError) {
      handleSubmitError(offerOrError.mutationError)
      return
    }

    checkoutTracking.submittedCounterOffer()
    redirectToOrderDetails()
  }

  const decline = async () => {
    if (!galleryOfferID) {
      return
    }

    const response = await declineOffer({
      variables: { input: { orderID, offerID: galleryOfferID } },
    })
    const orderOrError = response.rejectSellerOffer?.orderOrError

    if (orderOrError && "mutationError" in orderOrError) {
      handleSubmitError(orderOrError.mutationError)
      return
    }

    redirectToOrderDetails()
  }

  const accept = async () => {
    if (!stripe || !galleryOfferID) {
      return
    }

    const response = await acceptOffer({
      variables: { input: { orderID, offerID: galleryOfferID } },
    })
    const orderOrError = response.acceptSellerOffer?.orderOrError

    // Accepting may require a payment action (3DS); handle it, then re-submit.
    if (orderOrError?.__typename === "OrderMutationActionRequired") {
      const { error } = await stripe.handleNextAction({
        clientSecret: orderOrError.actionData?.clientSecret ?? "",
      })

      if (error) {
        handleSubmitError({
          code: "charge_authorization_failed",
          message: error.message,
        })
        return
      }

      await accept()
      return
    }

    if (orderOrError?.__typename === "OrderMutationError") {
      handleSubmitError(orderOrError.mutationError)
      return
    }

    redirectToOrderDetails()
  }

  const handleSubmit = async () => {
    if (!selectedAction) {
      return
    }

    try {
      setIsSubmitting(true)

      if (selectedAction === "COUNTEROFFER") {
        await submitCounter()
      } else if (selectedAction === "DECLINE") {
        await decline()
      } else {
        await accept()
      }
    } catch (error) {
      logger.error(error)
      showCheckoutErrorModal({ error: CheckoutModalError.SUBMIT_ERROR })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Order2OrderSummary
      order={orderData}
      header="Offer summary"
      contextModule={ContextModule.ordersRespond}
      checkoutTracking={checkoutTracking}
      artworkPath={artworkPath}
      priceFromPendingOffer={
        selectedAction === "COUNTEROFFER" && isCurrentCounterofferDraft
      }
      artwork={artwork}
    >
      {isConfirmationActive && (
        <>
          <Spacer y={2} />
          <Button
            variant="primaryBlack"
            width="100%"
            loading={isSubmitting}
            onClick={() => {
              checkoutTracking.clickedOrderProgression(
                ContextModule.ordersReview,
              )
              handleSubmit()
            }}
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
  fragment Order2RespondSummary_order on Order {
    ...Order2OrderSummary_order
    internalID
    lastSubmittedOffer {
      internalID
    }
    pendingOffer {
      internalID
    }
    lineItems {
      ...useOrder2LineItemData_lineItem
    }
  }
`
