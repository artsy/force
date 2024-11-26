import { useEffect } from "react"
import { useRouter } from "System/Hooks/useRouter"

/**
 * Checks to see if a route has completed fetching.
 */
export const useRouteComplete = ({
  onComplete,
}: { onComplete?(): void } = {}) => {
  const { match } = useRouter()

  const isFetching = !match.elements
  const isComplete = !isFetching

  useEffect(() => {
    if (!isFetching) return
    onComplete?.()
  }, [isFetching, onComplete])

  return { isFetching, isComplete }
}
