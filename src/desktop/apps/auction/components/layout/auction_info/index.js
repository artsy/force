import PropTypes from "prop-types"
import _AuctionInfoDesktop from "./AuctionInfoDesktop"
import _AuctionInfoMobile from "./AuctionInfoMobile"
import { connect } from "react-redux"

// FIXME: Rewire
let AuctionInfoDesktop = _AuctionInfoDesktop
let AuctionInfoMobile = _AuctionInfoMobile

function AuctionInfoContainer({ isMobile }) {
  return isMobile ? <AuctionInfoMobile /> : <AuctionInfoDesktop />
}

AuctionInfoContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isMobile: state.app.isMobile,
})

export default connect(mapStateToProps)(AuctionInfoContainer)

export const test = { AuctionInfoContainer }
