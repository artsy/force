import ArtworksByFollowedArtists from "desktop/apps/auction/components/artwork_browser/ArtworksByFollowedArtists"
import PromotedSaleArtworks from "desktop/apps/auction/components/artwork_browser/PromotedSaleArtworks"
import _ArtworkBrowser from "desktop/apps/auction/components/artwork_browser/ArtworkBrowser"
import AuctionBlock from "desktop/components/react/auction_block/auction_block"
import AuctionInfoContainer from "desktop/apps/auction/components/layout/auction_info"
import _Banner from "desktop/apps/auction/components/layout/Banner"
import Footer from "desktop/apps/auction/components/layout/Footer"
import { ConfirmRegistrationModal } from "desktop/apps/auction/components/layout/ConfirmRegistrationModal"
import MyActiveBids from "desktop/apps/auction/components/layout/active_bids/MyActiveBids"
import PropTypes from "prop-types"
import React from "react"
import block from "bem-cn-lite"
import { connect } from "react-redux"

// FIXME: Rewire
let Banner = _Banner
let ArtworkBrowser = _ArtworkBrowser

function Layout(props) {
  const {
    associatedSale,
    showAssociatedAuctions,
    showFilter,
    showInfoWindow,
    showMyActiveBids,
    showFooter,
    modal,
  } = props

  const b = block("auction-Layout")

  return (
    <div className={b()}>
      {modal && <ConfirmRegistrationModal />}
      <Banner />
      <div className={b("container", "responsive-layout-container")}>
        <AuctionInfoContainer />

        {showAssociatedAuctions && (
          <AuctionBlock sale={associatedSale} relatedAuction />
        )}

        {showMyActiveBids && <MyActiveBids />}

        <PromotedSaleArtworks />
        <ArtworksByFollowedArtists />

        {showFilter && !showInfoWindow && (
          <div className="auction-main-page">
            <ArtworkBrowser />
          </div>
        )}

        {showFooter && <Footer />}
      </div>
    </div>
  )
}

Layout.propTypes = {
  associatedSale: PropTypes.object,
  showAssociatedAuctions: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool.isRequired,
  showInfoWindow: PropTypes.bool.isRequired,
  showMyActiveBids: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const {
    app: {
      articles,
      auction,
      me,
      isEcommerceSale,
      isMobile,
      showInfoWindow,
      modal,
    },
  } = state

  const {
    associated_sale,
    eligible_sale_artworks_count,
    is_open,
    is_live_open,
  } = auction.toJSON()

  const showAssociatedAuctions = Boolean(!isMobile && associated_sale)
  const showFilter = Boolean(eligible_sale_artworks_count > 0)
  const showFollowedArtistsRail = Boolean(
    state.artworkBrowser.showFollowedArtistsRail
  )
  const showMyActiveBids = Boolean(
    !isEcommerceSale && me && me.bidders.length && is_open && !is_live_open
  )
  const showFooter = Boolean((!isMobile && articles.length) || !showFilter)

  return {
    associatedSale: associated_sale,
    isMobile,
    modal,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showInfoWindow,
    showMyActiveBids,
    showFooter,
  }
}

export default connect(mapStateToProps)(Layout)
