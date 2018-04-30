import PropTypes from 'prop-types'
import GridArtwork from 'desktop/apps/auction/components/artwork_browser/main/artwork/GridArtwork'
import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import React, { Fragment } from 'react'
import get from 'lodash.get'
import { Artwork } from 'reaction/Components/Artwork'
import { ArtworkRail } from '../artwork_rail/ArtworkRail'
import { connect } from 'react-redux'

function ArtworksByFollwedArtists(props) {
  const { isMobile, saleArtworksByFollowedArtists } = props
  const isRenderable =
    saleArtworksByFollowedArtists && saleArtworksByFollowedArtists.length

  if (!isRenderable) {
    return null
  }

  return (
    <Fragment>
      {isMobile ? (
        <MasonryGrid
          mask
          title="Works By Artists You Follow"
          columnCount={2}
          items={saleArtworksByFollowedArtists}
          getAspectRatio={({ artwork }) => {
            return get(artwork, 'images.0.aspect_ratio')
          }}
          getDisplayComponent={({ artwork }) => {
            return (
              <div onClick={() => (window.location = artwork.href)}>
                <Artwork artwork={artwork} useRelay={false} />
              </div>
            )
          }}
        />
      ) : (
        // Desktop
        <ArtworkRail
          title="Works By Artists You Follow"
          artworks={saleArtworksByFollowedArtists}
          getDisplayComponent={artwork => {
            return <GridArtwork saleArtwork={artwork} useRelay={false} />
          }}
          style={{
            height: 515,
          }}
        />
      )}
    </Fragment>
  )
}

ArtworksByFollwedArtists.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  saleArtworksByFollowedArtists: PropTypes.array.isRequired,
}

ArtworksByFollwedArtists.defaultProps = {
  saleArtworksByFollowedArtists: [],
}

const mapStateToProps = state => {
  const {
    app: { isMobile },
    artworkBrowser: { saleArtworksByFollowedArtists },
  } = state

  return {
    isMobile,
    saleArtworksByFollowedArtists,
  }
}

export default connect(mapStateToProps)(ArtworksByFollwedArtists)
