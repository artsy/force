import PropTypes from 'prop-types'
import React from 'react'
import { partition, take } from 'underscore'
import AuctionBlock from '../auction_block/auction_block'

export default function CurrentAuctions({ auctionContextId, sales }) {
  const sortedSales = sortSales(sales, auctionContextId)

  return (
    <section className="artwork-current-auctions">
      <div className="artwork-current-auctions__header-area">
        <h3>Current Auctions on Artsy</h3>

        <a href="/auctions">View All Auctions</a>
      </div>

      <div className="artwork-current-auctions__sales">
        {sortedSales.map((sale) => {
          return <AuctionBlock key={sale.id} sale={sale} />
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
  sales: PropTypes.array.isRequired,
}

CurrentAuctions.defaultProps = {
  auctionContextId: '',
}

// Helpers

function sortSales(sales, auctionContextId = '', CAP = 4) {
  const [currentSale, rest] = partition(
    sales,
    (sale) => sale.id === auctionContextId
  )
  const sorted = take(currentSale.concat(rest), CAP)
  return sorted
}
