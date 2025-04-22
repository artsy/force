import { useFlag } from "@unleash/proxy-client-react"
import { Order2DetailsPage } from "Apps/Order2/Routes/Details/Components/Order2DetailsPage"
import { ErrorPage } from "Components/ErrorPage"
import type { Order2DetailsRoute_order$key } from "__generated__/Order2DetailsRoute_order.graphql"
import type React from "react"
import { Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface DetailsProps {
  order: Order2DetailsRoute_order$key
}

export const Order2DetailsRoute: React.FC<DetailsProps> = ({ order }) => {
  const isOrderDetailsFlagEnabled = useFlag("emerald_order-details-page")
  const data = useFragment(ORDER_FRAGMENT, order)
  // TODO: this is not great as it loads with flag false for couple of times
  // before loading with true 2 times
  // console.log("!!!!!!!!!!!!!!!!!!", isOrderDetailsFlagEnabled)

  if (!isOrderDetailsFlagEnabled) return <ErrorPage code={404} />

  return (
    <>
      <Title>Order details | Artsy</Title>
      <Order2DetailsPage orderId={data.internalID} />
    </>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2DetailsRoute_order on Order {
    internalID
  }
`
