export interface Time {
  days: string
  hours: string
  minutes: string
  seconds: string
}

interface TimerInfo {
  copy: string
  color: string
}

// If `extendedBiddingEndAt` is passed in and non-null, the `time`
// parameter refers to the time left in the extended period.
export const getSaleOrLotTimerInfo = (
  time: Time,
  options: {
    hasStarted?: boolean
    lotsAreClosing?: boolean
    isSaleInfo?: boolean
    urgencyIntervalMinutes?: number | null
    extendedBiddingEndAt?: string | null
  }
): TimerInfo => {
  const { days, hours, minutes, seconds } = time
  const {
    hasStarted,
    lotsAreClosing,
    isSaleInfo,
    urgencyIntervalMinutes,
    extendedBiddingEndAt,
  } = options

  const parsedDays = parseInt(days, 10)
  const parsedHours = parseInt(hours, 10)
  const parsedMinutes = parseInt(minutes, 10)
  const parsedSeconds = parseInt(seconds, 10)

  let copy = ""
  let color = "blue100"

  // Sale has not yet started
  if (!hasStarted) {
    if (parsedDays < 1) {
      // Entered extended bidding
      if (parsedHours >= 1) {
        copy = `${parsedHours}h ${parsedMinutes}m Until Bidding Starts`
      } else {
        copy = `${parsedMinutes}m ${parsedSeconds}s Until Bidding Starts`
      }
    } else {
      copy = `${parsedDays} Day${
        parsedDays > 1 ? "s" : ""
      } Until Bidding Starts`
    }
    // Sale has started
  } else if (extendedBiddingEndAt) {
    copy = `Extended: ${parsedMinutes}m ${parsedSeconds}s`
    color = "red100"
  } else {
    // When the timer is on the sale:
    if (isSaleInfo) {
      if (lotsAreClosing) {
        copy = "Lots are closing"
        color = "red100"
        // More than 24 hours until close
      } else if (parsedDays >= 1) {
        copy = `${parsedDays + 1} Day${
          parsedDays >= 1 ? "s" : ""
        } Until Lots Start Closing`
      }
      // 1-24 hours until close
      else if (parsedDays < 1 && parsedHours >= 1) {
        copy = `${parsedHours}h ${parsedMinutes}m Until Lots Start Closing`
        color = "red100"
      }

      // <60 mins until close
      else if (parsedDays < 1 && parsedHours < 1) {
        copy = `${parsedMinutes}m ${parsedSeconds}s Until Lots Start Closing`
        color = "red100"
      }

      // When the timer is on the lot:
    } else {
      // More than 24 hours until close
      if (parsedDays >= 1) {
        copy = `in ${parsedDays}d ${parsedHours}h`
      }

      // 1-24 hours until close
      else if (parsedDays < 1 && parsedHours >= 1) {
        copy = `in ${parsedHours}h ${parsedMinutes}m`
      }

      // <60 mins until close
      else if (parsedDays < 1 && parsedHours < 1) {
        copy = `in ${parsedMinutes}m ${parsedSeconds}s`
        // less than cascade interval until close
        if (urgencyIntervalMinutes && parsedMinutes >= urgencyIntervalMinutes) {
          color = "black100"
        } else {
          color = "red100"
        }
      }
    }
  }

  return { copy, color }
}
