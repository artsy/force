import { createContext, RefObject, useContext } from "react"

export interface ScrollRefContextValue {
  scrollRef: RefObject<HTMLDivElement | null>
}

export const ScrollRefContext = createContext<ScrollRefContextValue | null>(
  null
)

export const useScrollRefContext = () => {
  return useContext(ScrollRefContext)
}
