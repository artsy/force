import { useEffect, useRef } from "react"

export const useTimeout = ({
  callback,
  delay = 0,
}: {
  callback: () => void
  delay: number
}) => {
  const callbackRef = useRef(callback)

  callbackRef.current = callback

  useEffect(() => {
    const timer = setTimeout(() => {
      callbackRef.current()
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay])
}
