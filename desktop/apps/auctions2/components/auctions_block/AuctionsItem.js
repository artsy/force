import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

function liveDate(auction) {
  if (moment(auction.registration_ends_at) > moment()) {
    return formattedDate(auction.registration_ends_at, false, true)
  } else if (moment(auction.live_start_at) > moment()) {
    return formattedDate(auction.live_start_at)
  } else {
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

function AuctionsItem({auction, liveIntegration, key}) {
  const color = '#666' // TODO - AVG COLOR
  return (
    <a
      key={liveIntegration ? 'live-' + key : 'timed-' + key}
      href={auction.id}
      className='auctions-block__item'
      style={{backgroundColor: color}}>
      <div className='auctions-block__item-header'>
        {liveIntegration ? <div className='live' style={{color: color}}>Live</div> : false}
        {auction.name}
      </div>
      <div className='auctions-block__item-body'>
        {auction.cover_image ? <img src={auction.cover_image.cropped.url} /> : false}
        <div className='date'>
          {liveIntegration ? liveDate(auction) : timedDate(auction)}
        </div>
      </div>
    </a>
  )
}

export default AuctionsItem

AuctionsItem.propTypes = {
  auction: PropTypes.array.isRequired,
  liveIntegration: PropTypes.bool,
  key: PropTypes.number
}
