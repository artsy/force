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

type Sticky = {
  id: string
  height: number
}

const StickyContext = createContext<{
  /** Sorted by place in React tree (lower on the page = later in the array) */
  stickies: Sticky[]
  registerSticky(sticky: Sticky): void
  deregisterSticky(sticky: Pick<Sticky, "id">): void
}>({
  stickies: [],
  registerSticky: () => {},
  deregisterSticky: () => {},
})

/**
 * Imported once in Boot.tsx.
 * You do NOT need to import this to use a `Sticky` component.
 */
export const StickyProvider: React.FC = ({ children }) => {
  const [stickies, setStickies] = useState<Sticky[]>([])

  const registerSticky = useCallback((sticky: Sticky) => {
    setStickies(prevStickies => uniqBy([...prevStickies, sticky], "id"))
  }, [])

  const deregisterSticky = useCallback((sticky: Sticky) => {
    setStickies(prevStickies =>
      prevStickies.filter(({ id }) => id !== sticky.id)
    )
  }, [])

  return (
    <StickyContext.Provider
      value={{ stickies, registerSticky, deregisterSticky }}
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
  stickies: Sticky[]
}) => {
  const index = stickies.findIndex(sticky => sticky.id === id)

  return compound([0, ...stickies.map(({ height }) => height).slice(0, -1)])[
    index
  ]
}

export const useSticky = ({ id: _id }: { id?: string } = {}) => {
  const {
    stickies,
    registerSticky: __registerSticky__,
    deregisterSticky: __deregisterSticky__,
  } = useContext(StickyContext)

  const id = useRef(_id ?? generateId())

  const registerSticky = useCallback(
    height => {
      if (height === undefined) return
      __registerSticky__({ id: id.current, height })
    },
    [__registerSticky__]
  )

  const deregisterSticky = useCallback(() => {
    __deregisterSticky__({ id: id.current })
  }, [__deregisterSticky__])

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
  }
}
