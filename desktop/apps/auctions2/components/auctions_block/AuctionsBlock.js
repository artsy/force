import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

function liveDate(auction) {
  if (moment(auction.registration_ends_at) > moment()) {
    return formattedDate(auction.registration_ends_at, false, true)
  } else if (moment(auction.live_start_at) > moment()) {
    return formattedDate(auction.live_start_at)
  } else if (moment(auction.end_at) > moment()) {
    return 'In Progress'
  }
}

function timedDate(auction) {
  if (moment(auction.start_at) > moment()) {
    return formattedDate(auction.start_at)
  } else {
    return formattedDate(auction.end_at, true)
  }
}

function formattedDate(date, isStarted, isRegister) {
  if (isStarted) {
    return moment(date).fromNow().replace('in ', '') + ' left'
  } else if (isRegister) {
    if (moment().diff(moment(date), 'hours') > -24) {
      return 'Register by ' + moment(date).format('ha')
    } else {
      return 'Register by ' + moment(date).format('MMM D, ha')
    }
  } else {
    return  'Live ' + moment(date).fromNow()
  }
}

function AuctionsItem(auction, live, key) {
  const color = '#666' // TODO - AVG COLOR
  return (
    <a
      key={live ? 'live-' + key : 'timed-' + key}
      href={auction.id}
      className='auctions-block__item'
      style={{backgroundColor: color}}>
      <div className='auctions-block__item-header'>
        {live ? <div className='live' style={{color: color}}>Live</div> : false}
        {auction.name}
      </div>
      <div className='auctions-block__item-body'>
        {auction.cover_image ? <img src={auction.cover_image.cropped.url} /> : false}
        <div className='date'>
          {live ? liveDate(auction) : timedDate(auction)}
        </div>
      </div>
    </a>
  )
}

function AuctionsBlock({auctions, live, isFetchingAuctions}) {
  if (isFetchingAuctions) {
    return <div className='auctions-block loading'></div>
  } else {
    return (
      <div className='auctions-block'>
        <div className='auctions-block__title'>
          {live ? 'Ongoing Live Auctions'  : 'Ongoing Timed Auctions'}
        </div>
        <div className='auctions-block__list'>
          {auctions.map((auction, key) => (
            AuctionsItem(auction, live, key)
          ))}
        </div>
      </div>
    )
  }
}

export default AuctionsBlock

AuctionsBlock.propTypes = {
  auctions: PropTypes.array.isRequired,
  live: PropTypes.bool,
  isFetchingAuctions: PropTypes.bool
}
