import moment from 'moment'

function zone (time) {
  return moment(time).tz('America/New_York')
}

export default function upcomingLabel (startAt, endAt, liveStartAt, isLiveOpen, isPreview) {
  const timeFormat = 'MMM D, h:mm A z'

  if (liveStartAt && !isLiveOpen) {
    return `opens for live bidding ${zone(liveStartAt).format(timeFormat)}`
  } else if (liveStartAt) {
    return 'open for live bidding'
  } else if (isPreview) {
    return `opens ${zone(startAt).format(timeFormat)}`
  } else {
    return `closes ${zone(endAt).format(timeFormat)}`
  }
}
