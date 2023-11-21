import { DateTime } from "luxon"

export const daysSinceDate = (time: string | DateTime): number => {
  const date = typeof time === "string" ? DateTime.fromISO(time) : time
  return Math.floor(Math.abs(date.diffNow("days").toObject().days as number))
}

export const fromToday = (time: string | DateTime) => {
  if (!time) {
    return false
  }

  const date = typeof time === "string" ? DateTime.fromISO(time) : time
  return daysSinceDate(date) === 0
}

export const exactDate = (time: string) => {
  if (!time) {
    return null
  }

  const date = DateTime.fromISO(time)
  const daysSince = daysSinceDate(date)

  if (daysSince === 0) {
    return `Today ${date.toFormat("t")}`
  } else if (daysSince === 1) {
    return `Yesterday ${date.toFormat("t")}`
  } else if (daysSince < 7) {
    return date.toFormat("cccc t")
  } else {
    return date.toFormat("ccc, LLL d, yyyy t")
  }
}

export const minutesSinceDate = (time: string | DateTime): number => {
  const date = typeof time === "string" ? DateTime.fromISO(time) : time
  return Math.floor(Math.abs(date.diffNow("minutes").minutes))
}

export const relativeDate = (time: string) => {
  if (!time) return null

  const date = DateTime.fromISO(time)
  const minutesSince = minutesSinceDate(date)

  if (minutesSince <= 1) {
    return "Just now"
  } else if (minutesSince <= 300) {
    return date.toRelative()
  } else if (minutesSince <= 1440) {
    return date.toFormat("t")
  } else if (minutesSince <= 10080) {
    return date.toRelative()
  } else if (minutesSince <= 40320) {
    const numberOfWeeksAgo = Math.floor(Math.abs(minutesSince / 10080))

    const formattedDate =
      numberOfWeeksAgo == 1
        ? `${numberOfWeeksAgo} week ago`
        : `${numberOfWeeksAgo} weeks ago`

    return formattedDate
  } else {
    return date.toFormat("D")
  }
}
