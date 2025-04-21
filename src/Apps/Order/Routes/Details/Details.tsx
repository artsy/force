import { useFlag } from "@unleash/proxy-client-react"
import { DetailsPage } from "Apps/Order/Routes/Details/Components/DetailsPage"
import { ErrorPage } from "Components/ErrorPage"
import type { Details_order$data } from "__generated__/Details_order.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface DetailsProps {
  order: Details_order$data
}

const Details: React.FC<DetailsProps> = ({ order }) => {
  const isOrderDetailsFlagEnabled = useFlag("emerald_order-details-page")
  // TODO: this is not great as it loads with flag false for couple of times
  // before loading with true 2 times
  // console.log("!!!!!!!!!!!!!!!!!!", isOrderDetailsFlagEnabled)

  if (!isOrderDetailsFlagEnabled) return <ErrorPage code={404} />

  return <DetailsPage orderId={order.internalID} />
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  order: graphql`
    fragment Details_order on CommerceOrder {
      internalID
    }
  `,
})
