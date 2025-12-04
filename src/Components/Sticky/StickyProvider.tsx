import { Box, compound, useTheme } from "@artsy/palette"
import { NAV_BAR_TRANSITION_DURATION } from "Apps/Components/Layouts/Components/LayoutNav"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import {
  type ScrollDirection,
  useScrollDirection,
} from "Utils/Hooks/useScrollDirection"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"
import type * as React from "react"

export type TSticky = {
  id: string
  height: number
  status: "FIXED" | "ORIGINAL" | "RELEASED"
}

type StickyState = {
  stickies: TSticky[]
  globalNavRetractors: Record<string, boolean>
  isGlobalNavRetracted: boolean
}

type StickyAction =
  | { type: "REGISTER_STICKY"; sticky: TSticky }
  | { type: "DEREGISTER_STICKY"; id: string }
  | { type: "UPDATE_STICKY"; id: string; payload: Partial<TSticky> }
  | { type: "SET_NAV_RETRACTION"; id: string; isActive: boolean }
  | { type: "SET_NAV_RETRACTED"; isRetracted: boolean }

const INITIAL_STATE: StickyState = {
  stickies: [],
  globalNavRetractors: {},
  isGlobalNavRetracted: false,
}

const reducer = (state: StickyState, action: StickyAction): StickyState => {
  switch (action.type) {
    case "REGISTER_STICKY": {
      if (state.stickies.some(({ id }) => id === action.sticky.id)) {
        return state
      }

      return {
        ...state,
        stickies: [...state.stickies, action.sticky],
      }
    }

    case "DEREGISTER_STICKY": {
      const { [action.id]: _unused, ...restRetractors } =
        state.globalNavRetractors

      return {
        ...state,
        stickies: state.stickies.filter(({ id }) => id !== action.id),
        globalNavRetractors: restRetractors,
      }
    }

    case "UPDATE_STICKY": {
      return {
        ...state,
        stickies: state.stickies.map(sticky => {
          if (sticky.id !== action.id) return sticky
          return {
            ...sticky,
            ...action.payload,
          }
        }),
      }
    }

    case "SET_NAV_RETRACTION": {
      if (action.isActive) {
        if (state.globalNavRetractors[action.id]) return state

        return {
          ...state,
          globalNavRetractors: {
            ...state.globalNavRetractors,
            [action.id]: true,
          },
        }
      }

      if (!state.globalNavRetractors[action.id]) return state

      const { [action.id]: _unused, ...rest } = state.globalNavRetractors

      return {
        ...state,
        globalNavRetractors: rest,
      }
    }

    case "SET_NAV_RETRACTED": {
      if (state.isGlobalNavRetracted === action.isRetracted) return state

      return {
        ...state,
        isGlobalNavRetracted: action.isRetracted,
      }
    }

    default:
      return state
  }
}

const StickyContext = createContext<{
  /** Sorted by place in React tree (lower on the page = later in the array) */
  stickies: TSticky[]
  registerSticky(sticky: TSticky): void
  deregisterSticky(sticky: Pick<TSticky, "id">): void
  updateSticky({ id, payload }: { id: string; payload: Partial<TSticky> }): void
  isGlobalNavRetracted: boolean
  hasRetractGlobalNavStickies: boolean
  setGlobalNavRetraction({
    id,
    isActive,
  }: {
    id: string
    isActive: boolean
  }): void
  scrollDirection: ScrollDirection
}>({
  stickies: [],
  registerSticky: () => {},
  deregisterSticky: () => {},
  updateSticky: () => {},
  isGlobalNavRetracted: false,
  hasRetractGlobalNavStickies: false,
  setGlobalNavRetraction: () => {},
  scrollDirection: "down",
})

/**
 * Imported once in Boot.tsx.
 * You do NOT need to import this to use a `Sticky` component.
 */
