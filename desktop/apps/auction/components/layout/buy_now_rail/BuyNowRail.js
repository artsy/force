import BuyNowRailItem from './BuyNowRailItem'
import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'

function BuyNowRail (props) {
  const b = block('auction-BuyNowRail')

  console.log(props.promoted_sale)

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
  promoted_sale: state.app.auction.toJSON().promoted_sale
})

export default connect(
  mapStateToProps
)(BuyNowRail)
