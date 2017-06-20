import Banner from './banner.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import PropTypes from 'prop-types'
import React from 'react'

export default function Index (props) {
  const { articles, auction } = props
  const showFooter = (articles && articles.length) || auction.get('eligible_sale_artworks_count') === 0

  return (
    <div className='auction-page'>
      <Banner {...props} />

      <div className='main-layout-container responsive-layout-container'>
        <Header {...props} />

        {/*
          Client-side mount points.
        */}

        <div
          id='associated-sale'
        />
        <div
          id='my-active-bids'
        />
        <div
          id='cf-artworks'
        />

        {showFooter &&
          <Footer /> }
      </div>
    </div>
  )
}

Index.propTypes = {
  articles: PropTypes.array,
  auction: PropTypes.object.isRequired
}
