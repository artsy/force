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
    me,
    user
  } = props

  const {
    id,
    associated_sale,
    eligible_sale_artworks_count,
    is_open,
    is_live_open
  } = auction.toJSON()

  const hasSaleArtworks = eligible_sale_artworks_count > 0
  const showFooter = articles.length || !hasSaleArtworks
  const showMyActiveBids = me && me.bidders.length && is_open && !is_live_open

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

        { showMyActiveBids &&
          <MyActiveBids
            bidderPositions={me.lot_standings}
            saleId={id}
            user={user}
          />
        }

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
  articles: PropTypes.object,
  auction: PropTypes.object.isRequired,
  displayFollowedArtistsRail: PropTypes.bool.isRequired,
  me: PropTypes.object,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  displayFollowedArtistsRail: state.auctionArtworks.displayFollowedArtistsRail
})

export default connect(
  mapStateToProps
)(Layout)
