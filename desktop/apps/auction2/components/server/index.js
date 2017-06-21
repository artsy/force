import AuctionPage from 'desktop/apps/auction2/components/client/AuctionPage'
import AuctionBlock from 'desktop/components/react/auction_block/auction_block'
import Banner from 'desktop/apps/auction2/components/server/Banner'
import Header from 'desktop/apps/auction2/components/server/Header'
import Footer from 'desktop/apps/auction2/components/server/Footer'
import PropTypes from 'prop-types'
import React from 'react'

export default function Index (props) {
  const {
    articles,
    auction
  } = props

  const {
    associated_sale,
    eligible_sale_artworks_count
  } = auction.toJSON()

  const hasSaleArtworks = eligible_sale_artworks_count > 0
  const showFooter = articles.length || !hasSaleArtworks

  return (
    <div className='auction-page'>
      <Banner {...props} />

      <div className='main-layout-container responsive-layout-container'>
        <Header {...props} />

        { associated_sale &&
          <AuctionBlock
            sale={associated_sale}
            relatedAuction
          /> }

        {/*
          TODO: Refactor Backbone / Jade view into component
        */}

        <div id='my-active-bids' />

        { hasSaleArtworks &&
          <AuctionPage /> }

        {showFooter &&
          <Footer {...props} /> }
      </div>
    </div>
  )
}

Index.propTypes = {
  articles: PropTypes.array,
  auction: PropTypes.object.isRequired
}
