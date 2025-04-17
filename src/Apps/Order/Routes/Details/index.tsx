import { useFlag } from "@unleash/proxy-client-react"
import { OrderDetails } from "Apps/Order/Routes/Details/Components/OrderDetails"
import { ErrorPage } from "Components/ErrorPage"
import type { Details_order$data } from "__generated__/Details_order.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface DetailsProps {
  order: Details_order$data
}

const Details: React.FC<DetailsProps> = ({ order }) => {
  const isOrderDetailsFlagEnabled = useFlag("emerald_order-details-page")
  if (!isOrderDetailsFlagEnabled) return <ErrorPage code={404} />

  return <OrderDetails orderId={order.internalID} />
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  order: graphql`
    fragment Details_order on CommerceOrder {
      internalID
    }
  `,
})
