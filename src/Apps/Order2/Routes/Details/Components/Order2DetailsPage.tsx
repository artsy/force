import { Box, Column, GridColumns, Spacer } from "@artsy/palette"
import { Order2DetailsFulfillmentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsFulfillmentInfo"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Routes/Checkout/Components/Order2HelpLinks"
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
    <GridColumns backgroundColor="mono5" py={[0, 4]} px={[0, 0, 4]}>
      <Column span={[12, 12, 7]} width="100%">
        <Box
          width="100%"
          maxWidth="754px"
          mx={["auto", "auto", 0]}
          ml={[0, "auto", "auto"]}
        >
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
            />
            <Spacer y={[4, 0]} />
          </Box>
        </Box>
      </Column>
      <Column
        span={[12, 12, 5]}
        display={["none", "none", "block"]}
        maxWidth="445px"
      >
        <Order2DetailsOrderSummary order={orderData} />
        <Spacer y={1} />
        <Order2HelpLinksWithInquiry
          order={orderData}
          artworkID={artworkSlug as string}
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
