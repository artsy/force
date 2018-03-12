import CurrentAuctions from './current_auctions'
import invariant from 'invariant'
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty, isString } from 'underscore'

export { CurrentAuctions }

export default function mount(
  data,
  selector = '#react-mount-current-auctions'
) {
  const { auctionContextId, sales } = data
  const shouldMount = !isEmpty(sales) && isString(selector)

  invariant(
    shouldMount,
    `Error mounting <CurrentAuctions />: sales (${sales.map(
      (s) => s.id
    )}) or ` + `selector (${selector}) is invalid.`
  )

  if (shouldMount) {
    const mountPoint = document.querySelector(selector)

    ReactDOM.render(
      <CurrentAuctions auctionContextId={auctionContextId} sales={sales} />,
      mountPoint
    )
  }
}
