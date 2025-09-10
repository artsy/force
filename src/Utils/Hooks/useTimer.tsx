import { DateTime, Duration } from "luxon"
import { useCurrentTime } from "./useCurrentTime"

interface Time {
  days: string
  hours: string
  minutes: string
  seconds: string
}

interface Timer {
  hasEnded: boolean
  time: Time
  hasStarted: boolean
}

const padWithZero = (num: number) => {
  return num.toString().padStart(2, "0")
}

const extractTime = (time: number) => {
  return padWithZero(Math.max(0, Math.floor(time)))
}

export const useTimer = (endDate: string, startAt = ""): Timer => {
  const currentTime = useCurrentTime({ syncWithServer: true })

  if (!currentTime || !endDate) {
    return {
      days: "00",
      hours: "00",
      minutes: "00", 
      seconds: "00",
      hasEnded: false,
      hasStarted: true,
    }
  }

  const endDateTime = DateTime.fromISO(endDate)
  const currentDateTime = DateTime.fromISO(currentTime)

  if (!endDateTime.isValid || !currentDateTime.isValid) {
    return {
      days: "00",
      hours: "00",
      minutes: "00", 
      seconds: "00",
      hasEnded: false,
      hasStarted: true,
    }
  }

  const timeBeforeEnd = Duration.fromISO(
    endDateTime.diff(currentDateTime).toString(),
  )
  const hasEnded = Math.floor(timeBeforeEnd.seconds) <= 0

  let timeBeforeStart = Duration.fromMillis(0)
  let hasStarted = true

  if (startAt) {
    const startDateTime = DateTime.fromISO(startAt)
    if (startDateTime.isValid) {
      timeBeforeStart = Duration.fromISO(
        startDateTime.diff(currentDateTime).toString(),
      )
      hasStarted = Math.floor(timeBeforeStart.seconds) <= 0
    }
  }

  // If startAt is passed into this hook and it is in the future,
  // show the time before start. Otherwise show the time before end.
  const duration =
    hasStarted || startAt === "" ? timeBeforeEnd : timeBeforeStart

  const days = extractTime(duration.as("days"))
  const hours = extractTime(duration.as("hours") % 24)
  const minutes = extractTime(duration.as("minutes") % 60)
  const seconds = extractTime(duration.as("seconds") % 60)

  const time = {
    days,
    hours,
    minutes,
    seconds,
  }

  return { hasEnded, time, hasStarted }
}
