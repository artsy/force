import moment from 'moment'
import { include } from 'underscore'

function isPreviewState (status) {
  return include(['preview'], status)
}

function zone (time) {
  return moment(time).tz('America/New_York')
}

export default function upcomingLabel (startAt, endAt, liveStartAt, isLiveOpen, status) {
  const timeFormat = 'MMM D, h:mm A z'

  if (liveStartAt && !isLiveOpen) {
    return `opens for live bidding ${zone(liveStartAt).format(timeFormat)}`
  } else if (liveStartAt) {
    return 'open for live bidding'
  } else if (isPreviewState(status)) {
    return `opens ${zone(startAt).format(timeFormat)}`
  } else {
    return `closes ${zone(endAt).format(timeFormat)}`
  }
}
