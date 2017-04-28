import BidStatus from '../bid_status'
import { connect } from 'react-redux'
import { get } from 'lodash'
import React from 'react';
import { titleAndYear } from '../../utils/artwork'

function AuctionGridArtwork({ isClosed, saleArtwork }) {
  const artwork = saleArtwork.artwork
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  let bidStatus
  bidStatus = <BidStatus saleArtwork={saleArtwork} />

  return (
    <a className='auction-page-grid-artwork' key={artwork._id} href={`/artwork/${artwork.id}`}>
      <div className='auction-page-grid-artwork__image-container'>
        <div className='vam-outer'>
          <div className='vam-inner'>
            <div className='auction-page-grid-artwork__image'>
              <img src={artworkImage} alt={artwork.title}></img>
            </div>
          </div>
        </div>
      </div>
      <div className='auction-page-grid-artwork__metadata'>
        <div className='auction-page-grid-artwork__lot-information'>
          <div className='auction-page-grid-artwork__lot-number'>
            Lot {saleArtwork.lot_label}
          </div>
          { !isClosed && bidStatus }
        </div>
        <div className='auction-page-grid-artwork__artists'>
          {artistDisplay}
        </div>
        <div className='auction-page-grid-artwork__title' dangerouslySetInnerHTML={{ __html: titleAndYear(artwork.title, artwork.date) }}></div>
      </div>
    </a>
  );
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.auctionArtworks.isClosed
  }
}

export default connect(
  mapStateToProps
)(AuctionGridArtwork)

