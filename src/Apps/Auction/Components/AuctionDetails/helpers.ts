import { DateTime } from "luxon"
import { stripTags } from "underscore.string"
import { AddToCalendarProps } from "./AddToCalendar"

/** @returns URL to create a new Google Calendar event */
export const generateGoogleCalendarUrl = ({
  title,
  startDate,
  endDate,
  description = "",
  address = "",
  href,
  liveAuctionUrl,
}: AddToCalendarProps): string => {
  const start = formatCalendarDate(startDate)
  // If there is no endDate, set to 1 hour after start
  const end = endDate
    ? formatCalendarDate(endDate)
    : formatCalendarDate(startDate, 1)
  const liveAuctionLink = liveAuctionUrl
    ? `<p><a href='${liveAuctionUrl}'>${liveAuctionUrl}</a></p>`
    : ""
  const details = `${description}${liveAuctionLink}<p><a href='${href}'>${href}</a></p>`

  return encodeURI(
    [
      "https://www.google.com/calendar/render?action=TEMPLATE",
      `&text=${title}`,
      `&dates=${start}/${end}`,
      `&details=${details}`,
      `&location=${address}`,
    ].join("")
  )
}

/** @returns URL to download ICS formatted event for iCal and Outlook */
export const generateIcsCalendarUrl = ({
  title,
  startDate,
  endDate,
  description = "",
  address = "",
  href,
  liveAuctionUrl = "",
}: AddToCalendarProps): string => {
  const start = formatCalendarDate(startDate)
  const end = endDate
    ? formatCalendarDate(endDate)
    : formatCalendarDate(startDate, 1)
  const formattedDescription = stripTags(description || "").replace(
    /(\r\n|\n|\r)/gm,
    ""
  )

  const calendarData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DSSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, "")}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    // If two URLs are present, only the liveAuctionUrl will be rendered.
    `URL:${href}`,
    `URL:${liveAuctionUrl}`,
    `DESCRIPTION:${formattedDescription}`,
    `LOCATION:${address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n")

  return encodeURI(`data:text/calendar;charset=utf8,${calendarData}`)
}

/** @returns dates to be consumed by external calendar services iCal & Google Calendar */
const formatCalendarDate = (date, offsetHours = 0) => {
  // Strip punctuation: 2020-11-12T20:00:00.000Z => 20201113T200000Z
  return formatIsoDateNoZoneOffset(date, offsetHours).replace(/-|:|\.\d+/g, "")
}

/**
 * Sometimes an ISO date includes a time-zone offset, indicating difference
 * in hours from GMT. This helper removes the offset, and changes hours to
 * include the offset in time calculation.
 * 2020-11-12T16:00:00+4:00 => 2020-11-12T12:00:00.000Z
 *
 * @param date ISO string
 * @param offsetHours optional number of hours to offset time by
 */
export const formatIsoDateNoZoneOffset = (
  date: string,
  offsetHours: number = 0
) => {
  const dateWithZoneCorrection = DateTime.fromISO(date, {
    zone: "America/New_York",
  }).toUTC()

  return dateWithZoneCorrection
    .plus({
      hours: offsetHours,
    })
    .toISO()
}