export const StickyProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const registerSticky = useCallback((sticky: TSticky) => {
    dispatch({ type: "REGISTER_STICKY", sticky })
  }, [])

  const deregisterSticky = useCallback((sticky: TSticky) => {
    dispatch({ type: "DEREGISTER_STICKY", id: sticky.id })
  }, [])

  const updateSticky = useCallback(
    ({ id, payload }: { id: string; payload: Partial<TSticky> }) => {
      dispatch({ type: "UPDATE_STICKY", id, payload })
    },
    [],
  )

  const setGlobalNavRetraction = useCallback(
    ({ id, isActive }: { id: string; isActive: boolean }) => {
      dispatch({ type: "SET_NAV_RETRACTION", id, isActive })
    },
    [],
  )

  const hasActiveRetractors = useMemo(
    () => Object.keys(state.globalNavRetractors).length > 0,
    [state.globalNavRetractors],
  )

  const { isScrollingDown, direction } = useScrollDirection({
    enabled: hasActiveRetractors,
    initialDirection: "down",
  })

  useEffect(() => {
    if (!hasActiveRetractors) {
      dispatch({ type: "SET_NAV_RETRACTED", isRetracted: false })
      return
    }

    dispatch({ type: "SET_NAV_RETRACTED", isRetracted: isScrollingDown })
  }, [hasActiveRetractors, isScrollingDown])

  return (
    <StickyContext.Provider
      value={{
        stickies: state.stickies,
        registerSticky,
        deregisterSticky,
        updateSticky,
        isGlobalNavRetracted: state.isGlobalNavRetracted,
        hasRetractGlobalNavStickies: hasActiveRetractors,
        setGlobalNavRetraction,
        scrollDirection: direction,
      }}
    >
      {children}

      <StickyShadow
        stickies={state.stickies}
        hasRetractGlobalNavStickies={hasActiveRetractors}
        isGlobalNavRetracted={state.isGlobalNavRetracted}
      />
    </StickyContext.Provider>
  )
}

const StickyShadow: React.FC<{
  stickies: TSticky[]
  hasRetractGlobalNavStickies: boolean
  isGlobalNavRetracted: boolean
}> = ({ stickies, hasRetractGlobalNavStickies, isGlobalNavRetracted }) => {
  const { theme } = useTheme()

  const { computedHeight: headerOffset } = useNavBarHeight()

  const [shadowHeight, setShadowHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!hasRetractGlobalNavStickies) {
      setShadowHeight(null)
      return
    }

    // Find all FIXED stickies
    const fixedStickies = stickies.filter(s => s.status === "FIXED")

    if (fixedStickies.length === 0) {
      setShadowHeight(null)
      return
    }

    // Calculate the bottom position of the last FIXED sticky
    // We need to sum up all the heights of FIXED stickies + nav bar offset
    const stickyStackHeight = fixedStickies.reduce(
      (sum, s) => sum + s.height,
      0,
    )

    const totalHeight = headerOffset + stickyStackHeight

    setShadowHeight(totalHeight)
  }, [stickies, hasRetractGlobalNavStickies, headerOffset])

  if (shadowHeight === null) return null

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      pointerEvents="none"
      zIndex={1}
      style={{
        height: shadowHeight,
        transform: isGlobalNavRetracted
          ? `translate3d(0, -${headerOffset}px, 0)`
          : "translate3d(0, 0, 0)",
        transition: `transform ${NAV_BAR_TRANSITION_DURATION}, opacity ${NAV_BAR_TRANSITION_DURATION}`,
        opacity: 1,
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        style={{
          boxShadow: theme.effects.dropShadow,
        }}
      />
    </Box>
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
    registerSticky: __registerSticky__,
    deregisterSticky: __deregisterSticky__,
    updateSticky: __updateSticky__,
    isGlobalNavRetracted,
    hasRetractGlobalNavStickies,
    setGlobalNavRetraction: __setGlobalNavRetraction__,
    scrollDirection,
  } = useContext(StickyContext)

  const id = useRef(_id ?? generateId())

  const registerSticky = useCallback(
    (height: number | undefined) => {
      if (height === undefined) return
      __registerSticky__({ id: id.current, height, status: "ORIGINAL" })
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

  const setGlobalNavRetraction = useCallback(
    (isActive: boolean) => {
      __setGlobalNavRetraction__({ id: id.current, isActive })
    },
    [__setGlobalNavRetraction__],
  )

  return {
    id: id.current,
    deregisterSticky,
    offsetTop,
    registerSticky,
    stickies,
    updateSticky,
    isGlobalNavRetracted,
    hasRetractGlobalNavStickies,
    setGlobalNavRetraction,
    scrollDirection,
  }
}
