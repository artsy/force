import { DateTime } from "luxon"

// TODO: Get these from MP
export const deliveryOptionLabel = (type?: string | null) => {
  switch (type) {
    case null:
      return null
    case "DOMESTIC_FLAT":
      return "Flat rate"
    case "INTERNATIONAL_FLAT":
      return "Flat rate"
    default:
      return `(TODO) ${type?.replace(/_/g, " ").toLocaleLowerCase()}`
  }
}

const today = new Date()

const dateRangeString = (args: {
  from: Date
  startOffsetDays: number
  endOffsetDays: number
}) => {
  const startDate = DateTime.fromJSDate(args.from).plus({
    days: args.startOffsetDays,
  })
  const endDate = DateTime.fromJSDate(args.from).plus({
    days: args.endOffsetDays,
  })

  const endDateFormat = startDate.month !== endDate.month ? "MMM d" : "d"

  return `${startDate.toFormat("MMM d")}-${endDate.toFormat(endDateFormat)}`
}

export const deliveryOptionTimeEstimate = (
  type?: string | null,
  from: Date = today,
): [string, string] | null => {
  switch (type) {
    case null:
      return null
    case "DOMESTIC_FLAT":
      return [
        "Estimated to ship between",
        dateRangeString({
          from,
          startOffsetDays: 8,
          endOffsetDays: 10,
        }),
      ]
    case "INTERNATIONAL_FLAT":
      return [
        "Estimated to ship between",
        dateRangeString({
          from,
          startOffsetDays: 8,
          endOffsetDays: 10,
        }),
      ]
    default:
      return [
        "Estimated to ship between",
        dateRangeString({
          from,
          startOffsetDays: 8,
          endOffsetDays: 10,
        }),
      ]
  }
}
