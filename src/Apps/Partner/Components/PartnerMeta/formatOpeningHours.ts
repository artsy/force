/**
 * The general opening hours for a business. Opening hours can be specified as a weekly time range, starting with days, then times per day. Multiple days can be listed with commas ',' separating each day. Day or time ranges are specified using a hyphen '-'.
 * - Days are specified using the following two-letter combinations: `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`.
 * - Times are specified using 24:00 format. For example, 3pm is specified as `15:00`, 10am as `10:00`.
 * - Here is an example: `<time itemprop="openingHours" datetime="Tu,Th 16:00-20:00">Tuesdays and Thursdays 4-8pm</time>`.
 * - If a business is open 7 days a week, then it can be specified as `<time itemprop="openingHours" datetime="Mo-Su">Monday through Sunday, all day</time>`.
 *
 * Example input:
 * [{
 *   "hours": "Closed",
 *   "days": "Monday, Sunday"
 * },
 * {
 *   "hours": "10am–1pm, 2pm–6pm",
 *   "days": "Tuesday–Saturday"
 * }]
 */

// Day name mappings for schema.org format
const DAY_MAP: Record<string, string> = {
  monday: "Mo",
  tuesday: "Tu",
  wednesday: "We",
  thursday: "Th",
  friday: "Fr",
  saturday: "Sa",
  sunday: "Su",
} as const

// Time parsing regex pattern
const TIME_PATTERN = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i
const DAY_RANGE_PATTERN = /(\w+)[-–](\w+)/
const TIME_RANGE_PATTERN = /(.+?)[-–](.+)/

const isClosed = (hours: string): boolean =>
  hours.toLowerCase().includes("closed")

const convertTime = (timeStr: string): string => {
  const timeMatch = timeStr.match(TIME_PATTERN)

  if (!timeMatch) return timeStr

  const [, hours, minutes = "00", period] = timeMatch
  let hour24 = Number.parseInt(hours, 10)

  if (period.toLowerCase() === "pm" && hour24 !== 12) {
    hour24 += 12
  } else if (period.toLowerCase() === "am" && hour24 === 12) {
    hour24 = 0
  }

  return `${hour24.toString().padStart(2, "0")}:${minutes}`
}

const formatDayRange = (startDay: string, endDay: string): string => {
  const startCode = DAY_MAP[startDay.toLowerCase()]
  const endCode = DAY_MAP[endDay.toLowerCase()]

  return startCode && endCode ? `${startCode}-${endCode}` : ""
}

const formatIndividualDays = (daysStr: string): string => {
  const daysList = daysStr.split(",").map(day => day.trim())
  const dayCodes = daysList
    .map(day => DAY_MAP[day.toLowerCase()])
    .filter(Boolean)

  return dayCodes.join(",")
}

const formatDays = (daysStr: string): string => {
  const rangeMatch = daysStr.match(DAY_RANGE_PATTERN)

  return rangeMatch
    ? formatDayRange(rangeMatch[1], rangeMatch[2])
    : formatIndividualDays(daysStr)
}

const formatTimeRange = (range: string): string => {
  const rangeMatch = range.match(TIME_RANGE_PATTERN)

  if (!rangeMatch) return convertTime(range)

  const [, startTime, endTime] = rangeMatch
  const start24 = convertTime(startTime.trim())
  const end24 = convertTime(endTime.trim())

  return `${start24}-${end24}`
}

const formatTimeRanges = (hoursStr: string): string =>
  hoursStr
    .split(",")
    .map(range => range.trim())
    .map(formatTimeRange)
    .join(",")

const processSchedule = ({
  days,
  hours,
}: {
  days: string
  hours: string
}): string => {
  if (isClosed(hours)) return ""

  const formattedDays = formatDays(days)
  const formattedTimes = formatTimeRanges(hours)

  return `${formattedDays} ${formattedTimes}`
}

export const formatOpeningHours = (
  schedules: Array<{ days: string; hours: string }>
): string => schedules.map(processSchedule).filter(Boolean).join(" ")
