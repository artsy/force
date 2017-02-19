import { default as React, PropTypes } from 'react';
import BidStatus from '../bid_status/index'

export default function AuctionGridArtwork({ artwork }, _) {
  const artists = artwork.get('artists')
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null

  let bidStatus
  if (artwork.get('sale_artwork')) {
    bidStatus = <BidStatus artwork={artwork} />
  }

  return (
    <div className='auction2-list-artwork' key={artwork._id}>
      <div className='auction2-list-artwork__image-container'>
        <a className='auction2-list-artwork__image' href={artwork.href()}>
          <img src={artwork.defaultImage().get('image_url')} alt={artwork.title}></img>
        </a>
      </div>
      <div className='auction2-list-artwork__metadata'>
        {artistDisplay}
        <div className='auction2-list-artwork__title' dangerouslySetInnerHTML={{ __html: artwork.titleAndYear() }}></div>
      </div>
      <div className='auction2-list-artwork__lot-number'>
        Lot {artwork.get('sale_artwork') && artwork.get('sale_artwork').lot_number}
      </div>
      { bidStatus }
    </div>
  );
}

AuctionGridArtwork.propTypes = {
  artwork: PropTypes.object.isRequired,
};
