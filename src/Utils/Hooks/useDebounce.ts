import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"

interface UseDebounce {
  delay?: number
  callback: (...args: any[]) => void
  settings?: any
}

export const useDebounce = ({
  callback,
  delay = 200,
  settings,
}: UseDebounce) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(callback, delay, settings), [callback, delay])
}

interface UseDebouncedValue<T> {
  value: T
  delay?: number
  settings?: any
}

export const useDebouncedValue = <T>({
  value,
  delay = 200,
  settings,
}: UseDebouncedValue<T>) => {
  const [debouncedValue, setValue] = useState(value)
  const debouncedSetValue = useDebounce({ callback: setValue, delay, settings })

  useEffect(() => {
    debouncedSetValue(value)
  }, [debouncedSetValue, value])

  return { debouncedValue }
}
