import React, { PropTypes } from 'react'
import upcomingLabel from './utils/upcoming_label'
import { partition, take } from 'underscore'

export default function CurrentAuctions ({ auctionContextId, sales }) {
  const sortedSales = sortSales(sales, auctionContextId)

  return (
    <section className='artwork-current-auctions'>
      <div className='artwork-current-auctions__header-area'>
        <h3>
          Current Auctions on Artsy
        </h3>

        <a href='/auctions'>
          View All Auctions
        </a>
      </div>

      <div className='artwork-current-auctions__sales'>
        {sortedSales.map((sale) => {
          const {
            cover_image,
            end_at,
            href,
            id,
            is_live_open,
            is_preview,
            name,
            live_start_at,
            start_at
          } = sale

          const image = (cover_image &&
                        cover_image.cropped &&
                        cover_image.cropped.url) ||
                        '/images/missing_image.png'

          const statusLabel = 'Auction ' + upcomingLabel(start_at, end_at,
                                                         live_start_at, is_live_open,
                                                         is_preview)
          return (
            <div className='artwork-current-auctions__sale-item' key={id}>
              <a href={href}>
                <img src={image} alt={name} />

                <div className='artwork-current-auctions__label-container'>
                  <div className='artwork-current-auctions__name'>
                    {name}
                  </div>

                  <div className='artwork-current-auctions__status'>
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
  /**
   * If the module is displayed in an Auction context (such as viewing an
   * artwork that is in a sale) and an auction id is provided, ensure the first
   * displayed item is the same as the context.
   */
  auctionContextId: PropTypes.string,
  sales: PropTypes.array.isRequired
}

CurrentAuctions.defaultProps = {
  auctionContextId: ''
}

// Helpers
// -------

function sortSales (sales, auctionContextId = '', CAP = 4) {
  const [ currentSale, rest ] = partition(sales, (sale) => sale.id === auctionContextId)
  const sorted = take(currentSale.concat(rest), CAP)
  return sorted
}
