import { useState, useEffect } from "react"
import { differenceInHours, differenceInMinutes } from "date-fns"

const IMMINENT_TIME = 5 // hours

const calculateTime = (endTime: string) => {
  const now = new Date()
  const expiration = new Date(endTime)
  const timeDiff = differenceInMinutes(expiration, now)

  const ONE_DAY = 1440 // 24 hours * 60 minutes

  const days = Math.floor(timeDiff / ONE_DAY)
  const hours = Math.floor((timeDiff % ONE_DAY) / 60)
  const minutes = Math.floor(timeDiff % 60)

  if (timeDiff <= 0) {
    return "Expired"
  }
  if (timeDiff >= ONE_DAY) {
    return `${days}d ${hours}h`
  }
  return `${hours}h ${minutes}m`
}

const calculateImminent = (endTime: string) =>
  differenceInHours(
    new Date(endTime),
    new Date(),
    // @ts-expect-error CONVERSATION_MIGRATION
    {
      roundingMethod: "ceil",
    }
  ) <= IMMINENT_TIME

const calculatePercentage = (startTime: string, endTime: string) => {
  const now = new Date()
  const endsAt = new Date(endTime)
  const startsAt = new Date(startTime)

  const total = differenceInMinutes(endsAt, startsAt)
  const remaining = differenceInMinutes(endsAt, now)

  let percent = 0
  if (remaining >= 0) percent = Math.round((remaining / total) * 100)

  return percent
}

type RemainingTime =
  | "Calculating time"
  | "Expired"
  | Omit<string, "Calculating time" | "Expired">

interface TimerProps {
  startTime: string
  endTime: string
}

export const useCountdownTimer = ({ startTime, endTime }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<RemainingTime>(
    "Calculating time"
  )
  const [isImminent, setIsImminent] = useState<boolean>(false)
  const [percentComplete, setPercentComplete] = useState<number>(0)

  const ONE_MINUTE = 60000

  useEffect(() => {
    const timeTillExpiration = calculateTime(endTime)
    setRemainingTime(timeTillExpiration)
    setIsImminent(calculateImminent(endTime))
    setPercentComplete(calculatePercentage(startTime, endTime))

    const interval = setInterval(() => {
      const timeTillExpiration = calculateTime(endTime)
      if (timeTillExpiration === remainingTime) {
        // we don't need to re-assign if the value is the same
        return
      }
      setRemainingTime(timeTillExpiration)
      setIsImminent(calculateImminent(endTime))
      setPercentComplete(calculatePercentage(startTime, endTime))
      if (timeTillExpiration === "Expired") clearInterval(interval)
    }, ONE_MINUTE)

    return () => clearInterval(interval)
  }, [startTime, endTime, remainingTime])

  return { remainingTime, isImminent, percentComplete }
}
