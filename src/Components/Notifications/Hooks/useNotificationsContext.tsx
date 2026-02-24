import type { NotificationType } from "Components/Notifications/types"
import { useRouter } from "System/Hooks/useRouter"
import { type FC, createContext, useContext, useEffect, useState } from "react"

export type State = {
  currentNotificationId: string | null
  currentNotificationFilterType: NotificationType
}

export const DEFAULT_STATE: State = {
  currentNotificationId: null,
  currentNotificationFilterType: "all",
}

type NotificationsContextType = {
  state: State
  setCurrentNotificationId: (id: string) => void
  setCurrentNotificationFilterType: (type: NotificationType) => void
}

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
  const [currentNotificationId, setCurrentNotificationId] = useState(id)
  const [currentNotificationFilterType, setCurrentNotificationFilterType] =
    useState<NotificationType>("all")

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!match.params.notificationId) return

    setCurrentNotificationId(match.params.notificationId)
  }, [match.params.notificationId, setCurrentNotificationId])

  return (
    <NotificationsContext.Provider
      value={{
        state: { currentNotificationId, currentNotificationFilterType },
        setCurrentNotificationId,
        setCurrentNotificationFilterType,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotificationsContext = () => {
  return useContext(NotificationsContext)
}
