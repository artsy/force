import BuyNowRailItem from './BuyNowRailItem'
import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'

function BuyNowRail (props) {
  const b = block('auction-BuyNowRail')

  return (
    <div className={b()}>
      <h2>
        Buy Now
      </h2>

      <BuyNowRailItem />
    </div>
  )
}

const mapStateToProps = (state) => ({
  state
})

export default connect(
  mapStateToProps
)(BuyNowRail)
