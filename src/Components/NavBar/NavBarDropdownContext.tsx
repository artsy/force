import { Z } from "Apps/Components/constants"
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react"

interface NavBarDropdownContextType {
  shouldTransition: boolean
  handleMenuEnter: (label: string) => void
  handleMenuLeave: () => void
  getZIndex: (label: string) => number
}

const NavBarDropdownContext = createContext<NavBarDropdownContextType>({
  shouldTransition: true,
  handleMenuEnter: () => {},
  handleMenuLeave: () => {},
  getZIndex: () => Z.navDropdown,
})

export const useNavBarDropdown = () => useContext(NavBarDropdownContext)

interface State {
  transitionCount: number
  activeLabel: string | null
  elevatedLabels: Set<string>
}

type Action =
  | { type: "MENU_ENTER"; label: string }
  | { type: "MENU_LEAVE" }
  | { type: "RESET_ELEVATED"; labels: Set<string> }

const INITIAL_STATE: State = {
  transitionCount: 0,
  activeLabel: null,
  elevatedLabels: new Set(),
}

const Z_INDEX_RESET_DELAY = 300

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "MENU_ENTER":
      return {
        transitionCount: state.transitionCount + 1,
        activeLabel: action.label,
        elevatedLabels: new Set(state.elevatedLabels).add(action.label),
      }
    case "MENU_LEAVE":
      return {
        ...state,
        transitionCount: 0,
        activeLabel: null,
      }
    case "RESET_ELEVATED":
      return {
        ...state,
        elevatedLabels: action.labels,
      }
  }
}

export const NavBarDropdownProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const shouldTransition = state.transitionCount <= 1

  const handleMenuEnter = useCallback((label: string) => {
    dispatch({ type: "MENU_ENTER", label })

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)

    resetTimerRef.current = setTimeout(() => {
      dispatch({ type: "RESET_ELEVATED", labels: new Set([label]) })
    }, Z_INDEX_RESET_DELAY)
  }, [])

  const handleMenuLeave = useCallback(() => {
    dispatch({ type: "MENU_LEAVE" })

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)

    resetTimerRef.current = setTimeout(() => {
      dispatch({ type: "RESET_ELEVATED", labels: new Set() })
    }, Z_INDEX_RESET_DELAY)
  }, [])

  const getZIndex = useCallback(
    (label: string) => {
      if (label === state.activeLabel) return Z.navDropdown + 1
      if (state.elevatedLabels.has(label)) return Z.navDropdown + 1
      return Z.navDropdown
    },
    [state.activeLabel, state.elevatedLabels],
  )

  return (
    <NavBarDropdownContext.Provider
      value={{ shouldTransition, handleMenuEnter, handleMenuLeave, getZIndex }}
    >
      {children}
    </NavBarDropdownContext.Provider>
  )
}
