import { ContextModule } from "@artsy/cohesion"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Button, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { useStripe } from "@stripe/react-stripe-js"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import type { CheckoutErrorBannerMessage } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useOrder2SubmitOrderMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SubmitOrderMutation"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import type {
  Order2ReviewStep_order$data,
  Order2ReviewStep_order$key,
} from "__generated__/Order2ReviewStep_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2ReviewStep.tsx")

const PAYMENT_METHOD_UPDATE_REQUIRED: CheckoutErrorBannerMessage = {
  title: "Payment error",
  message: "Please update your payment method",
  code: "stripe_error",
}

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
}

export const Order2ReviewStep: React.FC<Order2ReviewStepProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const isOffer = orderData.mode === "OFFER"
  const submitOrderMutation = useOrder2SubmitOrderMutation()
  const stripe = useStripe()

  // Get the offer ID for offer orders (only call the hook when needed)
  const offerId = orderData.pendingOffer?.internalID ?? null
  const confirmationToken = orderData.stripeConfirmationToken ?? undefined
  const {
    steps,
    savePaymentMethod,
    redirectToOrderDetails,
    checkoutTracking,
    artworkPath,
    editPayment,
    setSectionErrorMessage,
  } = useCheckoutContext()

  const { showCheckoutErrorModal } = useCheckoutModal()

  const artworkData = extractLineItemMetadata(orderData.lineItems[0]!)
  const { dimensionsLabel } = useArtworkDimensions(artworkData.dimensions)

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.CONFIRMATION,
  )?.state

  const [loading, setLoading] = useState(false)

  const showPaymentError = () => {
    editPayment()
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
      showCheckoutErrorModal(CheckoutModalError.ARTWORK_NOT_FOR_SALE)
      return
    }

    if (error.code === "stripe_error") {
      showCheckoutErrorModal(
        CheckoutModalError.STRIPE_ERROR,
        "An error occurred while processing your payment",
        error.message,
        showPaymentError,
      )
      return
    }

    showCheckoutErrorModal(CheckoutModalError.SUBMIT_ERROR)
  }

  const handleSubmit = async (confirmedSetupIntentId?: any) => {
    checkoutTracking.clickedOrderProgression(ContextModule.ordersReview)

    if (!stripe) return

    setLoading(true)

    try {
      const input: {
        id: string
        confirmationToken?: string
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
      } else {
        input.confirmationToken = confirmationToken
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
          throw { code: "stripe_error", message: error.message }
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
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Text
        color="mono100"
        fontWeight="bold"
        variant={["sm-display", "sm-display", "md"]}
      >
        {isOffer ? "Offer" : "Order"} summary
      </Text>
      <Flex py={1} justifyContent="space-between" alignItems="flex-start">
        {artworkData?.image?.resized?.url && (
          <RouterLink
            flex={0}
            to={artworkPath}
            target="_blank"
            onClick={() => {
              if (artworkData.artworkInternalID) {
                checkoutTracking.clickedOrderArtworkImage({
                  destinationPageOwnerId: artworkData.artworkInternalID,
                  contextModule: ContextModule.ordersReview,
                })
              }
            }}
          >
            <Image
              mr={1}
              src={artworkData?.image?.resized?.url}
              alt={artworkData.title || ""}
              // starting at small, allow a larger image
              width={["65px", "85px"]}
            />
          </RouterLink>
        )}
        <Box overflow="hidden" flex={1}>
          <Text overflowEllipsis variant="sm" color="mono100">
            {artworkData.artistNames}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            {[artworkData.title, artworkData.date].join(", ")}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            List price: {artworkData.price}
          </Text>
          {artworkData.attributionClass?.shortDescription && (
            <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
              {artworkData.attributionClass.shortDescription}
            </Text>
          )}
          {dimensionsLabel && (
            <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
              {dimensionsLabel}
            </Text>
          )}
        </Box>
      </Flex>
      <Box>
        <Order2CheckoutPricingBreakdown
          order={orderData}
          contextModule={ContextModule.ordersReview}
        />
      </Box>
      <Spacer y={2} />
      <Message variant="default" p={1}>
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with{" "}
            <RouterLink
              onClick={() =>
                checkoutTracking.clickedBuyerProtection(
                  ContextModule.ordersReview,
                )
              }
              inline
              target="_blank"
              to={BUYER_GUARANTEE_URL}
            >
              Artsy&rsquo;s Buyer Guarantee
            </RouterLink>
            .
          </Text>
        </Flex>
      </Message>
      <Spacer y={2} />
      {stepState === CheckoutStepState.ACTIVE && (
        <>
          <Spacer y={2} />
          <Button
            variant="primaryBlack"
            width="100%"
            onClick={() => handleSubmit()}
            loading={loading}
          >
            Submit
          </Button>
        </>
      )}
    </Flex>
  )
}

const extractLineItemMetadata = (
  lineItem: NonNullable<Order2ReviewStep_order$data["lineItems"][number]>,
) => {
  const { artworkVersion, artworkOrEditionSet, artwork } = lineItem

  const isArtworkOrEdition =
    artworkOrEditionSet &&
    (artworkOrEditionSet.__typename === "Artwork" ||
      artworkOrEditionSet.__typename === "EditionSet")
  const dimensions = isArtworkOrEdition
    ? artworkOrEditionSet.dimensions
    : undefined
  const price = isArtworkOrEdition ? artworkOrEditionSet.price : undefined
  const attributionClass = artworkVersion?.attributionClass

  const fallbackImage =
    artwork?.figures?.[0]?.__typename === "Image" ? artwork?.figures?.[0] : null
  const image = artworkVersion?.image?.url
    ? artworkVersion?.image
    : fallbackImage

  return {
    image,
    title: artworkVersion?.title,
    artistNames: artworkVersion?.artistNames,
    date: artworkVersion?.date,
    price,
    dimensions,
    attributionClass,
    artworkInternalID: artwork?.internalID,
  }
}

const FRAGMENT = graphql`
  fragment Order2ReviewStep_order on Order {
    ...Order2CheckoutPricingBreakdown_order
    internalID
    mode
    source
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
      artworkOrEditionSet {
        __typename
        ... on Artwork {
          price
          dimensions {
            in
            cm
          }
        }
        ... on EditionSet {
          price
          dimensions {
            in
            cm
          }
        }
      }
      artworkVersion {
        title
        artistNames
        date
        attributionClass {
          shortDescription
        }
        image {
          url
          resized(width: 185, height: 138) {
            url
          }
        }
      }
      artwork {
        internalID
        figures(includeAll: false) {
          __typename
          ... on Image {
            resized(width: 185, height: 138) {
              url
            }
          }
        }
      }
    }
    pendingOffer {
      internalID
    }
  }
`
