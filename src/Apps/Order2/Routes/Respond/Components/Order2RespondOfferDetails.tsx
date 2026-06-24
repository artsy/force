import { ContextModule } from "@artsy/cohesion"
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

  // Gallery's offer being responded to — fall back through the fields the
  // exchange API may use (legacy `order.lastOffer` ≈ `lastSubmittedOffer`).
  const submittedOffers = orderData.submittedOffers ?? []
  const galleryOffer =
    orderData.lastSubmittedOffer ??
    submittedOffers[submittedOffers.length - 1] ??
    orderData.pendingOffer
  const offerAmount = galleryOffer?.amount?.display

  // Countdown to when the gallery's offer expires. Matches the partner-offer
  // timer pattern in `Order2CheckoutPricingBreakdown` / `Order2ReviewStep`.
  // Legacy: `CountdownTimer` from `lastOffer.createdAt` to `stateExpiresAt`.
  const timer = useCountdownTimer({
    startTime: galleryOffer?.createdAt ?? "",
    endTime: orderData.buyerStateExpiresAt ?? "",
    imminentTime: 1,
  })

  return (
    <Flex flexDirection="column" backgroundColor="mono5" px={[1, 1, 2]} py={1}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Text variant="sm" color="mono100" fontWeight="bold">
          Gallery offer
        </Text>
        {timer.hasValidRemainingTime && (
          <Text variant="sm" color="mono60">
            Exp. {timer.remainingTime}
          </Text>
        )}
      </Flex>

      {offerAmount && (
        <Flex justifyContent="space-between" alignItems="baseline">
          <Text variant="sm" color="mono60">
            Offer amount
          </Text>
          <Text variant="sm" color="mono60">
            {offerAmount}
          </Text>
        </Flex>
      )}

      <Spacer y={1} />

      {/* Renders price / shipping / taxes* / total + import-duties footnote
          (legacy `TransactionDetailsSummaryItem` equivalent on the new Order) */}
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
    submittedOffers {
      createdAt
      amount {
        display
      }
    }
    pendingOffer {
      createdAt
      amount {
        display
      }
    }
    ...Order2CheckoutPricingBreakdown_order
  }
`
