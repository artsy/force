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

export const useTimer = (endDate: string, startAt: string = ""): Timer => {
  const currentTime = useCurrentTime({ syncWithServer: true })

  const duration = Duration.fromISO(
    DateTime.fromISO(endDate).diff(DateTime.fromISO(currentTime)).toString()
  )
  const hasEnded = Math.floor(duration.seconds) <= 0

  const timeBeforeStart = Duration.fromISO(
    DateTime.fromISO(startAt).diff(DateTime.fromISO(currentTime)).toString()
  )
  const hasStarted = Math.floor(timeBeforeStart.seconds) <= 0

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
