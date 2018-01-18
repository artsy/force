import BuyNowRailItem from './BuyNowRailItem'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import get from 'lodash.get'
import { connect } from 'react-redux'
import { Artwork } from '@artsy/reaction-force/dist/Components/Artwork'

function BuyNowRail ({ sale_artworks }) {
  const b = block('auction-BuyNowRail')

  return (
    <div className={b()}>
      <h2 style={{display: 'none'}}>
        Buy Now
      </h2>

      {sale_artworks.map(artwork => {
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
    </div>
  )
}

BuyNowRail.propTypes = {
  sale_artworks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  sale_artworks: get(state.app.auction.toJSON(), 'promoted_sale.sale_artworks', [])
})

export default connect(
  mapStateToProps
)(BuyNowRail)
