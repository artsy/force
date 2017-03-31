import AuctionBlock from './auction_block.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty, isString } from 'underscore'

export default function mount (data, selector = '#react-mount-current-auctions') {
  const {
    cover_image,
    end_at,
    href,
    id,
    is_closed,
    is_live_open,
    is_preview,
    name,
    live_start_at,
    relatedAuction,
    start_at
  } = data

  const shouldMount = !isEmpty(id) && isString(selector)

  if (shouldMount) {
    const mountPoint = document.querySelector(selector)

    ReactDOM.render(
      <AuctionBlock
        cover_image={cover_image}
        end_at={end_at}
        href={href}
        id={id}
        is_closed={is_closed}
        is_live_open={is_live_open}
        is_preview={is_preview}
        name={name}
        live_start_at={live_start_at}
        relatedAuction={relatedAuction}
        start_at={start_at}
      />,
      mountPoint
    )
  }
}
