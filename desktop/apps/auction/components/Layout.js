import ArtworkBrowser from 'desktop/apps/auction/components/artwork_browser/ArtworkBrowser'
import AuctionBlock from 'desktop/components/react/auction_block/auction_block'
import AuctionInfoContainer from 'desktop/apps/auction/components/layout/auction_info'
import Banner from 'desktop/apps/auction/components/layout/Banner'
import BuyNowRail from './layout/buy_now_rail/BuyNowRail'
import Footer from 'desktop/apps/auction/components/layout/Footer'
import MyActiveBids from 'desktop/apps/auction/components/layout/active_bids/MyActiveBids'
import PropTypes from 'prop-types'
import React from 'react'
import WorksByFollowedArtists from 'desktop/apps/auction/components/layout/followed_artists/WorksByFollowedArtists'
import { connect } from 'react-redux'
import { RelayStubProvider } from 'desktop/components/react/RelayStubProvider'

function Layout (props) {
  const {
    associatedSale,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showInfoWindow,
    showMyActiveBids,
    showFooter,
    showPromotedSale
  } = props

  return (
    <div className='auction-page'>
      <Banner />

      <div className='main-layout-container responsive-layout-container'>
        <AuctionInfoContainer />

        { showAssociatedAuctions &&
          <AuctionBlock
            sale={associatedSale}
            relatedAuction
          />
        }

        { showMyActiveBids &&
          <MyActiveBids />
        }

        { showPromotedSale &&
          <RelayStubProvider>
            <BuyNowRail />
          </RelayStubProvider>
        }

        { showFollowedArtistsRail &&
          <WorksByFollowedArtists />
        }

        { showFilter && !showInfoWindow &&
          <div className='auction-main-page'>
            <ArtworkBrowser />
          </div>
        }

        {showFooter &&
          <Footer />
        }
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
  showFooter: PropTypes.bool.isRequired,
  showPromotedSale: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { articles, auction, me, isMobile, showInfoWindow } = state.app

  const {
    associated_sale,
    eligible_sale_artworks_count,
    is_open,
    is_live_open,
    promoted_sale
  } = auction.toJSON()

  const showAssociatedAuctions = Boolean(!isMobile && associated_sale)
  const showFilter = Boolean(eligible_sale_artworks_count > 0)
  const showFollowedArtistsRail = Boolean(!isMobile && state.artworkBrowser.showFollowedArtistsRail)
  const showMyActiveBids = Boolean(me && me.bidders.length && is_open && !is_live_open)
  const showFooter = Boolean(!isMobile && articles.length || !showFilter)
  const showPromotedSale = Boolean(!isMobile && promoted_sale)

  return {
    associatedSale: associated_sale,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showInfoWindow,
    showMyActiveBids,
    showFooter,
    showPromotedSale
  }
}

export default connect(
  mapStateToProps
)(Layout)
