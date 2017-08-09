import AuctionBlock from 'desktop/components/react/auction_block/auction_block'
import Banner from 'desktop/apps/auction2/components/layout/Banner'
import ArtworkBrowser from 'desktop/apps/auction2/components/artwork_browser/ArtworkBrowser'
import Footer from 'desktop/apps/auction2/components/layout/Footer'
import AuctionInfoContainer from 'desktop/apps/auction2/components/layout/auction_info'
import MyActiveBids from 'desktop/apps/auction2/components/layout/active_bids/MyActiveBids'
import PropTypes from 'prop-types'
import React from 'react'
import WorksByFollowedArtists from 'desktop/apps/auction2/components/artwork_browser/sidebar/WorksByFollowedArtists'
import { connect } from 'react-redux'

function Layout (props) {
  const {
    associatedSale,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showInfoWindow,
    showMyActiveBids,
    showFooter
  } = props

  return (
    <div className='auction2-page'>
      <Banner />

      <div className='main-layout-container responsive-layout-container'>
        <AuctionInfoContainer />

        { showAssociatedAuctions &&
          <AuctionBlock
            sale={associatedSale}
            relatedAuction
          /> }

        { showMyActiveBids &&
          <MyActiveBids /> }

        { showFollowedArtistsRail &&
          <WorksByFollowedArtists /> }

        { showFilter && !showInfoWindow &&
          <div className='auction2-main-page'>
            <ArtworkBrowser />
          </div> }

        {showFooter &&
          <Footer /> }
      </div>
    </div>
  )
}

Layout.propTypes = {
  associatedSale: PropTypes.object,
  showAssociatedAuctions: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool.isRequired,
  showFollowedArtistsRail: PropTypes.bool.isRequired,
  showInfoWindow: PropTypes.bool.isRequired,
  showMyActiveBids: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { articles, auction, me, isMobile, showInfoWindow } = state.app

  const {
    associated_sale,
    eligible_sale_artworks_count,
    is_open,
    is_live_open
  } = auction.toJSON()

  const showAssociatedAuctions = Boolean(!isMobile && associated_sale)
  const showFilter = Boolean(eligible_sale_artworks_count > 0)
  const showFollowedArtistsRail = Boolean(!isMobile && state.artworkBrowser.showFollowedArtistsRail)
  const showMyActiveBids = Boolean(me && me.bidders.length && is_open && !is_live_open)
  const showFooter = Boolean(!isMobile && articles.length || !showFilter)

  return {
    associatedSale: associated_sale,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showInfoWindow,
    showMyActiveBids,
    showFooter
  }
}

export default connect(
  mapStateToProps
)(Layout)
