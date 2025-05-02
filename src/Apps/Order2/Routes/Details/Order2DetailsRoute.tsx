import { Order2DetailsPage } from "Apps/Order2/Routes/Details/Components/Order2DetailsPage"
import createLogger from "Utils/logger"
import type { Order2DetailsRoute_viewer$key } from "__generated__/Order2DetailsRoute_viewer.graphql"
import type React from "react"
import { Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface DetailsProps {
  viewer: Order2DetailsRoute_viewer$key
}

const logger = createLogger("Order2DetailsRoute.tsx")

export const Order2DetailsRoute: React.FC<DetailsProps> = ({ viewer }) => {
  const data = useFragment(FRAGMENT, viewer)

  logger.warn("Order details page data!!!!!!!!!!!!!!!!!!!:", data)

  return (
    <>
      <Title>Order details | Artsy</Title>
      {data.me?.order ? <Order2DetailsPage order={data.me.order} /> : null}
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "String!" }) {
    me {
      order(id: $orderID) {
        ...Order2DetailsPage_order
        internalID
      }
    }
  }
`
