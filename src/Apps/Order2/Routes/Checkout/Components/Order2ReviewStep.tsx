import { ContextModule } from "@artsy/cohesion"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Button, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { useStripe } from "@stripe/react-stripe-js"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
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

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
  dialog: Dialog
}

const Order2ReviewStepComponent: React.FC<Order2ReviewStepProps> = ({
  order,
  dialog,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const isOffer = orderData.mode === "OFFER"
  const submitOrderMutation = useOrder2SubmitOrderMutation()
  const stripe = useStripe()

  // Get the offer ID for offer orders (only call the hook when needed)
  const offerId = orderData.pendingOffer?.internalID ?? null
  const {
    steps,
    confirmationToken,
    savePaymentMethod,
    redirectToOrderDetails,
    checkoutTracking,
  } = useCheckoutContext()

  const artworkData = extractLineItemMetadata(orderData.lineItems[0]!)
  const { dimensionsLabel } = useArtworkDimensions(artworkData.dimensions)

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.CONFIRMATION,
  )?.state

  const [loading, setLoading] = useState(false)

  const handleSubmitError = (error: any) => {
    logger.error({
      ...error,
      orderId: orderData.internalID,
      shouldLogErrorToSentry: true,
    })

    const title = "An error occurred"
    const message =
      "Something went wrong while submitting your order. Please try again."

    dialog.showErrorDialog({
      title: title,
      message: message,
    })
  }

  const handleClick = async () => {
    checkoutTracking.clickedOrderProgression(ContextModule.ordersReview)
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

      if (isOffer) {
        if (!offerId) {
          throw new Error("No offer ID available for submission")
        }
        input.offerID = offerId
        input.confirmedSetupIntentId = confirmationToken?.id
      } else {
        input.confirmationToken = confirmationToken?.id
        input.oneTimeUse = !savePaymentMethod
      }

      const submitOrderResult = await submitOrderMutation.submitMutation({
        variables: { input },
      })

      const order = validateAndExtractOrderResponse(
        submitOrderResult.submitOrder?.orderOrError,
      )

      if (order?.__typename === "OrderMutationActionRequired") {
        const cardActionResults = await stripe?.handleNextAction({
          clientSecret: order.actionData.clientSecret,
        })

        if (cardActionResults?.error) {
          throw new Error(cardActionResults.error.message)
        } else {
          handleClick()
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
        variant={["sm-display", "sm-display", "md"]}
        fontWeight={["bold", "bold", "normal"]}
        color="mono100"
      >
        {isOffer ? "Offer" : "Order"} summary
      </Text>
      <Flex py={1} justifyContent="space-between" alignItems="flex-start">
        <RouterLink
          flex={0}
          to={`/artwork/${artworkData.slug}`}
          target="_blank"
        >
          <Image
            mr={1}
            src={artworkData?.image?.resized?.url}
            alt={artworkData.title || ""}
            width="65px"
          />
        </RouterLink>
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
        <Order2CheckoutPricingBreakdown order={orderData} />
      </Box>
      <Spacer y={2} />
      <Message variant="default" p={1}>
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with{" "}
            <RouterLink
              onClick={() => checkoutTracking.clickedBuyerProtection()}
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
            onClick={handleClick}
            loading={loading}
          >
            Submit
          </Button>
        </>
      )}
    </Flex>
  )
}

export const Order2ReviewStep = injectDialog(Order2ReviewStepComponent)

const extractLineItemMetadata = (
  lineItem: NonNullable<Order2ReviewStep_order$data["lineItems"][number]>,
) => {
  const { artwork, artworkVersion, artworkOrEditionSet } = lineItem

  const isArtworkOrEdition =
    artworkOrEditionSet &&
    (artworkOrEditionSet.__typename === "Artwork" ||
      artworkOrEditionSet.__typename === "EditionSet")
  const dimensions = isArtworkOrEdition
    ? artworkOrEditionSet.dimensions
    : undefined
  const price = isArtworkOrEdition ? artworkOrEditionSet.price : undefined
  const attributionClass = artworkVersion?.attributionClass

  return {
    slug: artwork?.slug,
    image: artworkVersion?.image,
    title: artworkVersion?.title,
    artistNames: artworkVersion?.artistNames,
    date: artworkVersion?.date,
    price,
    dimensions,
    attributionClass,
  }
}

const FRAGMENT = graphql`
  fragment Order2ReviewStep_order on Order {
    ...Order2CheckoutPricingBreakdown_order
    internalID
    mode
    source
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
      artwork {
        slug
      }
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
          resized(width: 185, height: 138) {
            url
          }
        }
      }
    }
    pendingOffer {
      internalID
    }
  }
`
