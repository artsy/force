import { ContextModule } from "@artsy/cohesion"
import { Button, Message, Spacer, Text } from "@artsy/palette"
import { useStripe } from "@stripe/react-stripe-js"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { Order2OrderSummary } from "Apps/Order2/Components/Order2OrderSummary"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useOrder2AcceptOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation"
import { useOrder2DeclineOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation"
import { useOrder2SubmitCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation"
import { hasCurrentCounterofferDraft } from "Apps/Order2/Routes/Respond/Utils/counterofferDraft"
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

const GENERIC_ERROR = "Something went wrong. Please try again."

interface Order2RespondSummaryProps {
  order: Order2RespondSummary_order$key
}

const extractLineItemMetadata = (lineItem: any) => {
  const artworkVersion = lineItem?.artworkVersion
  const artwork = lineItem?.artwork

  return {
    artworkInternalID: artwork?.internalID ?? "",
    artistNames: artworkVersion?.artistNames ?? "",
    title: artworkVersion?.title ?? "",
    date: artworkVersion?.date ?? "",
    price: artwork?.price ?? "",
    attributionClass: artwork?.attributionClass ?? null,
    image: artworkVersion?.image ?? artwork?.images?.[0] ?? null,
    dimensions: artwork?.dimensions ?? null,
    framedDimensions: artwork?.framedDimensions ?? null,
  }
}

export const Order2RespondSummary: React.FC<Order2RespondSummaryProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { checkoutTracking, artworkPath, steps, selectedAction } =
    useRespondContext()
  const { router } = useRouter()
  const stripe = useStripe()

  const { submitMutation: submitCounterOffer } =
    useOrder2SubmitCounterOfferMutation()
  const { submitMutation: acceptOffer } = useOrder2AcceptOfferMutation()
  const { submitMutation: declineOffer } = useOrder2DeclineOfferMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const artworkData = extractLineItemMetadata(orderData.lineItems[0]!)
  const { dimensionsLabelWithoutFrameText: dimensionsLabel } =
    useArtworkDimensions({
      dimensions: artworkData.dimensions,
      framedDimensions: artworkData.framedDimensions,
    })

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

  // Price the summary from the buyer’s draft counteroffer. Only use a draft
  // that belongs to the current round — a pending offer from an earlier round
  // (buyer countered, gallery countered back) is stale and must be ignored.
  const isCurrentCounterofferDraft = hasCurrentCounterofferDraft({
    pendingOffer: orderData.pendingOffer,
    galleryOffer: orderData.lastSubmittedOffer,
  })

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
      // TODO: proper error handling is tracked in EMI-3175.
      setErrorMessage(offerOrError.mutationError?.message ?? GENERIC_ERROR)
      return
    }

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
      // TODO: proper error handling is tracked in EMI-3175.
      setErrorMessage(orderOrError.mutationError?.message ?? GENERIC_ERROR)
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
        // TODO: proper error handling is tracked in EMI-3175.
        setErrorMessage(error.message ?? GENERIC_ERROR)
        return
      }

      await accept()
      return
    }

    if (orderOrError?.__typename === "OrderMutationError") {
      // TODO: proper error handling is tracked in EMI-3175.
      setErrorMessage(orderOrError.mutationError?.message ?? GENERIC_ERROR)
      return
    }

    redirectToOrderDetails()
  }

  const handleSubmit = async () => {
    if (!selectedAction) {
      return
    }

    try {
      setErrorMessage(null)
      setIsSubmitting(true)

      if (selectedAction === "COUNTEROFFER") {
        await submitCounter()
      } else if (selectedAction === "DECLINE") {
        await decline()
      } else {
        await accept()
      }
    } catch (error) {
      // TODO: proper error handling is tracked in EMI-3175.
      logger.error(error)
      setErrorMessage(GENERIC_ERROR)
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
      artwork={{
        artworkInternalID: artworkData.artworkInternalID,
        artistNames: artworkData.artistNames,
        title: artworkData.title,
        date: artworkData.date,
        listPriceDisplay: artworkData.price,
        attributionClassLabel: artworkData.attributionClass?.shortDescription,
        dimensionsLabel,
        imageURL: artworkData.image?.resized?.url,
      }}
    >
      {isConfirmationActive && (
        <>
          <Spacer y={2} />
          <Button
            variant="primaryBlack"
            width="100%"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {errorMessage && (
            <>
              <Spacer y={1} />
              <Message variant="error" p={1}>
                <Text variant="xs">{errorMessage}</Text>
              </Message>
            </>
          )}
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
      createdAt
    }
    pendingOffer {
      internalID
      createdAt
    }
    lineItems {
      artworkVersion {
        artistNames
        title
        date
        image {
          resized(height: 200) {
            url
          }
        }
      }
      artwork {
        internalID
        price
        attributionClass {
          shortDescription
        }
        dimensions {
          in
          cm
        }
        framedDimensions {
          in
          cm
        }
        images(includeAll: false) {
          resized(height: 200) {
            url
          }
        }
      }
    }
  }
`
