import AuctionBlock from 'desktop/components/react/auction_block/auction_block'
import Banner from 'desktop/apps/auction2/components/page/Banner'
import CommercialFilter from './commercial_filter'
import Footer from 'desktop/apps/auction2/components/page/Footer'
import Header from 'desktop/apps/auction2/components/page/Header'
import PropTypes from 'prop-types'
import React from 'react'
import WorksByFollowedArtists from 'desktop/apps/auction2/components/commercial_filter/WorksByFollowedArtists'
import { connect } from 'react-redux'

function Layout (props) {
  const { articles, auction, displayFollowedArtistsRail } = props
  const { associated_sale, eligible_sale_artworks_count } = auction.toJSON()
  const hasSaleArtworks = eligible_sale_artworks_count > 0
  const showFooter = articles.length || !hasSaleArtworks

  return (
    <div className='auction-page'>
      <Banner {...props} />

      <div className='main-layout-container responsive-layout-container'>
        <Header {...props} />

        { associated_sale &&
          <AuctionBlock
            sale={associated_sale}
            relatedAuction
          /> }

        {/* TODO: Refactor Backbone / Jade view into component */}
        <div id='my-active-bids' />

        { hasSaleArtworks &&
          <div className='auction-main-page'>
            { displayFollowedArtistsRail &&
              <WorksByFollowedArtists /> }
            <CommercialFilter />
          </div> }

        {showFooter &&
          <Footer {...props} /> }
      </div>
    </div>
  )
}

Layout.propTypes = {
  articles: PropTypes.array,
  auction: PropTypes.object.isRequired,
  displayFollowedArtistsRail: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  displayFollowedArtistsRail: state.auctionArtworks.displayFollowedArtistsRail
})

export default connect(
  mapStateToProps
)(Layout)
