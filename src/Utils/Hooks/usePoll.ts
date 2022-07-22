import { useEffect, useRef } from "react"

type IntervalFunction = () => unknown | void

interface PollProps {
  callback: IntervalFunction
  intervalTime: number
  key: string | null
  clearWhen?: boolean
}

export const usePoll = ({
  callback,
  intervalTime,
  key,
  clearWhen,
}: PollProps) => {
  const savedCallback = useRef<IntervalFunction | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback, key])

  useEffect(() => {
    function tick() {
      if (!!savedCallback.current) savedCallback.current()
    }

    const id = setInterval(tick, intervalTime)
    if (clearWhen) clearInterval(id)

    // Cleanup
    return () => clearInterval(id)
  }, [intervalTime, clearWhen])
}
