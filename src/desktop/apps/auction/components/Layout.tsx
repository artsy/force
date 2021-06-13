import ArtworksByFollowedArtists from "desktop/apps/auction/components/artwork_browser/ArtworksByFollowedArtists"
import PromotedSaleArtworks from "desktop/apps/auction/components/artwork_browser/PromotedSaleArtworks"
import _ArtworkBrowser from "desktop/apps/auction/components/artwork_browser/ArtworkBrowser"
import AuctionBlock from "desktop/components/react/auction_block/auction_block"
import AuctionInfoContainer from "desktop/apps/auction/components/layout/auction_info"
import _Banner from "desktop/apps/auction/components/layout/Banner"
import Footer from "desktop/apps/auction/components/layout/Footer"
import { ConfirmRegistrationModal } from "desktop/apps/auction/components/layout/ConfirmRegistrationModal"
import { RegistrationModal } from "desktop/apps/auction/components/layout/RegistrationModal"
import MyActiveBids from "desktop/apps/auction/components/layout/active_bids/MyActiveBids"
import PropTypes from "prop-types"
import React from "react"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { showModal } from "../actions/app"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"

// FIXME: Rewire
let Banner = _Banner
let ArtworkBrowser = _ArtworkBrowser

function Layout(props) {
  const {
    associatedSale,
    auction,
    showAssociatedAuctions,
    showFilter,
    showInfoWindow,
    showMyActiveBids,
    showFooter,
    me,
    modalType,
    dispatch,
  } = props

  const b = block("auction-Layout")

  let Modal
  switch (modalType) {
    case "RegistrationFlow":
      Modal = RegistrationModal
      break
    case "ConfirmBidAndRegistration":
    case "ConfirmRegistration":
      Modal = ConfirmRegistrationModal
      break
  }

  function renderZendeskScript() {
    if (typeof window !== "undefined" && window.zEmbed) return

    return <ZendeskWrapper />
  }

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: auction.get("_id"),
        contextPageOwnerSlug: auction.id,
        contextPageOwnerType: OwnerType.sale,
      }}
    >
      <div className={b()}>
        {Modal && (
          <Modal
            auction={auction}
            me={me}
            onClose={() => {
              dispatch(showModal(null))
            }}
          />
        )}
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
      {renderZendeskScript()}
    </AnalyticsContext.Provider>
  )
}

Layout.propTypes = {
  associatedSale: PropTypes.object,
  me: PropTypes.object,
  showAssociatedAuctions: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool.isRequired,
  showInfoWindow: PropTypes.bool.isRequired,
  showMyActiveBids: PropTypes.bool.isRequired,
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
      modalType,
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
    auction,
    isMobile,
    me,
    modalType,
    showAssociatedAuctions,
    showFilter,
    showFollowedArtistsRail,
    showFooter,
    showInfoWindow,
    showMyActiveBids,
  }
}

export default connect(mapStateToProps)(Layout)
