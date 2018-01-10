import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'

function BuyNowRailItem (props) {
  const b = block('auction-BuyNowRailItem')

  return (
    <div className={b()}>
      RailItem
    </div>
  )
}

const mapStateToProps = (state) => ({
  state
})

export default connect(
  mapStateToProps
)(BuyNowRailItem)
