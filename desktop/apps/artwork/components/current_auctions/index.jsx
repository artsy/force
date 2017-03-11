import CurrentAuctions from './current_auctions.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from 'underscore'

export default function mount (data) {
  const {
    sales
  } = data

  const hasSales = !isEmpty(sales)

  if (hasSales) {
    ReactDOM.render(
      <CurrentAuctions sales={sales} />,
      document.getElementById('react-mount-current-auctions')
    )
  }
}
