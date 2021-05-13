import { compound } from "@artsy/palette"
import { uniqBy } from "lodash"
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

type Sticky = {
  id: string
  height: number
}

const StickyContext = createContext<{
  /** Sorted by place in React tree (lower on the page = later in the array) */
  stickies: Sticky[]
  registerSticky(sticky: Sticky): void
}>({
  stickies: [],
  registerSticky: () => {},
})

export const StickyProvider: React.FC = ({ children }) => {
  const [stickies, setStickies] = useState<Sticky[]>([])

  const registerSticky = useCallback((sticky: Sticky) => {
    setStickies(prevStickies => uniqBy([...prevStickies, sticky], "id"))
  }, [])

  return (
    <StickyContext.Provider value={{ stickies, registerSticky }}>
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

export const useSticky = () => {
  const { stickies, registerSticky: __registerSticky__ } = useContext(
    StickyContext
  )

  const id = useRef(generateId())

  const registerSticky = useCallback(
    height => {
      if (height === undefined) return
      __registerSticky__({ id: id.current, height })
    },
    [__registerSticky__]
  )

  const offsetTop = useMemo(
    () => getOffsetTopForSticky({ id: id.current, stickies }) ?? 0,
    [stickies]
  )

  return { offsetTop, registerSticky, id: id.current }
}
