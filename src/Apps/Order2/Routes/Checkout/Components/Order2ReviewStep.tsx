import { ContextModule } from "@artsy/cohesion"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Button, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { useSubmitOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useSubmitOrderMutation"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
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
  const submitOrderMutation = useSubmitOrderMutation()
  const {
    steps,
    confirmationToken,
    saveCreditCard,
    redirectToOrderDetails,
    checkoutTracking,
  } = useCheckoutContext()

  const artworkData = extractLineItemMetadata(orderData.lineItems[0]!)

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

  const handleClick = async _event => {
    checkoutTracking.clickedOrderProgression(ContextModule.ordersReview)
    setLoading(true)

    try {
      const submitOrderResult = await submitOrderMutation.submitMutation({
        variables: {
          input: {
            id: orderData.internalID,
            confirmationToken: confirmationToken.id,
            oneTimeUse: !saveCreditCard,
          },
        },
      })

      validateAndExtractOrderResponse(
        submitOrderResult.submitOrder?.orderOrError,
      )

      checkoutTracking.submittedOrder()
      redirectToOrderDetails()
    } catch (error) {
      setLoading(false)
      logger.error("Error while submitting order", error)
      handleSubmitError(error)
    }
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 4]}>
      <Text
        variant={["sm-display", "md"]}
        fontWeight={["bold", "normal"]}
        color="mono100"
      >
        Order summary
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
          <Spacer y={0.5} />
          {artworkData.attributionClass?.shortDescription && (
            <Text overflowEllipsis variant="xs" color="mono60" textAlign="left">
              {artworkData.attributionClass.shortDescription}
            </Text>
          )}
          {artworkData.dimensions && (
            <Text overflowEllipsis variant="xs" color="mono60" textAlign="left">
              {[artworkData.dimensions.in, artworkData.dimensions.cm].join(
                " | ",
              )}
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
  }
`
