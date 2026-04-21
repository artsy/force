import type { FilterableBrowserProtocol } from "System/Router/Utils/FilterableBrowserProtocol"
import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react"

type PopStateHandler = (state: unknown) => boolean

interface PopStateHandlerContextValue {
  addPopStateHandler: (handler: PopStateHandler) => () => void
  getSession: () => number
}

const NOOP: PopStateHandlerContextValue = {
  addPopStateHandler: () => () => {},
  getSession: () => 0,
}

const PopStateHandlerContext = createContext<PopStateHandlerContextValue>(NOOP)

interface PopStateHandlerProviderProps {
  protocol: FilterableBrowserProtocol
  children: ReactNode
}

export const PopStateHandlerProvider: FC<PopStateHandlerProviderProps> = ({
  protocol,
  children,
}) => {
  const value = useMemo<PopStateHandlerContextValue>(
    () => ({
      addPopStateHandler: handler => protocol.addPopStateHandler(handler),
      getSession: () => protocol.getSession(),
    }),
    [protocol],
  )

  return (
    <PopStateHandlerContext.Provider value={value}>
      {children}
    </PopStateHandlerContext.Provider>
  )
}

/**
 * Registers a pop-state handler for the lifetime of the calling component.
 * The handler runs before Farce sees the event:
 *
 * - return `true` to claim the event — the router will not process it, and
 *   no later handlers will run. The handler is responsible for any side
 *   effects (e.g. scroll restoration).
 * - return `false` to let later handlers (and ultimately the router) take
 *   over.
 */
export const usePopStateHandler = (handler: PopStateHandler): void => {
  const { addPopStateHandler } = useContext(PopStateHandlerContext)

  useEffect(() => {
    return addPopStateHandler(handler)
  }, [addPopStateHandler, handler])
}

/**
 * Returns a stable accessor for the current router session id. The id is
 * incremented every time Farce performs a real PUSH navigation, so it can be
 * used to invalidate stale history-state markers stamped before the push.
 */
export const useCurrentSession = (): (() => number) => {
  return useContext(PopStateHandlerContext).getSession
}
