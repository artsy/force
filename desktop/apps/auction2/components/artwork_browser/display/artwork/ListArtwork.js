import BidStatus from './BidStatus'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import classNames from 'classnames'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'
import { connect } from 'react-redux'
import { get } from 'lodash'

function ListArtwork (props) {
  const artwork = props.artwork.artwork
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'image.resized.url', '/images/missing_image.png')

  const b = block('auction2-page-list-artwork')
  const auctionArtworkClasses = classNames(b(), { 'auction2-open': props.isClosed })

  return (
    <a className={auctionArtworkClasses} key={artwork._id} href={`/artwork/${artwork.id}`}>
      <div className={b('image-container')}>
        <div className={b('image')}>
          <img src={artworkImage} alt={artwork.title} />
        </div>
      </div>
      <div className={b('metadata')}>
        <div className={b('artists')}>
          {artistDisplay}
        </div>
        <div
          className={b('title')}
          dangerouslySetInnerHTML={{
            __html: titleAndYear(artwork.title, artwork.date)
          }}
        />
      </div>
      <div className={b('lot-number')}>
        Lot {artwork.lot_label}
      </div>
      { !props.isClosed &&
        <BidStatus
          artworkItem={props.artwork}
        /> }
    </a>
  )
}

ListArtwork.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  artwork: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.auctionArtworks.isClosed,
    isMobile: state.app.isMobile
  }
}

export default connect(
  mapStateToProps
)(ListArtwork)
