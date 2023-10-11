import { DateTime } from "luxon"

export const getTimeZone = () => {
  return (
    Intl.DateTimeFormat().resolvedOptions().timeZone ||
    DateTime.local().zoneName
  )
}
