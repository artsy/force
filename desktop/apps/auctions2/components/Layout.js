import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import AuctionsBlock from 'desktop/apps/auctions2/components/auctions_block/AuctionsBlock'

function Layout ({ isMobile, auctions }) {
  return (
    <div>
      {isMobile
        ? <div>
            Hello Mobile!
          </div>
        : <div>
          {auctions.live.length ?
            <AuctionsBlock
              key='auctions-block-live'
              auctions={auctions.live}
              live={true} />
          : false }
          {auctions.timed.length ?
            <AuctionsBlock
              key='auctions-block-timed'
              auctions={auctions.timed} />
          : false }
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
