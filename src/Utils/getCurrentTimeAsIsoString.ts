import { DateTime } from "luxon"
export const getCurrentTimeAsIsoString = () => DateTime.utc().toString()
