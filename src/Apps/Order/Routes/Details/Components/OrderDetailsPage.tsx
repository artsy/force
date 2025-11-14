import { ContextModule } from "@artsy/cohesion"
import { Box, Column, GridColumns, Spacer } from "@artsy/palette"
import { OrderDetailsFulfillmentInfo } from "Apps/Order/Routes/Details/Components/OrderDetailsFulfillmentInfo"
import { OrderDetailsOrderSummary } from "Apps/Order/Routes/Details/Components/OrderDetailsOrderSummary"
import { OrderDetailsPaymentInfo } from "Apps/Order/Routes/Details/Components/OrderDetailsPaymentInfo"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Components/Order2HelpLinks"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import type { OrderDetailsPage_me$key } from "__generated__/OrderDetailsPage_me.graphql"
import type { OrderDetailsPage_order$key } from "__generated__/OrderDetailsPage_order.graphql"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"
import { OrderDetailsHeader } from "./OrderDetailsHeader"
import { OrderDetailsMessage } from "./OrderDetailsMessage"

interface OrderDetailsPageProps {
  order: OrderDetailsPage_order$key
  me: OrderDetailsPage_me$key
}

export const OrderDetailsPage = ({ order, me }: OrderDetailsPageProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const tracking = useOrder2Tracking(orderData.source, orderData.mode)

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (!!orderData) {
      tracking.orderDetailsViewed(
        ContextModule.ordersDetail,
        orderData.displayTexts.messageType,
      )
    }
  }, [])

  const artworkSlug = orderData.lineItems[0]?.artwork?.slug

  return (
    <GridColumns py={[0, 4]} px={[0, 4]}>
      <Column span={[12, 7, 6, 5]} start={[1, 1, 2, 3]}>
        <OrderDetailsHeader order={orderData} />

        <OrderDetailsMessage order={orderData} me={meData} />

        <Box display={["block", "none"]}>
          <OrderDetailsOrderSummary order={orderData} />
        </Box>

        <Spacer y={1} />

        <OrderDetailsFulfillmentInfo order={orderData} />

        <Spacer y={1} />

        <OrderDetailsPaymentInfo order={orderData} />

        <Box display={["block", "none"]}>
          <Order2HelpLinksWithInquiry
            order={orderData}
            artworkID={artworkSlug as string}
            contextModule={ContextModule.ordersDetail}
          />
          <Spacer y={[4, 0]} />
        </Box>
      </Column>
      <Column
        span={[12, 5, 4, 3]}
        start={[1, 8, 8, 8]}
        display={["none", "block"]}
      >
        <OrderDetailsOrderSummary order={orderData} />
        <Spacer y={1} />
        <Order2HelpLinksWithInquiry
          order={orderData}
          artworkID={artworkSlug as string}
          contextModule={ContextModule.ordersDetail}
        />
      </Column>
    </GridColumns>
  )
}

const ME_FRAGMENT = graphql`
  fragment OrderDetailsPage_me on Me {
    ...OrderDetailsMessage_me
  }
`
const ORDER_FRAGMENT = graphql`
  fragment OrderDetailsPage_order on Order {
    lineItems {
      artwork {
        slug
      }
    }
    mode
    source
    displayTexts {
      messageType
    }
    ...OrderDetailsHeader_order
    ...OrderDetailsMessage_order
    ...OrderDetailsOrderSummary_order
    ...OrderDetailsPricingBreakdown_order
    ...OrderDetailsPaymentInfo_order
    ...OrderDetailsFulfillmentInfo_order
    ...Order2HelpLinks_order
  }
`
