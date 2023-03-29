import { useCallback, useEffect, useState } from "react"
import { usePaginationFragment } from "react-relay"

type UsePaginationFragmentProps = ReturnType<typeof usePaginationFragment>
interface UseLoadNext {
  pageSize: number
  hasNext: UsePaginationFragmentProps["hasNext"]
  isLoadingNext: UsePaginationFragmentProps["isLoadingNext"]
  loadNext: UsePaginationFragmentProps["loadNext"]
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

  useEffect(() => {
    if (shouldLoadMore && hasNext && !isLoadingNext && when !== false) {
      loadNext(pageSize)
      setLoadMore(false)
    }
  }, [shouldLoadMore, hasNext, isLoadingNext, loadNext, when, pageSize])

  const loadMore = useCallback(() => {
    setLoadMore(true)
  }, [])

  return { loadMore }
}
