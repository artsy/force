import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import AuctionsBlock from 'desktop/apps/auctions2/components/auctions_block/AuctionsBlock'
import { filter, reject } from 'underscore'

function Layout ({ isMobile, auctions }) {
  const liveAuctions = filter(auctions, function(auction){ return auction.live_start_at ? true : false });
  const onlineAuctions = reject(auctions, function(auction){ return auction.live_start_at ? true : false });
  return (
    <div>
      {isMobile
        ? <div>
            Hello Mobile!
          </div>
        : <div>
            Hello Desktop!
          {liveAuctions.length ?
            <AuctionsBlock
              auctions={liveAuctions}
              live={true} />
          : false }
          {onlineAuctions.length ?
            <AuctionsBlock
              auctions={onlineAuctions} />
          : false }
          </div> }
    </div>
  )
}

Layout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  auctions: PropTypes.array
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile,
  auctions: state.app.auctions
})

export default connect(
  mapStateToProps
)(Layout)
