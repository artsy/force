import AuctionBlock from 'desktop/components/react/auction_block/auction_block'
import Banner from 'desktop/apps/auction2/components/page/Banner'
import CommercialFilter from './filter'
import Footer from 'desktop/apps/auction2/components/page/Footer'
import AuctionInfoContainer from 'desktop/apps/auction2/components/page/auction_info'
import MyActiveBids from 'desktop/apps/auction2/components/page/MyActiveBids'
import PropTypes from 'prop-types'
import React from 'react'
import WorksByFollowedArtists from 'desktop/apps/auction2/components/filter/WorksByFollowedArtists'
import { connect } from 'react-redux'

function Layout (props) {
  const {
    associatedSale,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
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

        { showFilter &&
          <div className='auction2-main-page'>
            { showFollowedArtistsRail &&
              <WorksByFollowedArtists /> }
            <CommercialFilter />
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
  showMyActiveBids: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { articles, auction, me } = state.app

  const {
    associated_sale,
    eligible_sale_artworks_count,
    is_open,
    is_live_open
  } = auction.toJSON()

  const showAssociatedAuctions = Boolean(associated_sale)
  const showFilter = Boolean(eligible_sale_artworks_count > 0)
  const showFollowedArtistsRail = Boolean(state.auctionArtworks.showFollowedArtistsRail)
  const showMyActiveBids = Boolean(me && me.bidders.length && is_open && !is_live_open)
  const showFooter = Boolean(articles.length || !showFilter)

  return {
    associatedSale: associated_sale,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showMyActiveBids,
    showFooter
  }
}

export default connect(
  mapStateToProps
)(Layout)
