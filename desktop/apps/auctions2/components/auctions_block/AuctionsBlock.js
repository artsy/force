import AuctionsItem from 'desktop/apps/auctions2/components/auctions_block/AuctionsItem'
import PropTypes from 'prop-types'
import React from 'react'

function AuctionsBlock({auctions, liveIntegration, isFetchingAuctions}) {
  if (isFetchingAuctions) {
    return <div className='auctions-block loading'></div>
  } else {
    return (
      <div className='auctions-block'>
        <div className='auctions-block__title'>
          {liveIntegration ? 'Ongoing Live Auctions'  : 'Ongoing Timed Auctions'}
        </div>
        <div className='auctions-block__list'>
          {auctions.map((auction, key) => (
            <AuctionsItem
              auction={auction}
              liveIntegration={liveIntegration}
              key={key} />
          ))}
        </div>
      </div>
    )
  }
}

export default AuctionsBlock

AuctionsBlock.propTypes = {
  auctions: PropTypes.array.isRequired,
  liveIntegration: PropTypes.bool,
  isFetchingAuctions: PropTypes.bool
}
