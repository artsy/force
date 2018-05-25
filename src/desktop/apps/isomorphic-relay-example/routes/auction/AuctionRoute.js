import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export const AuctionRoute = createFragmentContainer(
  ({ sale }) => {
    return (
      <div>
        <h1 style={{ fontSize: 30 }}>{sale.name}</h1>
        <p>{sale.description}</p>
      </div>
    )
  },
  graphql`
    fragment AuctionRoute_sale on Sale {
      id
      name
      description
      artworks {
        id
      }
    }
  `
)
