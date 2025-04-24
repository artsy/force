import { useFlag } from "@unleash/proxy-client-react"
import { useEffect } from "react"
import { Order2DetailsPage } from "Apps/Order2/Routes/Details/Components/Order2DetailsPage"
import { ErrorPage } from "Components/ErrorPage"
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
  const isOrderDetailsFlagEnabled = useFlag("emerald_order-details-page")
  const data = useFragment(FRAGMENT, viewer)

  useEffect(() => {
    logger.warn("Order details page data:", data, isOrderDetailsFlagEnabled)
  }, [isOrderDetailsFlagEnabled])

  if (!isOrderDetailsFlagEnabled) return <ErrorPage code={404} />

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
