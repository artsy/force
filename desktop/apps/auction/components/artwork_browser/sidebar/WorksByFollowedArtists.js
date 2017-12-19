import GridArtwork from 'desktop/apps/auction/components/artwork_browser/main/artwork/GridArtwork'
import ChevronLeft from '../../../../../components/main_layout/public/icons/chevron-left.svg'
import ChevronRight from '../../../../../components/main_layout/public/icons/chevron-right.svg'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
  nextPageOfFollowedArtistArtworks,
  previousPageOfFollowedArtistArtworks
} from 'desktop/apps/auction/actions/artworkBrowser'

function WorksByFollowedArtists (props) {
  const {
    followedArtistRailPage,
    isOnlyFollowedArtistsPage,
    displayedSaleArtworks,
    previousPageOfFollowedArtistArtworksAction,
    nextPageOfFollowedArtistArtworksAction
  } = props

  const b = block('auction-WorksByFollowedArtists')

  const leftPageClasses = classNames(
    String(b('page-left')),
    { disabled: followedArtistRailPage === 1 }
  )

  const rightPageClasses = classNames(
    String(b('page-right')),
    { disabled: isOnlyFollowedArtistsPage }
  )

  return (
    <div className={b()}>
      <div className={b('title')}>
        Works By Artists You Follow
      </div>
      <div className={b('content')}>
        <div
          className={leftPageClasses}
          onClick={() => { previousPageOfFollowedArtistArtworksAction() }}
        >
          <ChevronLeft />
        </div>
        <div className={b('artworks')}>
          {
            displayedSaleArtworks.map((saleArtwork, key) => {
              return (
                <GridArtwork
                  saleArtwork={saleArtwork}
                  key={key}
                />
              )
            })
          }
        </div>
        <div
          className={rightPageClasses}
          onClick={() => nextPageOfFollowedArtistArtworksAction()}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  )
}

WorksByFollowedArtists.propTypes = {
  followedArtistRailPage: PropTypes.number.isRequired,
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
