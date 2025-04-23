import { useFlag } from "@unleash/proxy-client-react"
import { Order2DetailsPage } from "Apps/Order2/Routes/Details/Components/Order2DetailsPage"
import createLogger from "Utils/logger"
import type { Order2DetailsRoute_viewer$key } from "__generated__/Order2DetailsRoute_viewer.graphql"
import type React from "react"
import { useEffect } from "react"
import { Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface DetailsProps {
  viewer: Order2DetailsRoute_viewer$key
}

const logger = createLogger("Order2DetailsRoute.tsx")

export const Order2DetailsRoute: React.FC<DetailsProps> = ({ viewer }) => {
  const isOrderDetailsFlagEnabled = useFlag("emerald_order-details-page")
  const data = useFragment(FRAGMENT, viewer)

  // biome-ignore lint/correctness/useExhaustiveDependencies: placeholder because we aren't using this yet
  useEffect(() => {
    logger.warn("Order details page data:", data, isOrderDetailsFlagEnabled)
  }, [isOrderDetailsFlagEnabled])

  return (
    <>
      <Title>Order details | Artsy</Title>
      <Order2DetailsPage />
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "String!" }) {
    me {
      order(id: $orderID) {
        internalID
      }
    }
  }
`
