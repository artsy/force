import { isFunction } from "lodash"
import { useCallback, useEffect, useState } from "react"
import type { RelayPaginationProp, usePaginationFragment } from "react-relay"

type UsePaginationFragmentProps = ReturnType<typeof usePaginationFragment>
interface UseLoadNext {
  pageSize: number
  hasNext:
    | UsePaginationFragmentProps["hasNext"]
    | RelayPaginationProp["hasMore"]
  isLoadingNext:
    | UsePaginationFragmentProps["isLoadingNext"]
    | RelayPaginationProp["isLoading"]
  loadNext:
    | UsePaginationFragmentProps["loadNext"]
    | RelayPaginationProp["loadMore"]
  when?: boolean
}

export const useLoadMore = ({
  pageSize,
  hasNext,
  isLoadingNext,
  loadNext,
  when,
}: UseLoadNext) => {
  const [shouldLoadMore, setLoadMore] = useState<boolean>(false)

  const hasMore = () => {
    return isFunction(hasNext) ? hasNext() : hasNext
  }

  const isLoading = () => {
    return isFunction(isLoadingNext) ? isLoadingNext() : isLoadingNext
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Load more logic managed by external state changes
  useEffect(() => {
    if (shouldLoadMore && hasMore() && !isLoading() && when !== false) {
      loadNext(pageSize, () => {
        setLoadMore(false)
      })
    } else {
      setLoadMore(false)
    }
  }, [shouldLoadMore, isLoadingNext, loadNext, when, pageSize])

  const loadMore = useCallback(() => {
    setLoadMore(true)
  }, [])

  return { loadMore, shouldLoadMore }
}
