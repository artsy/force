import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"

interface UseDebounce {
  delay?: number
  callback: (...args: any[]) => void
}

export const useDebounce = ({ callback, delay = 200 }: UseDebounce) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(callback, delay), [callback, delay])
}

interface UseDebouncedValue<T> {
  value: T
  delay?: number
}

export const useDebouncedValue = <T>({
  value,
  delay = 200,
}: UseDebouncedValue<T>) => {
  const [debouncedValue, setValue] = useState(value)
  const debouncedSetValue = useDebounce({ callback: setValue, delay })

  useEffect(() => {
    debouncedSetValue(value)
  }, [debouncedSetValue, value])

  return { debouncedValue }
}
