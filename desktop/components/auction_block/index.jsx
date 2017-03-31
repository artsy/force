import AuctionBlock from './auction_block.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty, isString } from 'underscore'

export default function mount (data, selector = '#react-mount-current-auctions') {
  const {
    relatedAuction,
    sale
  } = data

  const shouldMount = !isEmpty(sale.id) && isString(selector)

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
