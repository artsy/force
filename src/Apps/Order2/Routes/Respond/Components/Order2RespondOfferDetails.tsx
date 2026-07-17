import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { Order2PricingBreakdown } from "Apps/Order2/Components/Order2PricingBreakdown"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
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

  return (
    <Flex flexDirection="column" backgroundColor="mono5" px={[1, 1, 2]} py={1}>
      <Order2PricingBreakdown
        order={orderData}
        contextModule={ContextModule.ordersRespond}
        checkoutTracking={checkoutTracking}
        priceFromPendingOffer={false}
      />
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondOfferDetails_order on Order {
    ...Order2PricingBreakdown_order
  }
`
