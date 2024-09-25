import { useEffect, useState } from "react"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { useRouter } from "System/Hooks/useRouter"

/**
 * Checks to see if a route was previously fetching and has completed.
 */
export const useRouteComplete = ({
  onComplete,
}: { onComplete?(): void } = {}) => {
  const [isComplete, setIsComplete] = useState(false)
  const { match } = useRouter()
  const isFetching = !match.elements
  const prevFetching = usePrevious(isFetching)

  useEffect(() => {
    if (prevFetching && !isFetching) {
      setIsComplete(true)
      onComplete && onComplete()

      // Wait till after the next tick to set to false, to give react tree
      // ability to execute related tracking handlers
      setTimeout(() => {
        setIsComplete(false)
      }, 0)
    }
  }, [isFetching, onComplete, prevFetching])

  return { isComplete }
}
