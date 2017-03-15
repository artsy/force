import CurrentAuctions from './current_auctions.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { data as sd } from 'sharify'
import { isEmpty } from 'underscore'

export default function mount (data) {
  const {
    sales
  } = data

  const hasSales = !isEmpty(sales)

  if (hasSales) {
    ReactDOM.render(
      <CurrentAuctions
        auctionContextId={sd.AUCTION.id}
        sales={sales}
      />,
      document.getElementById('react-mount-current-auctions')
    )
  }
}
