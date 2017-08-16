import AuctionsBlock from 'desktop/apps/auctions2/components/auctions_block/AuctionsBlock'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function Layout ({ isMobile, auctions }) {
  return (
    <div>
      {isMobile
        ? <div>
            Hello Mobile!
          </div>
        : <div>
          {auctions.liveIntegration.length &&
            <AuctionsBlock
              key='auctions-block-liveIntegration'
              auctions={auctions.liveIntegration}
              liveIntegration={true} /> }
          {auctions.timed.length &&
            <AuctionsBlock
              key='auctions-block-timed'
              auctions={auctions.timed} /> }
          </div> }
    </div>
  )
}

Layout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  auctions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile,
  auctions: state.app.auctions
})

export default connect(
  mapStateToProps
)(Layout)
