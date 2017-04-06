import BidStatus from '../bid_status'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { get } from 'lodash'
import React from 'react';
import { titleAndYear } from '../../utils/artwork'

function AuctionListArtwork({ isOpen, saleArtwork }) {
  const artwork = saleArtwork.artwork
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  const auctionArtworkClasses = classNames(
    'auction2-list-artwork',
    { 'auction-open': isOpen }
  )

  let bidStatus
  bidStatus = <BidStatus saleArtwork={saleArtwork} />

  return (
    <a className={auctionArtworkClasses} key={artwork._id} href={`/artwork/${artwork._id}`}>
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
        Lot {saleArtwork.lot_label}
      </div>
      { isOpen && bidStatus }
    </a>
  );
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.auctionArtworks.isOpen
  }
}

export default connect(
  mapStateToProps
)(AuctionListArtwork)
