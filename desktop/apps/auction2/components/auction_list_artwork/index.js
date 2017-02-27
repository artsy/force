import { default as React, PropTypes } from 'react';
import BidStatus from '../bid_status/index'
import { titleAndYear } from '../../utils/artwork'

export default function AuctionGridArtwork({ artwork }, _) {
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null

  let bidStatus
  if (artwork.sale_artwork) {
    bidStatus = <BidStatus artwork={artwork} />
  }

  return (
    <div className='auction2-list-artwork' key={artwork._id}>
      <div className='auction2-list-artwork__image-container'>
        <a className='auction2-list-artwork__image' href={`/artwork/${artwork._id}`}>
          <img src={artwork.images[0].image_url} alt={artwork.title}></img>
        </a>
      </div>
      <div className='auction2-list-artwork__metadata'>
        {artistDisplay}
        <div className='auction2-list-artwork__title' dangerouslySetInnerHTML={{ __html: titleAndYear(artwork.title, artwork.date) }}></div>
      </div>
      <div className='auction2-list-artwork__lot-number'>
        Lot {artwork.sale_artwork && artwork.sale_artwork.lot_number}
      </div>
      { bidStatus }
    </div>
  );
}

AuctionGridArtwork.propTypes = {
  artwork: PropTypes.object.isRequired,
};
