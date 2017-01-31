import { default as React, PropTypes } from 'react';

export default function BidStatus({ artwork }, _) {
  const saleArtwork = artwork.get('sale_artwork')

  let bidLabel
  if (saleArtwork && saleArtwork.counts && saleArtwork.counts.bidder_positions > 0) {
    bidLabel = `<b>Current Bid:</b> (${saleArtwork.counts.bidder_positions} Bids)`
  } else {
    bidLabel = `<b>Starting Bid</b>`
  }

  return (
    <div className='auction2-bid-status'>
      <span className='auction2-bid-status__bid-label' dangerouslySetInnerHTML={{ __html: bidLabel }}></span>
      <span className='auction2-bid-status__bid-amount'>{ saleArtwork.current_bid.display }</span>
    </div>
  );
}

BidStatus.propTypes = {
  artwork: PropTypes.object.isRequired,
};
