import ArtworkDisplay from './display/ArtworkDisplay'
import Header from './header/Header'
import React from 'react'
import Sidebar from './sidebar/Sidebar'

export default function ArtworkBrowser () {
  return (
    <div className='auction2-commercial-filter'>
      <div className='auction2-commercial-filter__left cf-sidebar'>
        <Sidebar />
      </div>
      <div className='auction2-commercial-filter__right cf-right'>
        <Header />
        <ArtworkDisplay />
      </div>
    </div>
  )
}
