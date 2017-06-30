import React from 'react'
import BidStatus from './BidStatus'
import get from 'lodash.get'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'
import { connect } from 'react-redux'

function MasonryArtwork (props) {
  const { artwork, isClosed } = props
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')
  const { artists } = artwork.artwork.artists
  const artistDisplay = artists && artists.length > 0
    ? artists.map((aa) => aa.name).join(', ')
    : null

  return (
    <div>
      <div className=''>
        <img src={artworkImage} alt={artwork.title} / >
      </div>
      <div className=''>
        <div className=''>
          Lot {artwork.lot_label}
        </div>
      </div>
      {/* FIXME: Fix this crazy shit  */}
      {artwork.artwork.name}
      <div
        className=''
        dangerouslySetInnerHTML={{
          __html: titleAndYear(artwork.title, artwork.date)
        }}
      />

      { !isClosed &&
        <BidStatus
          artworkItem={artwork}
        /> }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.app.auction.isClosed()
  }
}

export default connect(
  mapStateToProps
)(MasonryArtwork)
