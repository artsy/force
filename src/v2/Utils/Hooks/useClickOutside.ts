import { useEffect, useRef, useCallback } from "react"

export type UseClickOutside = {
  ref: React.RefObject<HTMLElement>
  when: boolean
  type?: keyof DocumentEventMap
  onClickOutside: (event: Event) => void
}

export const useClickOutside = ({
  ref,
  type = "click",
  when = true,
  onClickOutside,
}: UseClickOutside) => {
  const savedHandler = useRef(onClickOutside)

  const handleClick = useCallback((e: Event) => {
    if (ref && ref.current && !ref.current.contains(e.target as Element)) {
      savedHandler.current(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    savedHandler.current = onClickOutside
  }, [onClickOutside])

  useEffect(() => {
    if (when) {
      document.addEventListener(type, handleClick)
      return () => {
        document.removeEventListener(type, handleClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [when])
}
