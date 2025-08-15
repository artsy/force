import { OrderDetailsPage } from "Apps/Order/Routes/Details/Components/OrderDetailsPage"
import { ErrorPage } from "Components/ErrorPage"
import { Analytics } from "System/Contexts/AnalyticsContext"
import type { OrderDetailsRoute_viewer$key } from "__generated__/OrderDetailsRoute_viewer.graphql"
import type React from "react"
import { Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface DetailsProps {
  viewer: OrderDetailsRoute_viewer$key
}

export const OrderDetailsRoute: React.FC<DetailsProps> = ({ viewer }) => {
  const data = useFragment(FRAGMENT, viewer)
  const order = data.me?.order

  if (!order) {
    return <ErrorPage code={404} message="Order not found" />
  }

  return (
    <Analytics contextPageOwnerId={order.internalID}>
      <Title>Order details | Artsy</Title>
      <OrderDetailsPage order={data.me.order} me={data.me} />
    </Analytics>
  )
}

const FRAGMENT = graphql`
  fragment OrderDetailsRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "ID!" }) {
    me {
      ...OrderDetailsPage_me
      order(id: $orderID) {
        internalID
        ...OrderDetailsPage_order
      }
    }
  }
`
