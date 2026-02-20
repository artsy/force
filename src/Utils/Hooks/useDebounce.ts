import debounce from "lodash/debounce"
import { useCallback, useEffect, useState } from "react"

interface UseDebounce {
  delay?: number
  callback: (...args: any[]) => void
  settings?: any
}

/**
 * @deprecated Use `import { useDebouncedCallback } from "use-debounce"` instead
 */
export const useDebounce = ({
  callback,
  delay = 200,
  settings,
}: UseDebounce) => {
  return useCallback(debounce(callback, delay, settings), [callback, delay])
}

interface UseDebouncedValue<T> {
  value: T
  delay?: number
  settings?: any
}

/**
 * @deprecated Use `import { useDebounce } from "use-debounce"` instead
 */
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
