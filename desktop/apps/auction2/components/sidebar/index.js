import { updateArtistsYouFollowParam } from '../../actions'
import ArtistFilter from '../artist_filter'
import BasicCheckbox from '../basic_checkbox'
import MediumFilter from '../medium_filter'
import RangeSlider from '../range_slider'
import { default as React, PropTypes } from 'react'
import { connect } from 'react-redux'

function Sidebar(props) {
  const {
    filterParams,
    numArtistsYouFollow,
    updateArtistsYouFollowParamAction,
    user
  } = props

  const artistsYouFollow = {
    id: 'artists-you-follow',
    count: numArtistsYouFollow,
    name: 'Artists You Follow'
  }

  return (
    <div className='auction2-artworks-sidebar'>
      <div className='auction2-artworks-sidebar__artist-filter'>
        <RangeSlider />
        <MediumFilter />
        {
          user &&
          <div className='auction2-artworks-sidebar__artists-you-follow'>
            <BasicCheckbox
              key={artistsYouFollow.id}
              item={artistsYouFollow}
              onClick={updateArtistsYouFollowParamAction}
              checked={filterParams.include_artworks_by_followed_artists}
            />
          </div>
        }
        <ArtistFilter />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filterParams: state.auctionArtworks.filterParams,
    numArtistsYouFollow: state.auctionArtworks.numArtistsYouFollow,
    user: state.auctionArtworks.user
  }
}

const mapDispatchToProps = {
  updateArtistsYouFollowParamAction: updateArtistsYouFollowParam
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
