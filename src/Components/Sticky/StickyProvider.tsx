import { compound } from "@artsy/palette"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import type * as React from "react"

export type TSticky = {
  id: string
  height: number
  status: "FIXED" | "ORIGINAL" | "RELEASED"
  retractsNav?: boolean
}

const StickyContext = createContext<{
  /** Sorted by place in React tree (lower on the page = later in the array) */
  stickies: TSticky[]
  isNavBarRetracted: boolean
  shouldRetractGlobalNav: boolean
  scrollDirection: "up" | "down"
  registerSticky(sticky: TSticky): void
  deregisterSticky(sticky: Pick<TSticky, "id">): void
  updateSticky({ id, payload }: { id: string; payload: Partial<TSticky> }): void
}>({
  stickies: [],
  isNavBarRetracted: false,
  shouldRetractGlobalNav: false,
  scrollDirection: "up",
  registerSticky: () => {},
  deregisterSticky: () => {},
  updateSticky: () => {},
})

/**
 * Imported once in Boot.tsx.
 * You do NOT need to import this to use a `Sticky` component.
 */
export const StickyProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const DELTA_THRESHOLD = 2
  const RETRACT_THRESHOLD = 24

  const [stickies, setStickies] = useState<TSticky[]>([])
  const [isNavBarRetracted, setIsNavBarRetracted] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")

  const registerSticky = useCallback((sticky: TSticky) => {
    setStickies(prevStickies => {
      const existingIndex = prevStickies.findIndex(({ id }) => id === sticky.id)

      if (existingIndex >= 0) {
        const next = [...prevStickies]
        next[existingIndex] = { ...next[existingIndex], ...sticky }
        return next
      }

      return [...prevStickies, sticky]
    })
  }, [])

  const deregisterSticky = useCallback((sticky: Pick<TSticky, "id">) => {
    setStickies(prevStickies =>
      prevStickies.filter(({ id }) => id !== sticky.id),
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
        }),
      )
    },
    [],
  )

  const shouldRetractGlobalNav = useMemo(
    () =>
      stickies.some(
        sticky => sticky.status === "FIXED" && sticky.retractsNav === true,
      ),
    [stickies],
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!shouldRetractGlobalNav) {
      setIsNavBarRetracted(false)
      setScrollDirection("up")
      return
    }

    let lastScrollY = window.scrollY
    let lastToggleY = lastScrollY
    let ticking = false

    const updateDirection = () => {
      const current = window.scrollY

      const delta = current - lastScrollY

      if (Math.abs(delta) < DELTA_THRESHOLD) {
        ticking = false
        return
      }

      const direction: "up" | "down" = delta > 0 ? "down" : "up"

      setScrollDirection(prev => (prev === direction ? prev : direction))

      setIsNavBarRetracted(prev => {
        if (!shouldRetractGlobalNav) return false

        if (!prev && direction === "down") {
          if (Math.abs(current - lastToggleY) > RETRACT_THRESHOLD) {
            lastToggleY = current
            return true
          }
        }

        if (prev && direction === "up") {
          if (Math.abs(current - lastToggleY) > RETRACT_THRESHOLD) {
            lastToggleY = current
            return false
          }
        }

        return prev
      })

      lastScrollY = current
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateDirection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [shouldRetractGlobalNav])

  return (
    <StickyContext.Provider
      value={{
        stickies,
        isNavBarRetracted,
        shouldRetractGlobalNav,
        scrollDirection,
        registerSticky,
        deregisterSticky,
        updateSticky,
      }}
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
  const relevant = stickies.filter(sticky => sticky.status === "FIXED")
  const index = relevant.findIndex(sticky => sticky.id === id)

  // If sticky is not FIXED, return 0 (no offset needed)
  if (index === -1) return 0

  return compound([0, ...relevant.map(({ height }) => height).slice(0, -1)])[
    index
  ]
}

export const useSticky = ({ id: _id }: { id?: string } = {}) => {
  const {
    stickies,
    isNavBarRetracted,
    shouldRetractGlobalNav,
    scrollDirection,
    registerSticky: __registerSticky__,
    deregisterSticky: __deregisterSticky__,
    updateSticky: __updateSticky__,
  } = useContext(StickyContext)

  const id = useRef(_id ?? generateId())

  const registerSticky = useCallback(
    (height: number, options: { retractsNav?: boolean } = {}) => {
      if (height === undefined) return
      __registerSticky__({
        id: id.current,
        height,
        retractsNav: options.retractsNav,
        status: "ORIGINAL",
      })
    },
    [__registerSticky__],
  )

  const deregisterSticky = useCallback(() => {
    __deregisterSticky__({ id: id.current })
  }, [__deregisterSticky__])

  const updateSticky = useCallback(
    (payload: Partial<TSticky>) => {
      __updateSticky__({ id: id.current, payload })
    },
    [__updateSticky__],
  )

  const offsetTop = useMemo(
    () => getOffsetTopForSticky({ id: id.current, stickies }) ?? 0,
    [stickies],
  )

  return {
    id: id.current,
    deregisterSticky,
    offsetTop,
    registerSticky,
    isNavBarRetracted,
    shouldRetractGlobalNav,
    scrollDirection,
    stickies,
    updateSticky,
  }
}
