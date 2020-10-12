import { useSystemContext } from "v2/Artsy"
import { DateTime } from "luxon"
import { useEffect, useRef, useState } from "react"
import { getCurrentTimeAsIsoString } from "v2/Utils/getCurrentTimeAsIsoString"
import { getOffsetBetweenGravityClock } from "v2/Utils/time"

/**
 * Hook to provide the current time as an ISO string, and
 * an offset from the current time to the server time (in milliseconds).
 *
 * If the `syncWithServer` prop is provided the offset is calculated and included
 * with the current time. Any errors in offset calculation, or if that prop is not
 * provided, will result in the offset being calculated as 0.
 *
 * @param interval The interval (in ms) with which to update the time.
 *                 The default value is 1000, i.e. the time is updated once
 *                 every second.
 */

interface UseCurrentTimeProps {
  interval?: number
  syncWithServer?: boolean
}

export const useCurrentTime = ({
  interval = 1000,
  syncWithServer = false,
}: UseCurrentTimeProps = {}) => {
  const { relayEnvironment } = useSystemContext()

  const [currentTime, setCurrentTime] = useState(getCurrentTimeAsIsoString())
  const [timeOffsetInMilliseconds, setTimeOffsetInMilliseconds] = useState(0)

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (syncWithServer) {
      getOffsetBetweenGravityClock(relayEnvironment).then(offset => {
        setTimeOffsetInMilliseconds(offset)
      })
    }

    intervalId.current = setInterval(() => {
      setCurrentTime(getCurrentTimeAsIsoString())
    }, interval)

    return () => {
      clearInterval(intervalId.current)
    }
  }, [interval, relayEnvironment, syncWithServer])

  return DateTime.fromISO(currentTime)
    .minus({ millisecond: timeOffsetInMilliseconds })
    .toString()
}
