import { DateTime } from "luxon"
export const getCurrentTimeAsIsoString = () => DateTime.local().toString()
