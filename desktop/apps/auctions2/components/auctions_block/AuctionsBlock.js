import React from 'react'
import moment from 'moment'

function liveDate(auction) {
  let date
  if (moment(auction.registration_ends_at) > moment()) {
    date = formattedDate(auction.registration_ends_at, false, true)
  } else if (moment(auction.live_start_at) > moment()) {
    date = formattedDate(auction.live_start_at)
  } else if (moment(auction.end_at) > moment()) {
    date = 'In Progress'
  }
  return date
}

function timedDate(auction) {
  let date
  if (moment(auction.start_at) > moment()) {
    date = formattedDate(auction.start_at)
  } else {
    date = formattedDate(auction.end_at, true)
  }
  return date
}

function formattedDate(date, isStarted, isRegister) {
    let formattedDate
    if (isStarted) {
      formattedDate = moment(date).fromNow().replace('in ', '') + ' left'
    } else if (isRegister) {
      if (moment().diff(moment(date), 'hours') > -24) {
        formattedDate = 'Register by ' + moment(date).format('ha')
      } else {
        formattedDate = 'Register by ' + moment(date).format('MMM D, ha')
      }
    } else {
      formattedDate = 'Live ' + moment(date).fromNow()
    }
    return formattedDate
}

function AuctionsBlock (props) {
  return (
    <div className='auctions-block'>
      <div className='auctions-block__title'>
        {props.live ? 'Ongoing Live Auctions'  : 'Ongoing Timed Auctions'}
      </div>
      <div className='auctions-block__items'>
        { props.auctions.map((auction, key) => (
          <a
            key={key}
            href={auction.id}
            className='auctions-block__item'>
            <div className='auctions-block__item-header'>
              {props.live ? <div className='live'>Live</div>  : false}
              {auction.name}
            </div>
            <div className='auctions-block__item-body'>
              <img src={auction.cover_image ? auction.cover_image.cropped.url : false} />
              <div className='date'>
                {props.live ? liveDate(auction) : timedDate(auction)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default AuctionsBlock

