import BidStatus from '../bid_status'
import { get } from 'lodash'
import React from 'react';
import { titleAndYear } from '../../utils/artwork'

export default function AuctionGridArtwork({ saleArtwork }) {
  const artwork = saleArtwork.artwork
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  let bidStatus
  bidStatus = <BidStatus saleArtwork={saleArtwork} />

  return (
    <a className='auction2-grid-artwork' key={artwork._id} href={`/artwork/${artwork._id}`}>
      <div className='auction2-grid-artwork__image-container'>
        <div className='vam-outer'>
          <div className='vam-inner'>
            <div className='auction2-grid-artwork__image'>
              <img src={artworkImage} alt={artwork.title}></img>
            </div>
          </div>
        </div>
      </div>
      <div className='auction2-grid-artwork__metadata'>
        <div className='auction2-grid-artwork__lot-information'>
          <div className='auction2-grid-artwork__lot-number'>
            Lot {saleArtwork.lot_label}
          </div>
          <div>{ bidStatus }</div>
        </div>
        <div className='auction2-grid-artwork__artists'>
          {artistDisplay}
        </div>
        <div className='auction2-grid-artwork__title' dangerouslySetInnerHTML={{ __html: titleAndYear(artwork.title, artwork.date) }}></div>
      </div>
    </a>
  );
}
