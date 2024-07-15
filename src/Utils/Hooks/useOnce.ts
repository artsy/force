import { useEffect, useRef } from "react"

export const useOnce = (fn: () => void) => {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    fn()
    hasRun.current = true
  }, [fn])
}
