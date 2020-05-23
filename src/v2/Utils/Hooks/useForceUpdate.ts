import { useCallback, useState } from "react"

export function useForceUpdate(): () => void {
  const [, dispatch] = useState(Object.create(null))

  const memoizedDispatch = useCallback(() => {
    dispatch(Object.create(null))
  }, [dispatch])

  return memoizedDispatch
}
