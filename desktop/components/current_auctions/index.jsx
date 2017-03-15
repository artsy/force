import CurrentAuctions from './current_auctions.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from 'underscore'

export {
  CurrentAuctions
}

export default function mount (data) {
  const {
    auctionContextId,
    sales
  } = data

  const hasSales = !isEmpty(sales)

  if (hasSales) {
    ReactDOM.render(
      <CurrentAuctions
        auctionContextId={auctionContextId}
        sales={sales}
      />,
      document.getElementById('react-mount-current-auctions')
    )
  }
}
