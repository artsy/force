import { ContextModule } from "@artsy/cohesion"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Spacer, Text } from "@artsy/palette"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import type { Order2RespondOfferDetails_order$key } from "__generated__/Order2RespondOfferDetails_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondOfferDetailsProps {
  order: Order2RespondOfferDetails_order$key
}

export const Order2RespondOfferDetails: React.FC<
  Order2RespondOfferDetailsProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const { checkoutTracking } = useRespondContext()

  // The gallery's offer being responded to. By the time we're on this step the
  // gallery has submitted an offer, so `lastSubmittedOffer` is always present.
  const galleryOffer = orderData.lastSubmittedOffer
  const offerAmount = galleryOffer?.amount?.display

  const timer = useCountdownTimer({
    startTime: galleryOffer?.createdAt ?? "",
    endTime: orderData.buyerStateExpiresAt ?? "",
    imminentTime: 1,
  })

  return (
    <Flex flexDirection="column" backgroundColor="mono5" px={[1, 1, 2]} py={1}>
      {offerAmount && (
        <Flex justifyContent="space-between">
          <Flex flexWrap="nowrap">
            <Text variant="sm">Gallery offer</Text>
            <Spacer x={1} />

            {timer.hasValidRemainingTime && (
              <Flex flexDirection="row" alignItems="center">
                <StopwatchIcon height={18} />
                <Spacer x={0.5} />
                <Text variant="xs">Exp. {timer.remainingTime}</Text>
              </Flex>
            )}
          </Flex>
          <Text variant="sm">{offerAmount}</Text>
        </Flex>
      )}

      <Order2CheckoutPricingBreakdown
        order={orderData}
        contextModule={ContextModule.ordersRespond}
        checkoutTracking={checkoutTracking}
      />
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondOfferDetails_order on Order {
    buyerStateExpiresAt
    lastSubmittedOffer {
      createdAt
      amount {
        display
      }
    }
    ...Order2CheckoutPricingBreakdown_order
  }
`
