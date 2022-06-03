import { useSystemContext } from "v2/System/SystemContext"
import { useEffect, useState } from "react"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import { setImmediate } from "timers"

/**
 * Checks to see if a route was previously fetching and has completed.
 */
export const useRouteComplete = ({
  onComplete,
}: { onComplete?(): void } = {}) => {
  const [isComplete, setIsComplete] = useState(false)
  const { isFetching } = useSystemContext()
  const prevFetching = usePrevious(isFetching)

  useEffect(() => {
    if (prevFetching && !isFetching) {
      setIsComplete(true)
      onComplete && onComplete()

      // Wait till after the next tick to set to false, to give react tree
      // ability to execute related tracking handlers
      setImmediate(() => {
        setIsComplete(false)
      })
    }
  }, [isFetching, onComplete, prevFetching])

  return { isComplete }
}
