import { ContextModule } from "@artsy/cohesion"
import { Box, Column, GridColumns, Spacer } from "@artsy/palette"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Routes/Checkout/Components/Order2HelpLinks"
import { Order2DetailsFulfillmentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsFulfillmentInfo"
import { Order2DetailsOrderSummary } from "Apps/Order2/Routes/Details/Components/Order2DetailsOrderSummary"
import { Order2DetailsPaymentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsPaymentInfo"
import type { Order2DetailsPage_order$key } from "__generated__/Order2DetailsPage_order.graphql"
import { graphql, useFragment } from "react-relay"
import { Order2DetailsHeader } from "./Order2DetailsHeader"
import { Order2DetailsMessage } from "./Order2DetailsMessage"

interface Order2DetailsPageProps {
  order: Order2DetailsPage_order$key
}

export const Order2DetailsPage = ({ order }: Order2DetailsPageProps) => {
  const orderData = useFragment(FRAGMENT, order)

  const artworkSlug = orderData.lineItems[0]?.artwork?.slug

  return (
    <GridColumns py={[0, 4]} px={[0, 0, 4]}>
      <Column span={[12, 12, 6]} start={[1, 1, 2]}>
        <Order2DetailsHeader order={orderData} />

        <Order2DetailsMessage order={orderData} />

        <Box display={["block", "block", "none"]}>
          <Order2DetailsOrderSummary order={orderData} />
        </Box>

        <Spacer y={1} />

        <Order2DetailsFulfillmentInfo order={orderData} />

        <Spacer y={1} />

        <Order2DetailsPaymentInfo order={orderData} />

        <Box display={["block", "block", "none"]}>
          <Order2HelpLinksWithInquiry
            order={orderData}
            artworkID={artworkSlug as string}
            contextModule={ContextModule.ordersDetail}
          />
          <Spacer y={[4, 0]} />
        </Box>
      </Column>
      <Column span={[12, 12, 4, 3]} start={[1, 1, 8, 8]}>
        <Order2DetailsOrderSummary order={orderData} />
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
  fragment Order2DetailsPage_order on Order {
    lineItems {
      artwork {
        slug
      }
    }
    ...Order2DetailsHeader_order
    ...Order2DetailsMessage_order
    ...Order2DetailsOrderSummary_order
    ...Order2PricingBreakdown_order
    ...Order2DetailsPaymentInfo_order
    ...Order2DetailsFulfillmentInfo_order
    ...Order2HelpLinks_order
  }
`
