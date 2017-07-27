import BidStatus from './BidStatus'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'
import { connect } from 'react-redux'
import { get } from 'lodash'

function GridArtwork (props) {
  const {
    artwork,
    artistDisplay,
    date,
    image,
    isClosed,
    lotLabel,
    title
  } = props

  const b = block('auction2-page-GridArtwork')

  return (
    <a className={b()} key={artwork._id} href={`/artwork/${artwork.id}`}>
      <div className={b('image-container')}>
        <div className='vam-outer'>
          <div className='vam-inner'>
            <div className={b('image')}>
              <img src={image} alt={title} / >
            </div>
          </div>
        </div>
      </div>
      <div className={b('metadata')}>
        <div className={b('lot-information')}>
          <div className={b('lot-number')}>
            Lot {lotLabel}
          </div>
          { !isClosed &&
            <BidStatus
              artworkItem={artwork}
            /> }
        </div>
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
    </a>
  )
}

GridArtwork.propTypes = {
  artwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string.isRequired,
  artistDisplay: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

// TODO: Unify this selector across artwork types
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
    lotLabel: artwork.lot_label,
    artistDisplay,
    title: artwork.artwork.title
  }
}

export default connect(
  mapStateToProps
)(GridArtwork)

export const test = { GridArtwork }
