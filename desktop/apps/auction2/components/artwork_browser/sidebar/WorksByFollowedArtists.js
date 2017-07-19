import GridArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/GridArtwork'
import ChevronLeft from '../../../../../components/main_layout/public/icons/chevron-left.svg'
import ChevronRight from '../../../../../components/main_layout/public/icons/chevron-right.svg'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
  nextPageOfFollowedArtistArtworks,
  previousPageOfFollowedArtistArtworks
} from 'desktop/apps/auction2/actions/artworkBrowser'

function WorksByFollowedArtists (props) {
  const {
    followedArtistRailPage,
    isOnlyFollowedArtistsPage,
    displayedSaleArtworks,
    previousPageOfFollowedArtistArtworksAction,
    nextPageOfFollowedArtistArtworksAction
  } = props

  const leftPageClasses = classNames(
    'auction2-works-by-followed-artists__page-left',
    { disabled: followedArtistRailPage === 1 }
  )

  const rightPageClasses = classNames(
    'auction2-works-by-followed-artists__page-right',
    { disabled: isOnlyFollowedArtistsPage }
  )

  return (
    <div className='auction2-works-by-followed-artists'>
      <div className='auction2-works-by-followed-artists__title'>
        Works By Artists You Follow
      </div>
      <div className='auction2-works-by-followed-artists__content'>
        <div
          className={leftPageClasses}
          onClick={() => { previousPageOfFollowedArtistArtworksAction() }}
        >
          <ChevronLeft />
        </div>
        <div className='auction2-works-by-followed-artists__artworks'>
          {
            displayedSaleArtworks.map((saleArtwork) => (
              <GridArtwork key={saleArtwork.id} saleArtwork={saleArtwork} />
            ))
          }
        </div>
        <div
          className={rightPageClasses}
          onClick={() => { nextPageOfFollowedArtistArtworksAction() }}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  )
}

WorksByFollowedArtists.propTypes = {
  followedArtistRailPage: PropTypes.string.isRequired,
  isOnlyFollowedArtistsPage: PropTypes.bool.isRequired,
  displayedSaleArtworks: PropTypes.array.isRequired,
  nextPageOfFollowedArtistArtworksAction: PropTypes.func.isRequired,
  previousPageOfFollowedArtistArtworksAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    artworkBrowser: {
      followedArtistRailPage,
      followedArtistRailSize,
      numArtistsYouFollow,
      saleArtworksByFollowedArtists
    }
  } = state

  const initialSlice = (followedArtistRailPage - 1) * followedArtistRailSize
  const displayedSaleArtworks = saleArtworksByFollowedArtists.slice(
    initialSlice,
    initialSlice + followedArtistRailSize
  )
  const isOnlyFollowedArtistsPage = numArtistsYouFollow <= followedArtistRailSize

  return {
    followedArtistRailPage,
    isOnlyFollowedArtistsPage,
    displayedSaleArtworks
  }
}

const mapDispatchToProps = {
  nextPageOfFollowedArtistArtworksAction: nextPageOfFollowedArtistArtworks,
  previousPageOfFollowedArtistArtworksAction: previousPageOfFollowedArtistArtworks
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorksByFollowedArtists)

export const test = { WorksByFollowedArtists }
