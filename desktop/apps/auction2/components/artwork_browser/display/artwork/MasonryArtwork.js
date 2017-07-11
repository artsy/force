import PropTypes from 'prop-types'
import React from 'react'
import BidStatus from './BidStatus'
import block from 'bem-cn'
import get from 'lodash.get'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'
import { connect } from 'react-redux'

const propTypes = {
  artwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string.isRequired,
  artistDisplay: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

function MasonryArtwork (props) {
  const {
    artwork,
    artistDisplay,
    date,
    image,
    isClosed,
    lotLabel,
    title
  } = props

  const b = block('auction2-page-masonry-artwork')

  return (
    <a href={`/artwork/${artwork.id}`} className={b()}>
      <div>
        <img className={b('image')} src={image} alt={title} />
      </div>

      <div className={b('lot-label')}>
        Lot {lotLabel}
      </div>

      <div className={b('artists')}>
        {artistDisplay}
      </div>

      <div
        className=''
        dangerouslySetInnerHTML={{
          __html: titleAndYear(title, date)
        }}
      />

      { !isClosed &&
        <BidStatus
          artworkItem={artwork}
        /> }
    </a>
  )
}

MasonryArtwork.propTypes = propTypes

const mapStateToProps = (state, props) => {
  const { artwork } = props
  const image = get(artwork, 'artwork.images.0.image_medium', '/images/missing_image.png')
  const { artists } = artwork.artwork
  const artistDisplay = artists && artists.length > 0
    ? artists.map((aa) => aa.name).join(', ')
    : null

  return {
    date: artwork.artwork.date,
    image,
    isClosed: state.app.auction.isClosed(),
    lotLabel: artwork.lot_label,
    artistDisplay,
    title: artwork.artwork.title
  }
}

export default connect(
  mapStateToProps
)(MasonryArtwork)
