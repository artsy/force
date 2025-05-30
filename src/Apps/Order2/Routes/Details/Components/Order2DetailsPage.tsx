import { Column, GridColumns, Spacer } from "@artsy/palette"
import { Order2DetailsFulfillmentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsFulfillmentInfo"
import { Order2DetailsHelpLinks } from "Apps/Order2/Routes/Details/Components/Order2DetailsHelpLinks"
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

  return (
    <GridColumns backgroundColor="mono5">
      <Column span={[12]} maxWidth="754px">
        <Order2DetailsHeader order={orderData} />

        <Order2DetailsMessage order={orderData} />

        <Order2DetailsOrderSummary order={orderData} />

        <Spacer y={1} />

        <Order2DetailsFulfillmentInfo order={orderData} />

        <Spacer y={1} />

        <Order2DetailsPaymentInfo order={orderData} />

        <Order2DetailsHelpLinks order={orderData} />
      </Column>
    </GridColumns>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsPage_order on Order {
    ...Order2DetailsHeader_order
    ...Order2DetailsMessage_order
    ...Order2DetailsOrderSummary_order
    ...Order2PricingBreakdown_order
    ...Order2DetailsPaymentInfo_order
    ...Order2DetailsFulfillmentInfo_order
    ...Order2DetailsHelpLinks_order
  }
`
