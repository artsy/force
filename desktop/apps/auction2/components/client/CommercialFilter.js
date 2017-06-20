import AuctionArtworks from './AuctionArtworks'
import Header from './Header'
import React from 'react'
import Sidebar from './Sidebar'

export default function CommercialFilter () {
  return (
    <div className='auction-commercial-filter'>
      <div className='auction-commercial-filter__left cf-sidebar'>
        <Sidebar />
      </div>
      <div className='auction-commercial-filter__right cf-right'>
        <Header />
        <AuctionArtworks />
      </div>
    </div>
  )
}
