import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

function liveDate(auction) {
  if (moment(auction.registration_ends_at) > moment()) {
    return formatDate(auction.registration_ends_at, false, true)
  } else if (moment(auction.live_start_at) > moment()) {
    return formatDate(auction.live_start_at)
  } else {
    return <div className='date'>In Progress</div>
  }
}

function timedDate(auction) {
  if (moment(auction.start_at) > moment()) {
    return formatDate(auction.start_at)
  } else {
    return formatDate(auction.end_at, true)
  }
}

function formatDate(date, isStarted, isRegister) {
  let formatted
  if (isStarted) {
    formatted = moment(date).fromNow().replace('in ', '') + ' left'
  } else if (isRegister) {
    if (moment().diff(moment(date), 'hours') > -24) {
      formatted = 'Register by ' + moment(date).format('ha')
    } else {
      formatted = 'Register by ' + moment(date).format('MMM D, ha')
    }
  } else {
    formatted = 'Live ' + moment(date).fromNow()
  }
  return <div className='date'>{formatted}</div>
}

function formatImage(auction, isMobile) {
  if (auction.cover_image) {
    if (isMobile) {
      return (
        <div
          className='auctions-block__image'
          style={{backgroundImage: 'url(' + auction.cover_image.cropped.url + ')'}}>
        </div>
      )
    } else {
      return <img src={auction.cover_image.cropped.url} />
    }
  }
}

function AuctionsItem({auction, liveIntegration, isMobile}) {
  const color = '#666' // TODO - AVG COLOR
  return (
    <a
      href={auction.id}
      className='auctions-block__item'
      style={{backgroundColor: color}}>
      {isMobile && formatImage(auction, isMobile)}
      <div className='auctions-block__item-body'>
        <div className='auctions-block__item-upper'>
          {liveIntegration && <div className='live' style={{color: color}}>Live</div>}
          {auction.name}
        </div>
        <div className='auctions-block__item-lower'>
          {!isMobile && formatImage(auction, isMobile)}
          {liveIntegration ? liveDate(auction) : timedDate(auction)}
        </div>
      </div>
    </a>
  )
}

export default AuctionsItem

AuctionsItem.propTypes = {
  auction: PropTypes.object.isRequired,
  liveIntegration: PropTypes.bool,
  isMobile: PropTypes.bool
}
