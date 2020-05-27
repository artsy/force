import { useSystemContext } from "v2/Artsy/SystemContext"
import { useEffect, useState } from "react"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"

/**
 * Checks to see if a route was previously fetching and has completed, in order
 * to track at the end of execution.
 */
export function useRouteTracking() {
  const [shouldTrack, setShouldTrack] = useState(false)
  const { isFetching } = useSystemContext()
  const prevFetching = usePrevious(isFetching)

  useEffect(() => {
    if (prevFetching && !isFetching) {
      setShouldTrack(true)

      // Wait till after the next tick to set to false, to give react tree
      // ability to execute related tracking handlers
      setImmediate(() => {
        setShouldTrack(false)
      })
    }
  }, [isFetching, prevFetching])

  return shouldTrack
}
