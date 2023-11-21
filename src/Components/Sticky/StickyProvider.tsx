import { compound } from "@artsy/palette"
import { uniqBy } from "lodash"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import * as React from "react"

export type TSticky = {
  id: string
  height: number
  status: "FIXED" | "ORIGINAL" | "RELEASED"
}

const StickyContext = createContext<{
  /** Sorted by place in React tree (lower on the page = later in the array) */
  stickies: TSticky[]
  registerSticky(sticky: TSticky): void
  deregisterSticky(sticky: Pick<TSticky, "id">): void
  updateSticky({ id, payload }: { id: string; payload: Partial<TSticky> }): void
}>({
  stickies: [],
  registerSticky: () => {},
  deregisterSticky: () => {},
  updateSticky: () => {},
})

/**
 * Imported once in Boot.tsx.
 * You do NOT need to import this to use a `Sticky` component.
 */
export const StickyProvider: React.FC = ({ children }) => {
  const [stickies, setStickies] = useState<TSticky[]>([])

  const registerSticky = useCallback((sticky: TSticky) => {
    setStickies(prevStickies => uniqBy([...prevStickies, sticky], "id"))
  }, [])

  const deregisterSticky = useCallback((sticky: TSticky) => {
    setStickies(prevStickies =>
      prevStickies.filter(({ id }) => id !== sticky.id)
    )
  }, [])

  const updateSticky = useCallback(
    ({ id, payload }: { id: string; payload: Partial<TSticky> }) => {
      setStickies(prevStickies =>
        prevStickies.map(sticky => {
          if (sticky.id !== id) return sticky
          return {
            ...sticky,
            ...payload,
          }
        })
      )
    },
    []
  )

  return (
    <StickyContext.Provider
      value={{ stickies, registerSticky, deregisterSticky, updateSticky }}
    >
      {children}
    </StickyContext.Provider>
  )
}

const generateId = () => Math.random().toString(26).slice(2)

/**
 * Given a sticky ID; find the distance from the top it should sit in relation
 * to any existing stickies.
 */
export const getOffsetTopForSticky = ({
  id,
  stickies,
}: {
  id: string
  stickies: TSticky[]
}) => {
  const relevant = stickies.filter(sticky => sticky.status !== "RELEASED")
  const index = relevant.findIndex(sticky => sticky.id === id)

  return compound([0, ...relevant.map(({ height }) => height).slice(0, -1)])[
    index
  ]
}

export const useSticky = ({ id: _id }: { id?: string } = {}) => {
  const {
    stickies,
    registerSticky: __registerSticky__,
    deregisterSticky: __deregisterSticky__,
    updateSticky: __updateSticky__,
  } = useContext(StickyContext)

  const id = useRef(_id ?? generateId())

  const registerSticky = useCallback(
    height => {
      if (height === undefined) return
      __registerSticky__({ id: id.current, height, status: "ORIGINAL" })
    },
    [__registerSticky__]
  )

  const deregisterSticky = useCallback(() => {
    __deregisterSticky__({ id: id.current })
  }, [__deregisterSticky__])

  const updateSticky = useCallback(
    (payload: Partial<TSticky>) => {
      __updateSticky__({ id: id.current, payload })
    },
    [__updateSticky__]
  )

  const offsetTop = useMemo(
    () => getOffsetTopForSticky({ id: id.current, stickies }) ?? 0,
    [stickies]
  )

  return {
    id: id.current,
    deregisterSticky,
    offsetTop,
    registerSticky,
    stickies,
    updateSticky,
  }
}
