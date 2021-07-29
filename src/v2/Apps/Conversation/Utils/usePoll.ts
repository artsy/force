import { useEffect, useRef } from "react"

type IntervalFunction = () => unknown | void

export default function usePoll(
  callback: IntervalFunction,
  seconds: number,
  key: string | null,
  stop?: boolean
) {
  const savedCallback = useRef<IntervalFunction | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback, key])

  useEffect(() => {
    function tick() {
      if (!!savedCallback.current) savedCallback.current()
    }

    const id = setInterval(tick, seconds * 1000)
    if (stop) clearInterval(id)

    // Cleanup
    return () => clearInterval(id)
  }, [seconds, stop])
}
