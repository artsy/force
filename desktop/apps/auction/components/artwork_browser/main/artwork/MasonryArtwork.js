import PropTypes from 'prop-types'
import React from 'react'
import BidStatus from './BidStatus'
import block from 'bem-cn'
import get from 'lodash.get'
import titleAndYear from 'desktop/apps/auction/utils/titleAndYear'
import { connect } from 'react-redux'

function MasonryArtwork (props) {
  const {
    saleArtwork,
    artistDisplay,
    date,
    image,
    isClosed,
    lotLabel,
    title
  } = props

  const b = block('auction2-page-MasonryArtwork')

  return (
    <a href={`/artwork/${saleArtwork.id}`} className={b()}>
      <div>
        <img className={b('image')} src={image} alt={title} />
      </div>

      <div className={b('lot-number')}>
        Lot {lotLabel}
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

      { !isClosed &&
        <div className={b('bid-status')}>
          <BidStatus
            artworkItem={saleArtwork}
          />
        </div> }
    </a>
  )
}

MasonryArtwork.propTypes = {
  saleArtwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string.isRequired,
  artistDisplay: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
  const { saleArtwork } = props
  const image = get(saleArtwork, 'artwork.images.0.image_medium', '/images/missing_image.png')
  const { artists } = saleArtwork.artwork
  const artistDisplay = artists && artists.length > 0
    ? artists.map((aa) => aa.name).join(', ')
    : ''

  return {
    date: saleArtwork.artwork.date,
    image,
    isClosed: state.app.auction.isClosed(),
    lotLabel: saleArtwork.lot_label,
    artistDisplay,
    title: saleArtwork.artwork.title
  }
}

export default connect(
  mapStateToProps
)(MasonryArtwork)

export const test = { MasonryArtwork }
