import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Details_order$data } from "__generated__/Details_order.graphql"

interface DetailsProps {
  order: Details_order$data
}

const Details: React.FC<DetailsProps> = ({ order }) => {
  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.internalID}</p>
    </div>
  )
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  order: graphql`
    fragment Details_order on CommerceOrder {
      internalID
    }
  `,
})
