import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Button, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { useSubmitOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useSubmitOrderMutation"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { Order2PricingBreakdown } from "Apps/Order2/Components/Order2PricingBreakdown"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import type { Order2ReviewStep_order$key } from "__generated__/Order2ReviewStep_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2ReviewStep.tsx")

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
}

export const Order2ReviewStep: React.FC<Order2ReviewStepProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion
  const submitOrderMutation = useSubmitOrderMutation()
  const { steps, confirmationToken, redirectToOrderDetails, checkoutTracking } =
    useCheckoutContext()
  const stepState = steps?.find(
    step => step.name === CheckoutStepName.CONFIRMATION,
  )?.state

  const [loading, setLoading] = useState(false)
  const handleClick = async _event => {
    checkoutTracking.submittedOrder()
    setLoading(true)

    try {
      const submitOrderResult = await submitOrderMutation.submitMutation({
        variables: {
          input: {
            id: orderData.internalID,
            confirmationToken: confirmationToken.id,
          },
        },
      })

      validateAndExtractOrderResponse(
        submitOrderResult.submitOrder?.orderOrError,
      )

      redirectToOrderDetails()
    } catch (error) {
      setLoading(false)
      logger.error("Error while submitting order", error)
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
        <RouterLink flex={0} to={`/artwork/${artwork?.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkVersion?.image?.resized?.url}
            alt={artworkVersion?.title || ""}
            width="65px"
          />
        </RouterLink>
        <Box overflow="hidden" flex={1}>
          <Text overflowEllipsis variant="sm" color="mono100">
            {artworkVersion?.artistNames}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            {artworkVersion?.title}, {artworkVersion?.date}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            List price: $1,000,000
          </Text>
          <Spacer y={0.5} />
          <Text overflowEllipsis variant="xs" color="mono60" textAlign="left">
            From an unknown edition
          </Text>
          <Text overflowEllipsis variant="xs" color="mono60" textAlign="left">
            78 x 78 x 6in (27.9 x 27.9 x 8.9 cm)
          </Text>
        </Box>
      </Flex>
      <Box>
        <Order2PricingBreakdown order={orderData} />
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

const FRAGMENT = graphql`
  fragment Order2ReviewStep_order on Order {
    ...Order2PricingBreakdown_order
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
      artworkVersion {
        title
        artistNames
        date
        image {
          resized(width: 185, height: 138) {
            url
          }
        }
      }
    }
  }
`
