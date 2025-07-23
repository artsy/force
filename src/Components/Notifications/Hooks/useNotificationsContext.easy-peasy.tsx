import { createContextStore, Action, action } from "easy-peasy"
import type { NotificationType } from "Components/Notifications/types"
import { useRouter } from "System/Hooks/useRouter"
import { type FC, createContext, useContext, useEffect } from "react"

export type State = {
  currentNotificationId: string | null
  currentNotificationFilterType: NotificationType
}

export const DEFAULT_STATE: State = {
  currentNotificationId: null,
  currentNotificationFilterType: "all",
}

// Easy-peasy store model interface
interface NotificationsStoreModel {
  // State
  currentNotificationId: string | null
  currentNotificationFilterType: NotificationType

  // Actions
  setCurrentNotificationId: Action<NotificationsStoreModel, string | null>
  setCurrentNotificationFilterType: Action<
    NotificationsStoreModel,
    NotificationType
  >
}

// Create the context store
export const NotificationsStore = createContextStore<NotificationsStoreModel>(
  runtimeModel => ({
    // State
    currentNotificationId:
      runtimeModel?.currentNotificationId ||
      DEFAULT_STATE.currentNotificationId,
    currentNotificationFilterType:
      runtimeModel?.currentNotificationFilterType ||
      DEFAULT_STATE.currentNotificationFilterType,

    // Actions
    setCurrentNotificationId: action((state, payload) => {
      state.currentNotificationId = payload
    }),

    setCurrentNotificationFilterType: action((state, payload) => {
      state.currentNotificationFilterType = payload
    }),
  }),
)

type NotificationsContextType = {
  state: State
  setCurrentNotificationId: (id: string) => void
  setCurrentNotificationFilterType: (type: NotificationType) => void
}

// Legacy context for backward compatibility
const NotificationsContext = createContext<NotificationsContextType>({
  state: DEFAULT_STATE,
} as unknown as NotificationsContextType)

interface NotificationsContextProviderProps {
  id?: string | null
}

export const NotificationsContextProvider: FC<
  React.PropsWithChildren<NotificationsContextProviderProps>
> = ({ children, id = null }) => {
  const { match } = useRouter()
  const setCurrentNotificationId = NotificationsStore.useStoreActions(
    actions => actions.setCurrentNotificationId,
  )

  useEffect(() => {
    if (!match.params.notificationId) return

    setCurrentNotificationId(match.params.notificationId)
  }, [match.params.notificationId, setCurrentNotificationId])

  return (
    <NotificationsStore.Provider
      runtimeModel={{
        currentNotificationId: id,
        currentNotificationFilterType: "all",
      }}
    >
      <NotificationsProviderWrapper>{children}</NotificationsProviderWrapper>
    </NotificationsStore.Provider>
  )
}

// Internal wrapper to provide backward compatible context
const NotificationsProviderWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const state = NotificationsStore.useStoreState(state => ({
    currentNotificationId: state.currentNotificationId,
    currentNotificationFilterType: state.currentNotificationFilterType,
  }))
  const actions = NotificationsStore.useStoreActions(actions => actions)

  return (
    <NotificationsContext.Provider
      value={{
        state,
        setCurrentNotificationId: actions.setCurrentNotificationId,
        setCurrentNotificationFilterType:
          actions.setCurrentNotificationFilterType,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

// Backward compatible hook
export const useNotificationsContext = () => {
  return useContext(NotificationsContext)
}
