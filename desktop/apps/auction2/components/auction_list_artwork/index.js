import BidStatus from '../bid_status'
import { get } from 'lodash'
import { default as React, PropTypes } from 'react';
import { titleAndYear } from '../../utils/artwork'

export default function AuctionGridArtwork({ saleArtwork }) {
  const artwork = saleArtwork.artwork
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  let bidStatus
  bidStatus = <BidStatus saleArtwork={saleArtwork} />

  return (
    <a className='auction2-list-artwork' key={artwork._id} href={`/artwork/${artwork._id}`}>
      <div className='auction2-list-artwork__image-container'>
        <div className='auction2-list-artwork__image'>
          <img src={artworkImage} alt={artwork.title}></img>
        </div>
      </div>
      <div className='auction2-list-artwork__metadata'>
        <div className='auction2-list-artwork__artists'>
          {artistDisplay}
        </div>
        <div className='auction2-list-artwork__title' dangerouslySetInnerHTML={{ __html: titleAndYear(artwork.title, artwork.date) }}></div>
      </div>
      <div className='auction2-list-artwork__lot-number'>
        Lot {saleArtwork.lot_number}
      </div>
      { bidStatus }
    </a>
  );
}
