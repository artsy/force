import React, { PropTypes } from 'react'
import { titleize } from 'underscore.string'
import { upcomingLabel } from '../../lib/auction_label'

export default function CurrentAuctions ({ sales }) {
  return (
    <section className='artwork-current-auctions'>
      <h3>
        Current Auctions on Artsy
      </h3>

      <div className='sales'>
        {sales.map((sale, key) => {
          const {
            cover_image: {
              cropped: {
                url
              }
            },
            end_at,
            href,
            name,
            live_start_at,
            start_at,
            status
          } = sale

          const statusLabel = titleize(
            'Auction ' + upcomingLabel(start_at, end_at, live_start_at, status)
          )

          return (
            <div className='sale-item' key={key}>
              <a href={href}>
                <img src={url} alt={name} />

                <div className='label-container'>
                  <div className='name'>
                    {name}
                  </div>

                  <div className='status'>
                    {statusLabel}
                  </div>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

CurrentAuctions.propTypes = {
  sales: PropTypes.array.isRequired
}
