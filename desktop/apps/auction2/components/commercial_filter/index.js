import AuctionArtworks from '../auction_artworks'
import Header from '../header'
import React from 'react';
import Sidebar from '../sidebar'

export default function CommercialFilter() {
  return (
    <div className='auction2-commercial-filter'>
      <div className='auction2-commercial-filter__left cf-sidebar'>
        <Sidebar />
      </div>
      <div className='auction2-commercial-filter__right cf-right'>
        <Header />
        <AuctionArtworks />
      </div>
    </div>
  )
}
