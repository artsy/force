import React from 'react'
import moment from 'moment'

function liveDate(auction) {
  let date
  if (moment(auction.registration_ends_at) > moment()) {
    date = 'Register by ...'
  } else if (moment(auction.live_start_at) > moment()) {
    date = 'Not started'
  } else if (moment(auction.end_at) > moment()) {
    date = 'In Progress'
  }
  return <div className='date'>{date}</div>
}

function timedDate(auction) {
  let date
  if (moment(auction.start_at) > moment()) {
    date = dateDiff(auction.start_at)
  } else {
    date = dateDiff(auction.end_at, true)
  }
  return <div className='date'>{date}</div>
}

function dateDiff(date, isStarted) {
    let formattedDate
    let after
    const dif = moment().diff(moment(date), 'days')
    if (dif < -3) {
      formattedDate = moment(date).format('MMM D, ha')
    } else if (dif > 0) {
      formattedDate = moment(date).fromNow().replace('in ', '')
    } else {
      const dif = moment().diff(moment(date), 'hours')
      formattedDate = moment(date).fromNow().replace('in ', '')
    }
    return formattedDate + after
}

function AuctionsBlock (props) {
  return (
    <div className='auctions-block'>
      <div className='auctions-block__title'>{props.title}</div>
      <div className='auctions-block__items'>
        { props.auctions.map((auction, key) => (
          <a
            key={key}
            href={auction.id}
            className='auctions-block__item'>
            <div className='auctions-block__item-header'>
              <div>
                {auction.profile ? <strong>auction.profile.name</strong> : false}
                {props.live ? <div className='live'>Live</div>  : false}
              </div>
              {auction.name}
            </div>
            <div className='auctions-block__item-body'>
              <img src={auction.cover_image.cropped.url} />
              {props.live ? liveDate(auction) : timedDate(auction)}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default AuctionsBlock

