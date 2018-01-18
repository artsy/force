import BuyNowRailItem from './BuyNowRailItem'
import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'
import { Artwork } from '@artsy/reaction-force/dist/Components/Artwork'

function BuyNowRail (props) {
  const b = block('auction-BuyNowRail')

  console.log(props.promoted_sale)

  return (
    <div className={b()}>
      <h2 style={{display: 'none'}}>
        Buy Now
      </h2>

      {props.promoted_sale.sale_artworks.map(artwork => {
        return (
          <div style={{
            width: 300,
            height: 300,
            marginBottom: 100
          }}>
            <Artwork artwork={artwork.artwork} />
          </div>

        )
      })}
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
