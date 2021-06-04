import { createContext, RefObject, useContext } from "react"

export interface ScrollRefContextValue {
  scrollRef: RefObject<any>
}

export const ScrollRefContext = createContext<ScrollRefContextValue | null>(
  null
)

export const useScrollRefContext = () => {
  const ctx = useContext(ScrollRefContext)
  return ctx
}
