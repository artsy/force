import { default as React, PropTypes } from 'react';
import BidStatus from '../bid_status/index'

export default function AuctionGridArtwork({ artwork }, _) {
  const artists = artwork.get('artists')
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null

  return (
    <div className='auction-grid-artwork' key={artwork._id}>
      <div className='auction-grid-artwork__image-container'>
        <div className='vam-outer'>
          <div className='vam-inner'>
            <a className='auction-grid-artwork__image' href={artwork.href()}>
              <img src={artwork.defaultImage().get('image_url')} alt={artwork.title}></img>
            </a>
          </div>
        </div>
      </div>
      <div className='auction-grid-artwork__primary-information'>
        <div className='auction-grid-artwork__lot-number'>
          Lot {artwork.get('sale_artwork').lot_number}
        </div>
        <div className='auction-grid-artwork__artists'>
          {artistDisplay}
        </div>
        <div className='auction-grid-artwork__title' dangerouslySetInnerHTML={{ __html: artwork.titleAndYear() }}></div>
        <div className='auction-grid-artwork__sale'>
          { artwork.get('sale') && artwork.get('sale').name }
        </div>
      </div>
      <BidStatus artwork={artwork} />
    </div>
  );
}

AuctionGridArtwork.propTypes = {
  artwork: PropTypes.object.isRequired,
};
