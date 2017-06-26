import AuctionBlock from 'desktop/components/react/auction_block/auction_block'
import Banner from 'desktop/apps/auction2/components/page/Banner'
import CommercialFilter from './filter'
import Footer from 'desktop/apps/auction2/components/page/Footer'
import Header from 'desktop/apps/auction2/components/page/Header'
import MyActiveBids from 'desktop/apps/auction2/components/page/MyActiveBids'
import PropTypes from 'prop-types'
import React from 'react'
import WorksByFollowedArtists from 'desktop/apps/auction2/components/filter/WorksByFollowedArtists'
import { connect } from 'react-redux'

function Layout (props) {
  const {
    articles,
    auction,
    displayFollowedArtistsRail,
    me
  } = props

  const {
    associated_sale,
    eligible_sale_artworks_count,
    is_open,
    is_live_open
  } = auction.toJSON()

  const hasSaleArtworks = eligible_sale_artworks_count > 0
  const showFooter = articles.length || !hasSaleArtworks
  const showMyActiveBids = me && me.bidders.length && is_open && !is_live_open

  return (
    <div className='auction2-page'>
      <Banner />

      <div className='main-layout-container responsive-layout-container'>
        <Header />

        { associated_sale &&
          <AuctionBlock
            sale={associated_sale}
            relatedAuction
          /> }

        { showMyActiveBids &&
          <MyActiveBids /> }

        { hasSaleArtworks &&
          <div className='auction2-main-page'>
            { displayFollowedArtistsRail &&
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
  articles: PropTypes.object,
  auction: PropTypes.object.isRequired,
  displayFollowedArtistsRail: PropTypes.bool.isRequired,
  me: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    articles: state.app.articles,
    auction: state.app.auction,
    displayFollowedArtistsRail: state.auctionArtworks.displayFollowedArtistsRail,
    me: state.app.me
  }
}

export default connect(
  mapStateToProps
)(Layout)
