import classNames from 'classnames'
import { default as React, PropTypes } from 'react';
import ArtistFilterContainer from '../artist_filter/index'
import MediumFilterContainer from '../medium_filter/index'
import RangeSliderContainer from '../range_slider/index'

export default function Sidebar() {
  return (
    <div className={'auction2-artworks-sidebar'}>
      <div className={'auction2-artworks-sidebar__artist-filter'}>
        <RangeSliderContainer />
        <MediumFilterContainer />
        <ArtistFilterContainer />
      </div>
    </div>
  )
}
