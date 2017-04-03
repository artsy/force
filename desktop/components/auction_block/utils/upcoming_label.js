import moment from 'moment'
import 'moment-timezone'

function zone (time) {
  return moment(time).tz('America/New_York')
}

export default function upcomingLabel (startAt, endAt, liveStartAt, isClosed, isLiveOpen, isPreview) {
  const timeFormat = 'MMM D, h:mm A z'

  if (isPreview) {
    return `Auction opens ${zone(startAt).format(timeFormat)}`
  } else if (isClosed) {
    return 'Auction closed'
  } else if (liveStartAt && !isLiveOpen) {
    return `Auction opens for live bidding ${zone(liveStartAt).format(timeFormat)}`
  } else if (liveStartAt) {
    return 'Auction open for live bidding'
  } else {
    return `Auction closes ${zone(endAt).format(timeFormat)}`
  }
}
