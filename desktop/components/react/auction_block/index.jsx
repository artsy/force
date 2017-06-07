import AuctionBlock from './auction_block.jsx'
import invariant from 'invariant'
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty, isString } from 'underscore'

export {
  AuctionBlock
}

export default function mount (data, selector = '#react-mount-auction-block') {
  const { relatedAuction, sale } = data
  const shouldMount = !isEmpty(sale.id) && isString(selector)

  invariant(shouldMount,
    `Error mounting <AuctionBlock />: sale.id (${sale.id}) or selector ` +
    `(${selector}) is invalid.`
  )

  if (shouldMount) {
    const mountPoint = document.querySelector(selector)

    ReactDOM.render(
      <AuctionBlock
        relatedAuction={relatedAuction}
        sale={sale}
      />,
      mountPoint
    )
  }
}
