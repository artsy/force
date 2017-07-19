import BidStatus from './BidStatus'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import classNames from 'classnames'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { truncate } from 'underscore.string'

function ListArtwork (props) {
  const {
    artwork,
    artistDisplay,
    date,
    image,
    isClosed,
    isMobile,
    lotLabel,
    title
  } = props

  const b = block('auction2-page-list-artwork')
  const auctionArtworkClasses = classNames(b(), { 'auction2-open': isClosed })

  return (
    isMobile
      ? <a className={auctionArtworkClasses} key={artwork._id} href={`/artwork/${artwork.id}`}>
          <div className={b('image')}>
            <img src={image} alt={title} />
          </div>

          <div className={b('metadata')}>
            <div className={b('lot-number')}>
              Lot {lotLabel}
            </div>

            <div className={b('artists')}>
              {artistDisplay}
            </div>
            <div
              className={b('title')}
              dangerouslySetInnerHTML={{
                __html: titleAndYear(truncate(title, 30), date)
              }}
            />

          { !isClosed &&
            <BidStatus
              artworkItem={props.artwork}
            /> }
          </div>
        </a>

        // Desktop
      : <a className={auctionArtworkClasses} key={artwork._id} href={`/artwork/${artwork.id}`}>
          <div className={b('image-container')}>
            <div className={b('image')}>
              <img src={image} alt={artwork.title} />
            </div>
          </div>
          <div className={b('metadata')}>
            <div className={b('artists')}>
              {artistDisplay}
            </div>
            <div
              className={b('title')}
              dangerouslySetInnerHTML={{
                __html: titleAndYear(title, date)
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
  artwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string.isRequired,
  artistDisplay: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
  const { artwork } = props
  const image = get(artwork, 'artwork.images.0.image_medium', '/images/missing_image.png')
  const { artists } = artwork.artwork
  const artistDisplay = artists && artists.length > 0
    ? artists.map((aa) => aa.name).join(', ')
    : ''

  return {
    date: artwork.artwork.date,
    image,
    isClosed: state.artworkBrowser.isClosed || state.app.auction.isClosed(),
    isMobile: state.app.isMobile,
    lotLabel: artwork.lot_label,
    artistDisplay,
    title: artwork.artwork.title
  }
}

export default connect(
  mapStateToProps
)(ListArtwork)

export const test = { ListArtwork }
