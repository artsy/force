import { ContextModule } from "@artsy/cohesion"
import { Button, Spacer } from "@artsy/palette"
import { useStripe } from "@stripe/react-stripe-js"
import { Order2OrderSummary } from "Apps/Order2/Components/Order2OrderSummary"
import { TermsAndConditions } from "Apps/Order2/Components/TermsAndConditions"
import { useOrder2LineItemData } from "Apps/Order2/Hooks/useOrder2LineItemData"
import {
  Order2RespondErrorModal,
  RespondErrorModalType,
} from "Apps/Order2/Routes/Respond/Components/Order2RespondErrorModal"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useOrder2AcceptOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation"
import { useOrder2DeclineOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation"
import { useOrder2SubmitCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation"
import {
  RespondStepName,
  RespondStepState,
} from "Apps/Order2/Routes/Respond/RespondContext/types"
import {
  OFFER_UNAVAILABLE_CODES,
  PAYMENT_FAILURE_CODES,
} from "Apps/Order2/Utils/exchangeErrorCodes"
import { useRouter } from "System/Hooks/useRouter"
import { Jump } from "Utils/Hooks/useJump"
import createLogger from "Utils/logger"
import type { Order2RespondSummary_order$key } from "__generated__/Order2RespondSummary_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2RespondSummary")

interface Order2RespondSummaryProps {
  order: Order2RespondSummary_order$key
  jumpToSubmit?: boolean
}

export const Order2RespondSummary: React.FC<Order2RespondSummaryProps> = ({
  order,
  jumpToSubmit,
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [errorModal, setErrorModal] = useState<{
    type: RespondErrorModalType
    description?: string | null
  } | null>(null)

  const showSubmitErrorModal = () => {
    setErrorModal({ type: RespondErrorModalType.SUBMIT_ERROR })
  }

  const showMutationErrorModal = (mutationError?: {
    code: string
    message: string
  }) => {
    if (!mutationError) {
      showSubmitErrorModal()
      return
    }

    if (PAYMENT_FAILURE_CODES.includes(mutationError.code)) {
      setErrorModal({ type: RespondErrorModalType.PAYMENT_PROCESSING_FAILED })
      return
    }

    if (OFFER_UNAVAILABLE_CODES.includes(mutationError.code)) {
      setErrorModal({ type: RespondErrorModalType.OFFER_NO_LONGER_AVAILABLE })
      return
    }

    showSubmitErrorModal()
  }

  const artwork = useOrder2LineItemData(orderData.lineItems[0]!)

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

  // The Order2 respond route has no payment step, so a declined card is fixed
  // on the legacy payment route.
  const redirectToNewPayment = () => {
    router.push(`/orders/${orderID}/payment/new`)
  }

  const submitCounter = async () => {
    if (!pendingOfferID) {
      logger.error("Missing pending offer to submit")
      showSubmitErrorModal()
      return
    }

    const response = await submitCounterOffer({
      variables: { input: { orderID, offerID: pendingOfferID } },
    })
    const offerOrError = response.submitBuyerOffer?.offerOrError

    if (offerOrError && "mutationError" in offerOrError) {
      logger.error(offerOrError.mutationError)
      showMutationErrorModal(offerOrError.mutationError)
      return
    }

    checkoutTracking.submittedCounterOffer()
    redirectToOrderDetails()
  }

  const decline = async () => {
    if (!galleryOfferID) {
      logger.error("Missing gallery offer to decline")
      showSubmitErrorModal()
      return
    }

    const response = await declineOffer({
      variables: { input: { orderID, offerID: galleryOfferID } },
    })
    const orderOrError = response.rejectSellerOffer?.orderOrError

    if (orderOrError && "mutationError" in orderOrError) {
      logger.error(orderOrError.mutationError)
      showMutationErrorModal(orderOrError.mutationError)
      return
    }

    redirectToOrderDetails()
  }

  const accept = async () => {
    if (!stripe || !galleryOfferID) {
      logger.error("Missing Stripe or gallery offer to accept")
      showSubmitErrorModal()
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
        logger.error(error)
        setErrorModal({
          type: RespondErrorModalType.PAYMENT_PROCESSING_FAILED,
          description: error.message,
        })
        return
      }

      await accept()
      return
    }

    if (orderOrError?.__typename === "OrderMutationError") {
      const { mutationError } = orderOrError
      logger.error(mutationError)
      showMutationErrorModal(mutationError)
      return
    }

    redirectToOrderDetails()
  }

  const handleSubmit = async () => {
    if (!selectedAction) {
      return
    }

    try {
      setErrorModal(null)
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
      showSubmitErrorModal()
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
          {jumpToSubmit && <Jump id="respond-submit-cta" />}
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
              checkoutTracking.clickedTermsAndConditions(
                ContextModule.ordersReview,
              )
            }
          />

          <Spacer y={2} />

          <Order2RespondErrorModal
            error={errorModal?.type ?? null}
            overrideDescription={errorModal?.description}
            onClose={() => {
              setErrorModal(null)
            }}
            onFixPayment={redirectToNewPayment}
            onViewOrderDetails={redirectToOrderDetails}
          />
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
