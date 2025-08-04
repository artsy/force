import { ContextModule } from "@artsy/cohesion"
import { Box, Column, GridColumns, Spacer } from "@artsy/palette"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Components/Order2HelpLinks"
import { OrderDetailsFulfillmentInfo } from "Apps/Order/Routes/Details/Components/OrderDetailsFulfillmentInfo"
import { OrderDetailsOrderSummary } from "Apps/Order/Routes/Details/Components/OrderDetailsOrderSummary"
import { OrderDetailsPaymentInfo } from "Apps/Order/Routes/Details/Components/OrderDetailsPaymentInfo"
import type { OrderDetailsPage_order$key } from "__generated__/OrderDetailsPage_order.graphql"
import { graphql, useFragment } from "react-relay"
import { OrderDetailsHeader } from "./OrderDetailsHeader"
import { OrderDetailsMessage } from "./OrderDetailsMessage"
import { useEffect } from "react"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"

interface OrderDetailsPageProps {
  order: OrderDetailsPage_order$key
}

export const OrderDetailsPage = ({ order }: OrderDetailsPageProps) => {
  const orderData = useFragment(FRAGMENT, order)
  const tracking = useOrder2Tracking(orderData.source, orderData.mode)

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

        <OrderDetailsMessage order={orderData} />

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

const FRAGMENT = graphql`
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
