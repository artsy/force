import { default as React, PropTypes } from 'react';
import BidStatus from '../bid_status/index'
import { titleAndYear } from '../../utils/artwork'
import { get } from 'lodash'

export default function AuctionGridArtwork({ artwork }, _) {
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  let bidStatus
  if (artwork.sale_artwork) {
    bidStatus = <BidStatus artwork={artwork} />
  }

  return (
    <div className='auction2-grid-artwork' key={artwork._id}>
      <div className='auction2-grid-artwork__image-container'>
        <div className='vam-outer'>
          <div className='vam-inner'>
            <a className='auction2-grid-artwork__image' href={`/artwork/${artwork._id}`}>
              <img src={artworkImage} alt={artwork.title}></img>
            </a>
          </div>
        </div>
      </div>
      <div className='auction2-grid-artwork__lot-information'>
        <div className='auction2-grid-artwork__lot-number'>
          Lot {artwork.sale_artwork && artwork.sale_artwork.lot_number}
        </div>
        <div>{ bidStatus }</div>
      </div>
      <div className='auction2-grid-artwork__artists'>
        {artistDisplay}
      </div>
      <div className='auction2-grid-artwork__title' dangerouslySetInnerHTML={{ __html: titleAndYear(artwork.title, artwork.date) }}></div>
    </div>
  );
}

AuctionGridArtwork.propTypes = {
  artwork: PropTypes.object.isRequired,
};
